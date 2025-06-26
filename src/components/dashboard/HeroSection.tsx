
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Your Business Intelligence Suite</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Transform your business with AI-powered intelligence that analyzes top-performing strategies across all industries 
        to create personalized, high-converting solutions for your specific needs.
      </p>
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Target className="h-4 w-4" />
        <span>AI-powered insights for ecommerce, agencies, sales, and copywriting</span>
      </div>
    </div>
  );
};

export default HeroSection;
