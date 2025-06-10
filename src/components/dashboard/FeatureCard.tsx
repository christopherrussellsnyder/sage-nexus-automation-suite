
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Feature {
  title: string;
  description: string;
  icon: any;
  color: string;
  path: string;
  remaining: number;
  used: number;
}

interface FeatureCardProps {
  feature: Feature;
  isPremium: boolean;
}

const FeatureCard = ({ feature, isPremium }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="relative group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${feature.color} text-white`}>
            <feature.icon className="h-6 w-6" />
          </div>
          {!isPremium && (
            <Badge variant={feature.remaining > 0 ? "secondary" : "destructive"}>
              {feature.remaining}/{5} left
            </Badge>
          )}
          {isPremium && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="h-3 w-3 mr-1" />
              Unlimited
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {!isPremium && (
            <div className="text-sm text-muted-foreground">
              Used {feature.used} of 5 free generations
            </div>
          )}
          <Button 
            className="w-full group"
            onClick={() => {
              console.log(`Navigating to: ${feature.path}`);
              navigate(feature.path);
            }}
            disabled={!isPremium && feature.remaining === 0}
          >
            {!isPremium && feature.remaining === 0 ? (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Continue
              </>
            ) : (
              <>
                Start Creating
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
