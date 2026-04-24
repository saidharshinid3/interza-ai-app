import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAppState } from "@/lib/store";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RotateCcw, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

interface FeedbackData {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

export function Feedback() {
  const [, setLocation] = useLocation();
  const { answers, reset } = useAppState();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  useEffect(() => {
    if (answers.length === 0) {
      setLocation("/");
      return;
    }

    // Heuristics
    const avgLength = answers.reduce((acc, a) => acc + a.answer.length, 0) / answers.length;
    
    // Mock score 65-95 based on avg length (assume ~200 chars is good)
    const baseScore = 65;
    const lengthBonus = Math.min(30, (avgLength / 200) * 30);
    const finalScore = Math.round(baseScore + lengthBonus);

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const improvements: string[] = [];

    if (avgLength > 150) {
      strengths.push("Detailed and comprehensive answers.");
    } else {
      weaknesses.push("Answers were quite brief.");
      improvements.push("Elaborate more on your points.");
    }

    const hasExamples = answers.some(a => a.answer.toLowerCase().includes("example") || a.answer.toLowerCase().includes("instance"));
    if (hasExamples) {
      strengths.push("Good use of examples to support points.");
    } else {
      improvements.push("Incorporate specific examples or case studies.");
    }

    if (answers.length >= 8) {
      strengths.push("Maintained focus throughout a full session.");
    }

    if (avgLength < 50) {
      weaknesses.push("Lacked depth in critical areas.");
    }

    // Pad arrays to 3 items with generic feedback if needed
    const strengthFillers = [
      "Clear communication style.",
      "Professional tone maintained.",
      "Good alignment with role expectations.",
    ];
    const weaknessFillers = [
      "Could bridge topics more smoothly.",
      "Sometimes hesitated before core points.",
      "Technical depth could be expanded.",
    ];
    const improvementFillers = [
      "Structure answers using the STAR method.",
      "Take a moment to pause before responding.",
      "Connect answers back to business impact.",
    ];
    let si = 0;
    while (strengths.length < 3) strengths.push(strengthFillers[si++ % strengthFillers.length]);
    let wi = 0;
    while (weaknesses.length < 3) weaknesses.push(weaknessFillers[wi++ % weaknessFillers.length]);
    let ii = 0;
    while (improvements.length < 3) improvements.push(improvementFillers[ii++ % improvementFillers.length]);

    setFeedback({
      score: finalScore,
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 3),
      improvements: improvements.slice(0, 3)
    });
  }, [answers]);

  if (!feedback) {
    return (
      <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground particleCount={16} />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white/70">Generating your feedback...</p>
        </div>
      </div>
    );
  }

  const handleRestart = () => {
    reset();
    setLocation("/");
  };

  return (
    <div className="h-screen w-full p-6 md:p-10 flex flex-col items-center relative overflow-hidden">
      <AnimatedBackground particleCount={16} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-5xl max-h-[calc(100vh-3rem)] overflow-y-auto space-y-10 scrollbar-hide"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-3xl p-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight glow-text">Interview Completed</h1>
            <p className="text-white/70 text-lg">Here is your AI-generated performance review.</p>
          </div>
          
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-primary/40 glow">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="64" cy="64" r="60"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * feedback.score) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="text-center">
              <span className="text-3xl font-bold glow-text">{feedback.score}</span>
              <span className="text-sm text-muted-foreground block">/ 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeedbackCard 
            title="Key Strengths" 
            items={feedback.strengths} 
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            className="border-emerald-500/20"
          />
          <FeedbackCard 
            title="Areas to Watch" 
            items={feedback.weaknesses} 
            icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
            className="border-amber-500/20"
          />
          <FeedbackCard 
            title="How to Improve" 
            items={feedback.improvements} 
            icon={<ArrowUpRight className="w-5 h-5 text-primary" />}
            className="border-primary/20"
          />
        </div>

        <div className="flex justify-center pt-8">
          <Button size="lg" onClick={handleRestart} variant="outline" className="px-8 h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Session
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function FeedbackCard({ title, items, icon, className }: { title: string, items: string[], icon: React.ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={`glass border-2 rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] ${className}`}>
        <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0">
          {icon}
          <CardTitle className="text-lg font-bold tracking-wide">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start text-sm text-white/75 leading-relaxed">
                <span className="mr-3 mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/50 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
