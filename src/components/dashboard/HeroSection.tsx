
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Crown } from "lucide-react";

interface HeroSectionProps {
  isPremium: boolean;
  debugInfo: any;
  onDebug: () => void;
}

const HeroSection = ({ isPremium, debugInfo, onDebug }: HeroSectionProps) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-gradient">Welcome to Your Copy Generation Suite</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Transform your business with AI-powered copy that analyzes top-performing content across all industries 
        to create personalized, high-converting templates for your specific needs.
      </p>
      {!isPremium && (
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>Free trial: 5 generations per feature • Upgrade for unlimited access</span>
        </div>
      )}
      
      {/* Debug Section - Remove this after fixing */}
      <div className="p-4 bg-yellow-50 border rounded-lg">
        <Button onClick={onDebug} variant="outline" size="sm" className="button-glow">
          Debug Feature Data
        </Button>
        {debugInfo && (
          <pre className="mt-2 text-xs text-left overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
