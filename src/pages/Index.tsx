import { Navbar } from "@/components/Navbar";
import { NoteForm } from "@/components/NoteForm";
import { Shield, Lock, Eye } from "lucide-react";

const features = [
  { icon: Shield, title: "End-to-end secure", desc: "Your notes are encrypted and never stored in plain text." },
  { icon: Eye, title: "Self-destructing", desc: "Notes expire after a set time or number of views." },
  { icon: Lock, title: "Zero knowledge", desc: "We can't read your notes. Only the link holder can." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-4 pt-16 pb-24 sm:pt-24">
        <div className="max-w-2xl w-full text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground font-display mb-4">
            Share secrets that&nbsp;disappear
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Paste a note, get a one-time link. It self-destructs after it's been read.
          </p>
        </div>

        {/* Note creation card */}
        <div className="w-full max-w-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <NoteForm />
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl w-full animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          {features.map((f) => (
            <div key={f.title} className="text-center px-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
