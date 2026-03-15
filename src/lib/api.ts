const API_BASE = import.meta.env.VITE_API_URL || "";

export type NoteErrorCode = "PASSWORD_REQUIRED" | "INVALID_PASSWORD" | "WRONG_PASSWORD_LIMIT";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: { code?: NoteErrorCode; message?: string },
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getNote(
  slug: string,
  password?: string,
): Promise<{ content: string }> {
  const headers: HeadersInit = {};
  if (password !== undefined && password !== "") {
    headers["X-Note-Password"] = password;
  }
  const res = await fetch(`${API_BASE}/s/${encodeURIComponent(slug)}`, {
    headers: Object.keys(headers).length ? headers : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    let body: { code?: NoteErrorCode; message?: string } | undefined;
    try {
      body = JSON.parse(text) as { code?: NoteErrorCode; message?: string };
    } catch {
      // ignore
    }
    throw new ApiError(text || "Failed to load note", res.status, body);
  }

  return res.json();
}
