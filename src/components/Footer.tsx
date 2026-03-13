import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-foreground text-lg mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              Vanish
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share secrets that disappear. Zero-knowledge, end-to-end encrypted note sharing.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><span className="cursor-default">API</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">About</span></li>
              <li><span className="cursor-default">Blog</span></li>
              <li><span className="cursor-default">Careers</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">Privacy</span></li>
              <li><span className="cursor-default">Terms</span></li>
              <li><span className="cursor-default">Security</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Vanish. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built with privacy in mind.</p>
        </div>
      </div>
    </footer>
  );
}
