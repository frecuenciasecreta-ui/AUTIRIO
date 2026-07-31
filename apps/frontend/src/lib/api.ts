const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important for sending httpOnly cookies
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Error de red' }));
      throw new Error(errorData.message || `Error status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API Client Warning] Call to ${endpoint} failed:`, error);
    throw error;
  }
}
