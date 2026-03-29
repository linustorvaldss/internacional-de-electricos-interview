import { RequestOptions } from '../lib/types';
import { normalizeErrorMessage } from '../utils/';

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    headers.authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`/api/${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(normalizeErrorMessage(payload, response.status));
  }

  return payload as T;
}