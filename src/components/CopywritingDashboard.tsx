
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  Globe, 
  Mail, 
  Share2,
  FileText,
  Megaphone,
  RefreshCw
} from "lucide-react";
import CopyGenerationHub from './copywriting/CopyGenerationHub';

const CopywritingDashboard = () => {
  const [activeType, setActiveType] = useState<'website' | 'ads' | 'emails' | 'social'>('website');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Copywriting Suite</h2>
          <p className="text-muted-foreground">Generate high-converting copy for all your marketing needs</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeType === 'website' ? 'default' : 'outline'}
            onClick={() => setActiveType('website')}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Website</span>
          </Button>
          <Button
            variant={activeType === 'ads' ? 'default' : 'outline'}
            onClick={() => setActiveType('ads')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Ads</span>
          </Button>
          <Button
            variant={activeType === 'emails' ? 'default' : 'outline'}
            onClick={() => setActiveType('emails')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Emails</span>
          </Button>
          <Button
            variant={activeType === 'social' ? 'default' : 'outline'}
            onClick={() => setActiveType('social')}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Social</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Copy Generation Hub */}
      <CopyGenerationHub activeType={activeType} />
    </div>
  );
};

export default CopywritingDashboard;
