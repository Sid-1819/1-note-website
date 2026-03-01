import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Lock } from "lucide-react";

const ViewNote = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border border-border shadow-lg">
          <CardContent className="p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">Secure Note</h1>
            <p className="text-muted-foreground text-sm">
              This note is identified by slug <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-xs">{slug}</code>. Share this page with the intended recipient to view the content.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">← Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewNote;
