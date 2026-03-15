import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Copy, ChevronDown, ChevronUp, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_URL || "";
const NOTE_MAX_LENGTH = 100;

const DEFAULT_MAX_VIEWS = "1";
const DEFAULT_EXPIRY = "5m";

const MAX_VIEWS_OPTIONS = [
  { label: "1 view", value: "1" },
  { label: "3 views", value: "3" },
  { label: "5 views", value: "5" },
];

const EXPIRY_OPTIONS = [
  { label: "2 minutes", value: "2m" },
  { label: "5 minutes", value: "5m" },
  { label: "10 minutes", value: "10m" },
];

const EXPIRY_MS: Record<string, number> = {
  "2m": 2 * 60 * 1000,
  "5m": 5 * 60 * 1000,
  "10m": 10 * 60 * 1000,
};

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

function getExpiryDate(value: string): string {
  const now = Date.now();
  const ms = EXPIRY_MS[value] ?? EXPIRY_MS["5m"];
  return new Date(now + ms).toISOString();
}

function isStrongPassword(value: string): boolean {
  if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) return false;
  if (!/[a-z]/.test(value)) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[0-9]/.test(value)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;/'`~]/.test(value)) return false;
  return true;
}

function passwordError(value: string): string | null {
  if (!value.trim()) return null;
  if (value.length < PASSWORD_MIN_LENGTH) return `At least ${PASSWORD_MIN_LENGTH} characters`;
  if (value.length > PASSWORD_MAX_LENGTH) return `At most ${PASSWORD_MAX_LENGTH} characters`;
  if (!/[a-z]/.test(value)) return "Add a lowercase letter";
  if (!/[A-Z]/.test(value)) return "Add an uppercase letter";
  if (!/[0-9]/.test(value)) return "Add a digit";
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;/'`~]/.test(value)) return "Add a symbol (e.g. !@#$)";
  return null;
}

export function NoteForm() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState(DEFAULT_EXPIRY);
  const [maxViews, setMaxViews] = useState(DEFAULT_MAX_VIEWS);
  const [password, setPassword] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noteUrl, setNoteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [createdWithPassword, setCreatedWithPassword] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || content.length > NOTE_MAX_LENGTH) return;
    const pwdErr = password.trim() ? passwordError(password) : null;
    if (pwdErr) {
      setError(`Passphrase: ${pwdErr}`);
      return;
    }
    setLoading(true);
    setError("");

    const body: Record<string, unknown> = {
      content,
      expiresAt: getExpiryDate(expiry),
      maxViews: Number(maxViews),
    };
    if (password.trim()) {
      body.password = password.trim();
    }

    try {
      const res = await fetch(`${API_BASE}/s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (res.status === 429) {
          let msg = "Too many notes created. Limit: 3 per minute, 10 per 24 hours. Try again later.";
          try {
            const body = JSON.parse(text);
            if (body?.message) msg = body.message;
          } catch {
            if (text) msg = text;
          }
          throw new Error(msg);
        }
        throw new Error(text || "Something went wrong. Please try again.");
      }

      const data = await res.json();
      setNoteUrl(`${window.location.origin}/s/${data.slug}`);
      setCreatedWithPassword(Boolean(password.trim()));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(noteUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setContent("");
    setExpiry(DEFAULT_EXPIRY);
    setMaxViews(DEFAULT_MAX_VIEWS);
    setPassword("");
    setNoteUrl("");
    setError("");
    setCopied(false);
    setCreatedWithPassword(false);
  };

  if (noteUrl) {
    return (
      <div className="glass glow-card rounded-2xl p-6 sm:p-8 space-y-5 animate-scale-in">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center">
            <Check className="w-4 h-4 text-success" />
          </div>
          <span className="font-display font-semibold text-foreground">Your secure link is ready</span>
        </div>
        <div className="flex gap-2">
          <Input
            readOnly
            value={noteUrl}
            className="font-mono text-sm bg-muted/50 border border-primary/20 focus-visible:ring-primary/20"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className={`shrink-0 transition-transform duration-200 ${copied ? "scale-110" : "hover:scale-105"}`}
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {createdWithPassword
            ? "Share this link and the passphrase with your recipient. The link will self-destruct after it's been viewed."
            : "This link will self-destruct after it's been viewed. Share it only with the intended recipient."}
        </p>
        <Button variant="ghost" onClick={handleReset} className="w-full text-muted-foreground">
          <Sparkles className="w-4 h-4 mr-1" /> Create another
        </Button>
      </div>
    );
  }

  return (
    <div className="glass glow-card rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="space-y-1">
        <Textarea
          placeholder="Paste or type your secret…"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, NOTE_MAX_LENGTH))}
          maxLength={NOTE_MAX_LENGTH}
          rows={5}
          className="resize-none text-base bg-muted/30 border-border/50 rounded-xl focus:ring-primary/30"
        />
        <p className="text-xs text-muted-foreground text-right">
          {content.length}/{NOTE_MAX_LENGTH}
        </p>
        <p className="text-xs text-muted-foreground">
          Limit: 3 notes per minute, 10 per day per device.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        More options
        {showOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {showOptions && (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Max views</label>
            <Select value={maxViews} onValueChange={setMaxViews}>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="1 view" />
              </SelectTrigger>
              <SelectContent>
                {MAX_VIEWS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Expires in</label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="5 minutes" />
              </SelectTrigger>
              <SelectContent>
                {EXPIRY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="text-sm font-medium text-foreground">Passphrase (optional)</label>
            <Input
              type="password"
              placeholder="Min 8 chars: upper, lower, digit, symbol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/30 border-border/50"
              autoComplete="off"
            />
            {password.trim() && passwordError(password) && (
              <p className="text-xs text-destructive">{passwordError(password)}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Recipient will need this to open the note.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <Button
        variant="hero"
        size="lg"
        onClick={handleSubmit}
        disabled={
          !content.trim() ||
          content.length > NOTE_MAX_LENGTH ||
          (password.trim() !== "" && !isStrongPassword(password)) ||
          loading
        }
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating…
          </>
        ) : (
          <>
            Create secure link
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
