import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Key, Paperclip, Code2, Users, MapPin } from "lucide-react";

const roadmapItems = [
  {
    icon: Key,
    title: "Password-protected notes",
    desc: "Add an optional password so only someone with the passphrase can open the note.",
    status: "Planned",
  },
  {
    icon: Paperclip,
    title: "File attachments",
    desc: "Share small files that disappear after viewing, with the same one-time link behavior.",
    status: "Planned",
  },
  {
    icon: Code2,
    title: "API access",
    desc: "Integrate 1Note into your apps and workflows with a simple API.",
    status: "Planned",
  },
  {
    icon: Users,
    title: "Workspace sharing",
    desc: "Create shared workspaces for teams with controlled access and audit trails.",
    status: "Planned",
  },
];

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative overflow-hidden flex-1">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">What we're building next</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Roadmap
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Upcoming features to make sharing secrets even safer and more useful.
          </p>

          <div className="space-y-6">
            {roadmapItems.map((item) => (
              <div
                key={item.title}
                className="glass glow-card rounded-2xl p-6 sm:p-8 group hover:transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-display font-semibold text-foreground text-lg">
                        {item.title}
                      </h2>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
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

export default Roadmap;
