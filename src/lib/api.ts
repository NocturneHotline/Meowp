import { supabase } from './supabase';
import { env } from './env';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function getAuthHeader(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  return `Bearer ${session?.access_token ?? env.supabaseAnonKey}`;
}

export async function apiCall<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const authHeader = await getAuthHeader();
  const response = await fetch(`${env.apiBaseUrl}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }

  return response.json() as Promise<T>;
}
