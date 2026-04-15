import { apiPostFile } from './api';

const TEXT_EXTENSIONS = new Set(['txt', 'fdx', 'fountain']);

/**
 * Extracts plain text from a screenplay file.
 * Text-based formats (txt/fdx/fountain) are read directly in the browser.
 * Binary formats (pdf/docx) are sent to the backend for server-side extraction.
 */
export async function extractScriptText(file: File, token: string): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (TEXT_EXTENSIONS.has(ext)) {
    return file.text();
  }

  // PDF or DOCX — send to backend for text extraction
  const formData = new FormData();
  formData.append('file', file);
  const { text } = await apiPostFile<{ text: string }>(token, '/api/parse/script', formData);
  return text;
}
