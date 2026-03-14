import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock, Trash2, SearchX, FileText } from "lucide-react";

const sections = [
  {
    icon: Lock,
    title: "Encryption at rest",
    content:
      "Notes are encrypted before they are stored. We never store your note in plain text — only encrypted data that we cannot read.",
  },
  {
    icon: Trash2,
    title: "Automatic deletion",
    content:
      "Notes are removed automatically after they are viewed or when they expire. We do not keep copies. There is no long-term retention of your content.",
  },
  {
    icon: SearchX,
    title: "No search engine indexing",
    content:
      "Note reveal pages are excluded from search engine indexing. We use noindex directives so that shared links do not appear in search results.",
  },
  {
    icon: FileText,
    title: "Minimal logging",
    content:
      "We log only what is necessary for reliability and abuse prevention. We do not log note content, and we avoid collecting unnecessary personal data.",
  },
];

const Security = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative overflow-hidden flex-1">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Security &amp; Privacy
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            How we keep your notes safe and your data minimal.
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div
                key={s.title}
                className="glass glow-card rounded-2xl p-6 sm:p-8 group hover:transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground text-lg mb-2">
                      {s.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {s.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
