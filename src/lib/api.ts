import { createSecureShareClient } from "@1note/sdk";

export const oneNote = createSecureShareClient({
  baseUrl: import.meta.env.VITE_API_URL || "",
});

export { ApiError } from "@1note/sdk";
export type { NoteErrorCode } from "@1note/sdk";

export function getNote(slug: string, password?: string) {
  return oneNote.getNote(slug, password);
}
