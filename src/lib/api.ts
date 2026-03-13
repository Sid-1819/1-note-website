const API_BASE = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getNote(slug: string): Promise<{ content: string }> {
  const res = await fetch(`${API_BASE}/s/${encodeURIComponent(slug)}`);

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(text || "Failed to load note", res.status);
  }

  return res.json();
}
