const KEY = 'pp_trusted_device';
const TRUST_DURATION_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

export interface DeviceMemory {
  userId: string;
  name: string;
  email: string;
  initials: string;
  trustedAt: number;
}

export function getDeviceMemory(): DeviceMemory | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data: DeviceMemory = JSON.parse(raw);
    // Expire trust after 30 days
    if (Date.now() - data.trustedAt > TRUST_DURATION_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function saveDeviceMemory(memory: Omit<DeviceMemory, 'trustedAt'>): void {
  localStorage.setItem(KEY, JSON.stringify({ ...memory, trustedAt: Date.now() }));
}

export function clearDeviceMemory(): void {
  localStorage.removeItem(KEY);
}

export function hasAnsweredRememberPrompt(userId: string): boolean {
  try {
    const raw = localStorage.getItem(`pp_remember_asked_${userId}`);
    return raw === 'yes' || raw === 'no';
  } catch {
    return false;
  }
}

export function markRememberPromptAnswered(userId: string, answer: 'yes' | 'no'): void {
  localStorage.setItem(`pp_remember_asked_${userId}`, answer);
}
