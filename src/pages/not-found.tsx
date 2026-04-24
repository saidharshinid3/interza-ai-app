import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground particleCount={12} />
      <Card className="relative z-10 w-full max-w-md mx-4 glass rounded-2xl border-2 border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-3">
            <AlertCircle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-white/70">
            The page you're looking for doesn't exist. Please check the URL and try again.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
