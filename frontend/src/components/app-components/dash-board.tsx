// components/HeroSection.tsx
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          Unlock Your Learning Potential
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Discover curated study resources from Udemy, Coursera, and YouTube.
          Elevate your skills with StudyFinder's intelligent recommendations.
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 px-10 rounded-full animate-fade-in-up animation-delay-400 shadow-lg hover:shadow-orange-500/50 transition-all duration-300">
          Start Your Learning Journey
        </Button>
      </div>
    </div>
  );
}
