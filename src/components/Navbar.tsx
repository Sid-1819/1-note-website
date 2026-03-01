import { Lock } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-foreground text-lg">
          <Lock className="w-5 h-5 text-primary" />
          Vanish
        </a>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="hidden sm:inline cursor-default">Features</span>
          <span className="hidden sm:inline cursor-default">Login</span>
        </nav>
      </div>
    </header>
  );
}
