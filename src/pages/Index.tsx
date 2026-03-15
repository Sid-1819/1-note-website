import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoteForm } from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield, Lock, Eye, ArrowRight, Zap, FileText, Key, Trash2, UserX, Code2,
} from "lucide-react";

const trustSignals = [
  { icon: Lock, label: "Encrypted at rest" },
  { icon: UserX, label: "No account required" },
  { icon: Trash2, label: "Automatic destruction" },
];

const howItWorksSteps = [
  { step: "01", title: "Write a note", desc: "Paste or type your secret in the box.", icon: FileText },
  { step: "02", title: "Share the link", desc: "Get a unique link and send it to the person you want.", icon: Key },
  { step: "03", title: "Gone after viewing", desc: "The note appears once, then disappears forever.", icon: Shield },
];

const features = [
  { icon: Shield, title: "End-to-end encrypted", desc: "Your notes are encrypted and never stored in plain text." },
  { icon: Eye, title: "Self-destructing", desc: "Notes expire after a set time or number of views." },
  { icon: Lock, title: "Zero knowledge", desc: "We can't read your notes. Only the link holder can." },
];

const valueBullets = [
  { icon: UserX, label: "No signup" },
  { icon: Lock, label: "Encrypted" },
  { icon: Code2, label: "REST API" },
  { icon: Trash2, label: "Self-destructing" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-6 opacity-0 animate-fade-in-up"
            >
              <Zap className="w-3.5 h-3.5 text-foreground" />
              API-first secret sharing
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display mb-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Secure, ephemeral secret sharing{" "}
              <span className="font-bold">for your apps</span>
            </h1>
            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              One API to create and consume one-time secrets. For devs, backend teams, and CI. Or use the web UI to share a note in seconds — no account required.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/docs">
                  Read the docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline-glow" size="xl" asChild>
                <a href="#create">Create a note</a>
              </Button>
            </div>
          </div>

          {/* How it works */}
          <div className="max-w-4xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((item, i) => (
                <div key={item.step} className="relative text-center group">
                  {i < howItWorksSteps.length - 1 && (
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

          {/* Trust signals + Note creation card */}
          <div
            id="create"
            className="w-full max-w-xl mx-auto space-y-4 opacity-0 animate-fade-in-up scroll-mt-20"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="glass rounded-xl px-4 py-3 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
              {trustSignals.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-foreground shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <NoteForm />
          </div>
        </div>
      </section>

      {/* Value bullets */}
      <section className="border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {valueBullets.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="w-4 h-4 text-foreground shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Security without complexity
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Everything you need to share sensitive information safely. Nothing you don't.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass glow-card rounded-2xl p-6 sm:p-8 group hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline-glow" size="lg" asChild>
            <Link to="/features">
              Explore all features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to share securely?
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            No sign-up required. Create your first secure note in seconds.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href="/">
              Get started free
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
