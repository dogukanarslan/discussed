import type { ApiError } from '@/types/api';

export const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const res = await fetch(input, {
    credentials: 'include',
    ...init,
  });

  if (res.status === 401) {
    sessionStorage.removeItem('user');
    window.location.hash = '#/signin';
  }

  return res;
};

async function parseError(res: Response): Promise<string> {
  try {
    const body: ApiError = await res.json();
    return body.message ?? 'Request failed';
  } catch {
    return 'Request failed';
  }
}

export async function apiGet<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await apiFetch(url, init);
  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json();
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await apiFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json();
}
