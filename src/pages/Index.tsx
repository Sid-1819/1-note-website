import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoteForm } from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield, Lock, Eye, ArrowRight, Zap, Globe, Timer,
} from "lucide-react";

const features = [
  { icon: Shield, title: "End-to-end encrypted", desc: "Your notes are encrypted and never stored in plain text." },
  { icon: Eye, title: "Self-destructing", desc: "Notes expire after a set time or number of views." },
  { icon: Lock, title: "Zero knowledge", desc: "We can't read your notes. Only the link holder can." },
];

const stats = [
  { value: "10M+", label: "Notes shared" },
  { value: "99.9%", label: "Uptime" },
  { value: "0", label: "Data breaches" },
  { value: "<100ms", label: "Response time" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl float-animation-delayed" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-6 opacity-0 animate-fade-in-up"
            >
              <Zap className="w-3.5 h-3.5 text-accent" />
              Trusted by 10,000+ teams worldwide
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display mb-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Share secrets that{" "}
              <span className="gradient-text">disappear</span>
            </h1>
            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Paste a note, get a one-time link. It self-destructs after it's been read. No accounts, no traces, no worries.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="xl" asChild>
                <a href="#create">
                  Start sharing securely
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline-glow" size="xl" asChild>
                <Link to="/features">See how it works</Link>
              </Button>
            </div>
          </div>

          {/* Note creation card */}
          <div
            id="create"
            className="w-full max-w-xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <NoteForm />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to share securely?
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            No sign-up required. Create your first secure note in seconds.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href="#create">
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
