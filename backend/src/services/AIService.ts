import OpenAI from 'openai';
import { env } from '../config/env';

const TEXT_MODEL = 'openai/gpt-4o-mini';

let openRouterClient: OpenAI | null = null;
function getOpenRouterClient(): OpenAI {
    if (!openRouterClient) {
        if (!env.OPENROUTER_API_KEY) {
            throw new Error('OPENROUTER_API_KEY is not configured. Add it to your .env and Railway environment variables.');
        }
        openRouterClient = new OpenAI({
            apiKey: env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': 'https://pocket-productions.vercel.app',
                'X-Title': 'Pocket Productions',
            },
        });
    }
    return openRouterClient;
}

let openaiClient: OpenAI | null = null;
function getOpenAIClient(): OpenAI {
    if (!openaiClient) {
        if (!env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured. Add it to Railway environment variables.');
        }
        openaiClient = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    }
    return openaiClient;
}

export class AIService {
    async generateShotDescription(params: {
        sceneContext: string;
        shotType: string;
        style?: string;
        characterColors?: Record<string, string>;
    }): Promise<string> {
        const { sceneContext, shotType, style, characterColors } = params;

        const colorContext = characterColors
            ? `\nCharacter color associations: ${JSON.stringify(characterColors)}`
            : '';

        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 500,
            messages: [
                {
                    role: 'user',
                    content: `You are a professional cinematographer and storyboard artist.

Generate a vivid, specific storyboard shot description for a ${shotType} shot.

Scene context: ${sceneContext}
${style ? `Visual style: ${style}` : ''}${colorContext}

Provide:
1. A concise shot description (2–3 sentences) describing composition, lighting, and action
2. Camera movement if any (static, slow push, handheld, etc.)
3. Emotional tone / mood

Format as JSON: { "description": "...", "cameraMovement": "...", "mood": "..." }`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        try {
            return JSON.parse(cleaned);
        } catch {
            return text;
        }
    }

    async generateCharacterBackstory(params: {
        name: string;
        archetype: string;
        want?: string;
        need?: string;
        flaw?: string;
        wound?: string;
        logline?: string;
        genre?: string;
    }): Promise<{ backstory: string; sampleDialogue: string; ghost: string }> {
        const { name, archetype, want, need, flaw, wound, logline, genre } = params;

        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 800,
            messages: [
                {
                    role: 'user',
                    content: `You are a professional screenwriter and story development consultant.

Create a rich character profile for a ${genre ?? 'drama'} film.

Character: ${name}
Archetype: ${archetype}
${logline ? `Logline: ${logline}` : ''}
${want ? `External want: ${want}` : ''}
${need ? `Internal need: ${need}` : ''}
${flaw ? `Flaw: ${flaw}` : ''}
${wound ? `Psychological wound: ${wound}` : ''}

Generate:
1. backstory (3–4 sentences — specific backstory that created the wound and flaw)
2. ghost (the haunting past event/memory — 1 sentence)
3. sampleDialogue (2–3 lines of revealing dialogue that shows their voice/flaw)

Respond as JSON: { "backstory": "...", "ghost": "...", "sampleDialogue": "..." }`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '{}';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        try {
            return JSON.parse(cleaned);
        } catch {
            return { backstory: text, sampleDialogue: '', ghost: '' };
        }
    }

    async matchLocations(params: {
        sceneDescription: string;
        locations: Array<{ id: string; name: string; address?: string; description?: string }>;
    }): Promise<Array<{ locationId: string; score: number; reasoning: string }>> {
        const { sceneDescription, locations } = params;

        if (locations.length === 0) return [];

        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 600,
            messages: [
                {
                    role: 'user',
                    content: `You are a location scout with deep knowledge of production logistics.

Scene to match: "${sceneDescription}"

Available locations:
${locations.map((l, i) => `${i + 1}. ${l.name}${l.address ? ` (${l.address})` : ''}${l.description ? ` — ${l.description}` : ''}`).join('\n')}

Rank each location by fit for this scene (score 0–10) and explain why briefly.

Respond as JSON array: [{ "locationId": "...", "score": 8, "reasoning": "..." }]
Use the exact locationId values: ${locations.map((l) => l.id).join(', ')}`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '[]';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        try {
            const parsed = JSON.parse(cleaned);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    async suggestArcBeats(params: {
        arcTemplateName: string;
        logline: string;
        genre?: string;
    }): Promise<Array<{ name: string; positionPct: number; description: string }>> {
        const { arcTemplateName, logline, genre } = params;

        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 800,
            messages: [
                {
                    role: 'user',
                    content: `You are a script development consultant specializing in story structure.

Generate story beat suggestions for a ${genre ?? 'drama'} film using the ${arcTemplateName} framework.

Logline: ${logline}

Provide 6–8 specific story beats positioned on a 0–100 timeline.
Each beat should be specific to THIS story, not generic template beat names.

Respond as JSON array: [{ "name": "...", "positionPct": 12, "description": "..." }]`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '[]';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        try {
            const parsed = JSON.parse(cleaned);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    async analyzeScript(scriptText: string): Promise<{
        title: string;
        summary: string;
        pageCount: number;
        sceneCount: number;
        estimatedDays: number;
        locations: string[];
        cast: string[];
        budgetLineItems: Array<{
            id: string;
            category: 'Cast' | 'Crew' | 'Locations' | 'Equipment' | 'Post' | 'Misc';
            description: string;
            qty: number;
            rate: number;
            total: number;
            flag?: string;
        }>;
        schedule: Array<{
            day: number;
            date: string;
            scenes: string[];
            location: string;
            estimatedHours: number;
        }>;
        storyboardShots: Array<{
            frameLabel: string;
            sceneHeading: string;
            shotType: string;
            cameraMovement: string;
            lighting: string;
            description: string;
            mood: string;
        }>;
    }> {
        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 4096,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert film production coordinator with deep knowledge of SAG/non-union contracts, Hollywood budgeting, scheduling, and cinematography. When given a screenplay or script excerpt, you extract all production-relevant information and return it as structured JSON.`,
                },
                {
                    role: 'user',
                    content: `Analyze the following screenplay text and return a complete production breakdown as JSON.

Instructions:
- Extract all INT/EXT scene headings to identify locations and scene count
- Identify cast members by analyzing character names in dialogue and action lines
- Generate realistic SAG/non-union budget line items for each category: Cast, Crew, Locations, Equipment, Post, Misc — use realistic Hollywood day rates (e.g. lead actor $5,000/day, supporting $1,500/day, DP $1,200/day, gaffer $650/day, etc.)
- Estimate page count based on text length (assume 1 page = ~55 lines of screenplay)
- Generate a day-by-day shoot schedule based on scene count and locations
- Generate the first 3–5 storyboard shots from the opening scenes
- Return ONLY valid JSON with no markdown code fences, no explanation text

Required JSON shape:
{
  "title": "string — infer from title page or first scene",
  "summary": "string — 2-sentence logline/summary",
  "pageCount": number,
  "sceneCount": number,
  "estimatedDays": number,
  "locations": ["string"],
  "cast": ["string"],
  "budgetLineItems": [
    {
      "id": "string — use timestamp + index e.g. '1234567890_0'",
      "category": "Cast|Crew|Locations|Equipment|Post|Misc",
      "description": "string",
      "qty": number,
      "rate": number,
      "total": number,
      "flag": "string — optional, only if notable (e.g. 'SAG OT', 'Overage')"
    }
  ],
  "schedule": [
    {
      "day": number,
      "date": "string — e.g. 'Day 1'",
      "scenes": ["string — scene headings"],
      "location": "string",
      "estimatedHours": number
    }
  ],
  "storyboardShots": [
    {
      "frameLabel": "string — e.g. 'FRAME 1'",
      "sceneHeading": "string",
      "shotType": "string — e.g. 'Wide Shot', 'Close-Up', 'Two-Shot'",
      "cameraMovement": "string — e.g. 'Static', 'Slow Push', 'Handheld'",
      "lighting": "string — e.g. 'Natural', 'Low Key', 'High Key'",
      "description": "string — 2-3 sentence visual description",
      "mood": "string — e.g. 'Tense', 'Melancholic', 'Hopeful'"
    }
  ]
}

Script text:
${scriptText}`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                title: 'Untitled Script',
                summary: 'Script analysis could not be parsed.',
                pageCount: 0,
                sceneCount: 0,
                estimatedDays: 0,
                locations: [],
                cast: [],
                budgetLineItems: [],
                schedule: [],
                storyboardShots: [],
            };
        }
    }

    async queryBudget(params: {
        question: string;
        lineItems: Array<{
            category: string;
            description: string;
            qty: number;
            rate: number;
            total: number;
        }>;
        totalBudget?: number;
        sagEnabled?: boolean;
    }): Promise<{
        answer: string;
        suggestions: Array<{ action: string; description: string; impact: string }>;
    }> {
        const { question, lineItems, totalBudget, sagEnabled } = params;

        const grandTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
        const budgetSummary = lineItems
            .map((item) => `${item.category} | ${item.description} | qty: ${item.qty} | rate: $${item.rate} | total: $${item.total}`)
            .join('\n');

        const response = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 800,
            messages: [
                {
                    role: 'system',
                    content: `You are a seasoned film budget analyst with expertise in Hollywood productions, SAG-AFTRA contracts, and production finance. You give practical, actionable budget advice.`,
                },
                {
                    role: 'user',
                    content: `You are analyzing a film production budget.

${sagEnabled ? 'SAG-AFTRA rules are enabled (apply union minimums, overtime rules, etc.).' : 'Non-union production.'}
${totalBudget ? `Overall budget cap: $${totalBudget.toLocaleString()}` : ''}
Grand total of line items: $${grandTotal.toLocaleString()}

Budget line items:
${budgetSummary}

Question: ${question}

Answer the question clearly and provide 2–3 actionable suggestions to optimize the budget.

Respond as JSON only, no markdown fences:
{
  "answer": "string — direct answer to the question",
  "suggestions": [
    {
      "action": "string — short action title",
      "description": "string — what to do",
      "impact": "string — expected financial or operational impact"
    }
  ]
}`,
                },
            ],
        });

        const text = response.choices[0]?.message?.content ?? '';
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                answer: text || 'Unable to analyze budget at this time.',
                suggestions: [],
            };
        }
    }

    async generateStoryboardImage(params: {
        sceneHeading: string;
        description: string;
        shotType: string;
        lighting: string;
        mood: string;
    }): Promise<{ url: string }> {
        const { sceneHeading, description, shotType, lighting, mood } = params;

        // Step 1: Use gpt-4o-mini via OpenRouter to craft the DALL-E prompt
        const promptResponse = await getOpenRouterClient().chat.completions.create({
            model: TEXT_MODEL,
            max_tokens: 200,
            messages: [{
                role: 'user',
                content: `You are a storyboard artist creating a prompt for DALL-E 3 to generate a cinematic storyboard panel.

Scene: ${sceneHeading}
Shot type: ${shotType}
Lighting: ${lighting}
Mood: ${mood}
Visual description: ${description}

Write a single DALL-E 3 image prompt (max 150 words) that captures this as a black-and-white or desaturated cinematic storyboard sketch/illustration. Start with "Cinematic storyboard panel," — no quotes, no explanation, just the prompt.`,
            }],
        });

        const imagePrompt = promptResponse.choices[0]?.message?.content?.trim()
            ?? `Cinematic storyboard panel, ${shotType}, ${sceneHeading}, ${lighting} lighting, ${mood} mood, black and white film noir illustration`;

        // Step 2: Generate image with DALL-E 3 via OpenAI
        const imageResponse = await getOpenAIClient().images.generate({
            model: 'dall-e-3',
            prompt: imagePrompt,
            n: 1,
            size: '1792x1024',
            quality: 'standard',
            style: 'vivid',
        });

        const url = (imageResponse.data ?? [])[0]?.url;
        if (!url) throw new Error('DALL-E 3 returned no image URL');
        return { url };
    }
}

export const aiService = new AIService();
