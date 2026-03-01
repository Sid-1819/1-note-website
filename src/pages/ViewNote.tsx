import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock, ArrowRight } from "lucide-react";

const ViewNote = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="relative">
          <div className="absolute inset-0 gradient-mesh opacity-30 rounded-3xl" />
          <div className="relative glass glow-card rounded-2xl max-w-md w-full p-8 sm:p-10 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Secure Note</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This note is identified by slug{" "}
              <code className="bg-muted px-2 py-0.5 rounded-md text-foreground font-mono text-xs">
                {slug}
              </code>
              . Share this page with the intended recipient to view the content.
            </p>
            <Button variant="outline-glow" size="lg" asChild className="w-full">
              <Link to="/">
                Back to home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewNote;
