import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield, Lock, Eye, Zap, Globe, Timer, Key, FileText,
  Server, ArrowRight, CheckCircle2,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "Notes are encrypted before leaving your browser. We never see your data — not even temporarily.",
    details: ["AES-256-GCM encryption", "Client-side key generation", "Zero plaintext storage"],
  },
  {
    icon: Eye,
    title: "Self-Destructing Notes",
    desc: "Set notes to vanish after a single view, a time limit, or a maximum number of reads.",
    details: ["View-count expiry", "Time-based expiry", "Manual destruction"],
  },
  {
    icon: Shield,
    title: "Zero-Knowledge Architecture",
    desc: "Our servers store only encrypted blobs. We couldn't read your notes even if compelled.",
    details: ["No metadata logging", "No IP tracking", "Open-source verifiable"],
  },
  {
    icon: Timer,
    title: "Flexible Expiration",
    desc: "Choose exactly when your notes disappear — from 1 hour to 30 days, or after a set number of views.",
    details: ["1h, 24h, 7d presets", "Custom durations", "View-based limits"],
  },
  {
    icon: Key,
    title: "Password Protection",
    desc: "Add an extra layer with an optional password. Recipients must enter it to decrypt the note.",
    details: ["PBKDF2 key derivation", "Brute-force protection", "Optional for any note"],
  },
  {
    icon: Globe,
    title: "API Access",
    desc: "Integrate secure note sharing into your own apps and workflows with our simple REST API.",
    details: ["RESTful endpoints", "Webhook support", "Rate limiting built-in"],
  },
];

const howItWorks = [
  { step: "01", title: "Write your secret", desc: "Type or paste sensitive content into the editor.", icon: FileText },
  { step: "02", title: "Get a unique link", desc: "We encrypt and generate a one-time URL.", icon: Key },
  { step: "03", title: "Share safely", desc: "Send the link — it self-destructs after being viewed.", icon: Shield },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-6 opacity-0 animate-fade-in-up">
            <Zap className="w-3.5 h-3.5 text-foreground" />
            Enterprise-grade security
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Built for <span className="font-bold">serious security</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Every feature is designed with one goal: keeping your sensitive information safe and ephemeral.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-14">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative text-center group">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t border-dashed border-border" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-xs font-bold text-foreground mb-2 font-display">{item.step}</div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Powerful features, zero complexity. Security shouldn't require a PhD.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFeatures.map((f, i) => (
            <div
              key={f.title}
              className="glass glow-card rounded-2xl p-6 sm:p-8 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-1.5">
                {f.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-foreground shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to try it?
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            No account required. Start sharing encrypted notes in seconds.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/">
              Create a secure note
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
