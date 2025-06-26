
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Megaphone, RefreshCw, Copy, Save, Brain, TrendingUp } from "lucide-react";

interface AdVariation {
  id: string;
  platform: string;
  headline: string;
  body: string;
  cta: string;
  competitorInsight: string;
  format: string;
}

interface AdCopyGeneratorProps {
  businessData: any;
  onGenerate: () => void;
  loading: boolean;
}

const AdCopyGenerator = ({ businessData, onGenerate, loading }: AdCopyGeneratorProps) => {
  const [adVariations, setAdVariations] = useState<AdVariation[]>([]);
  const [progress, setProgress] = useState(0);

  const generateAdCopy = async () => {
    onGenerate();
    setProgress(0);

    // Simulate competitive ad analysis
    const progressSteps = [
      "Scraping Facebook Ad Library for your niche...",
      "Analyzing Google Ads performance data...",
      "Extracting top-performing ad formats...",
      "Generating platform-optimized ad copy..."
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 25);
    }

    const adCopyVariations: AdVariation[] = [
      {
        id: "facebook",
        platform: "Facebook/Instagram Ads",
        headline: `${businessData.targetAudience}: Stop Wasting Money on ${businessData.industry} Solutions That Don't Work`,
        body: `I used to struggle with the same ${businessData.industry} challenges you're facing right now.\n\nThat's why I created ${businessData.productService} specifically for ${businessData.targetAudience}.\n\n✅ ${businessData.uniqueValue}\n✅ Proven results in 30 days\n✅ No long-term contracts\n\nOver 5,000 ${businessData.targetAudience} have already transformed their business.\n\nYour turn starts today. 👇`,
        cta: "Learn More",
        competitorInsight: "Top Facebook ads in your niche use personal storytelling + pain point agitation + social proof numbers. Avg CTR: 2.4%",
        format: "Single image or carousel format. Hook in first line, story in middle, clear CTA at bottom with emoji for engagement."
      },
      {
        id: "google",
        platform: "Google Search Ads",
        headline: `${businessData.productService} for ${businessData.targetAudience} | Free Trial`,
        body: `Get Results in 30 Days or Less. Join 10,000+ ${businessData.targetAudience} Who've Transformed Their ${businessData.industry} Business. Start Free Trial Today!`,
        cta: "Start Free Trial",
        competitorInsight: "High-performing Google ads emphasize speed of results, free trials, and social proof. Include target keyword in headline.",
        format: "Responsive search ad with 3 headlines, 2 descriptions. Focus on benefits and free trial offer."
      },
      {
        id: "linkedin",
        platform: "LinkedIn Ads",
        headline: `How ${businessData.targetAudience} Are Achieving 300% Better ${businessData.industry} Results`,
        body: `New research reveals why traditional ${businessData.industry} approaches are failing ${businessData.targetAudience}.\n\nThe solution? ${businessData.productService} designed specifically for professionals like you.\n\n• ${businessData.uniqueValue}\n• Proven ROI in 60 days\n• Trusted by industry leaders\n\nDownload our exclusive case study showing exactly how ${businessData.targetAudience} are achieving breakthrough results.`,
        cta: "Download Case Study",
        competitorInsight: "LinkedIn ads perform best with professional tone, data-driven language, and lead magnets. B2B audiences respond to case studies.",
        format: "Single image or document ad. Professional, data-focused copy with clear value proposition and lead magnet offer."
      },
      {
        id: "youtube",
        platform: "YouTube Ads",
        headline: `Watch: How This ${businessData.targetAudience} 10X'd Their ${businessData.industry} Results`,
        body: `In this exclusive video, discover the exact ${businessData.productService} strategy that's helping ${businessData.targetAudience} achieve unprecedented success.\n\nYou'll see:\n→ The #1 mistake 90% of ${businessData.targetAudience} make\n→ Our 3-step system for rapid results\n→ Real case studies and transformations\n\nWatch now before we make this private again.`,
        cta: "Watch Free Video",
        competitorInsight: "YouTube ads need video-first language with preview of content. Use curiosity + exclusivity + time pressure.",
        format: "Video ad script with hook in first 5 seconds, value preview, and strong CTA. Include urgency element."
      },
      {
        id: "tiktok",
        platform: "TikTok Ads",
        headline: `POV: You Finally Found a ${businessData.productService} That Actually Works`,
        body: `Me when I discovered ${businessData.businessName} and realized I've been doing ${businessData.industry} all wrong 😭\n\n✨ ${businessData.uniqueValue}\n✨ Results in 30 days\n✨ Perfect for ${businessData.targetAudience}\n\nNot me getting better results than people who've been doing this for years 💀\n\n#${businessData.industry} #SmallBusiness #Success`,
        cta: "Try It Now",
        competitorInsight: "TikTok ads need native, casual language with trending formats, emojis, and hashtags. POV and transformation content performs best.",
        format: "Native video format with trending audio, quick cuts, before/after visuals, and casual conversational tone."
      }
    ];

    setAdVariations(adCopyVariations);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5" />
            <span>Ad Copy Generator</span>
            <Badge variant="secondary" className="ml-2">
              <Brain className="h-3 w-3 mr-1" />
              Platform-Optimized
            </Badge>
          </CardTitle>
          <CardDescription>
            Generate platform-specific ad copy based on analysis of top-performing ads in your niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Analyzing competitor ad performance...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button 
            onClick={generateAdCopy}
            disabled={loading}
            className="w-full mb-6"
            size="lg"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Megaphone className="h-4 w-4 mr-2" />
            )}
            Generate Ad Copy
          </Button>

          {adVariations.map((ad) => (
            <Card key={ad.id} className="mb-4">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{ad.platform}</span>
                      <Badge variant="outline">{ad.platform.split(' ')[0]}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1 text-blue-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {ad.competitorInsight}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2">Format Guidelines</Badge>
                    <p className="text-sm text-muted-foreground">{ad.format}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Headline:</label>
                    <p className="text-lg font-bold">{ad.headline}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Ad Copy:</label>
                    <div className="text-muted-foreground whitespace-pre-line">{ad.body}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Call to Action:</label>
                    <p className="font-medium text-purple-600">{ad.cta}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdCopyGenerator;
