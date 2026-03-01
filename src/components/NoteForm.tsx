import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Copy, ChevronDown, ChevronUp, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "";

const EXPIRY_OPTIONS = [
  { label: "Never", value: "never" },
  { label: "1 hour", value: "1h" },
  { label: "24 hours", value: "24h" },
  { label: "7 days", value: "7d" },
];

function getExpiryDate(value: string): string | undefined {
  if (!value || value === "never") return undefined;
  const now = Date.now();
  const ms: Record<string, number> = { "1h": 3600000, "24h": 86400000, "7d": 604800000 };
  return new Date(now + (ms[value] || 0)).toISOString();
}

export function NoteForm() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("never");
  const [maxViews, setMaxViews] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noteUrl, setNoteUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError("");

    const body: Record<string, unknown> = { content };
    const expiresAt = getExpiryDate(expiry);
    if (expiresAt) body.expiresAt = expiresAt;
    if (maxViews && Number(maxViews) > 0) body.maxViews = Number(maxViews);

    try {
      const res = await fetch(`${API_BASE}/s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (res.status === 429) throw new Error("Too many requests. Please wait a moment.");
        throw new Error(text || "Something went wrong. Please try again.");
      }

      const data = await res.json();
      setNoteUrl(`${window.location.origin}/s/${data.slug}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(noteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setContent("");
    setExpiry("never");
    setMaxViews("");
    setNoteUrl("");
    setError("");
    setCopied(false);
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
          <Input readOnly value={noteUrl} className="font-mono text-sm bg-muted/50 border-border/50" />
          <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0">
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          This link will self-destruct after it&apos;s been viewed. Share it only with the intended recipient.
        </p>
        <Button variant="ghost" onClick={handleReset} className="w-full text-muted-foreground">
          <Sparkles className="w-4 h-4 mr-1" /> Create another
        </Button>
      </div>
    );
  }

  return (
    <div className="glass glow-card rounded-2xl p-6 sm:p-8 space-y-5">
      <Textarea
        placeholder="Paste or type your secret…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="resize-none text-base bg-muted/30 border-border/50 rounded-xl focus:ring-primary/30"
      />

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
            <label className="text-sm font-medium text-foreground">Expires in</label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Never" />
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
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Max views</label>
            <Input
              type="number"
              min={1}
              placeholder="Unlimited"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              className="bg-muted/30 border-border/50"
            />
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
        disabled={!content.trim() || loading}
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
