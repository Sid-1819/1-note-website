import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, ArrowRight } from "lucide-react";
import { ApiError, getNote } from "@/lib/api";

const ViewNote = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ["note", slug],
    queryFn: () => getNote(slug!),
    enabled: Boolean(slug),
    retry: (_, error) => (error as ApiError)?.status !== 404,
    gcTime: 0,
  });

  if (!slug) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <Button variant="outline-glow" size="lg" asChild>
            <Link to="/">
              Back to home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="relative">
            <div className="relative glass glow-card rounded-2xl max-w-md w-full p-8 sm:p-10 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-8 w-40 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="relative max-w-md w-full space-y-4">
            <Alert variant="destructive">
              <AlertTitle>Note unavailable</AlertTitle>
              <AlertDescription>
                This note has expired or been consumed.
              </AlertDescription>
            </Alert>
            <Button variant="outline-glow" size="lg" asChild className="w-full">
              <Link to="/">
                Create a new note
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="relative">
          <div className="relative glass glow-card rounded-2xl max-w-md w-full p-8 sm:p-10 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-primary-foreground" />
            </div>
            <pre className="whitespace-pre-wrap rounded-md border bg-muted/50 p-4 text-sm font-mono text-left">
              {data.content}
            </pre>
            <p className="text-muted-foreground text-sm text-center">
              This note was displayed once and is no longer available.
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
