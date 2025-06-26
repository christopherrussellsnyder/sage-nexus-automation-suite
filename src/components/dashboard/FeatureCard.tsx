
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
  onClick: () => void;
}

const FeatureCard = ({ title, description, icon: Icon, color, features, onClick }: FeatureCardProps) => {
  return (
    <Card className="relative group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${color} text-white`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-1">
            {features.map((feature, index) => (
              <div key={index} className="text-sm text-muted-foreground flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </div>
            ))}
          </div>
          <Button 
            className="w-full group"
            onClick={onClick}
          >
            Start Creating
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
