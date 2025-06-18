
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, RefreshCw, Copy, Save, Brain, TrendingUp } from "lucide-react";

interface WebsiteSection {
  id: string;
  section: string;
  headline: string;
  subheadline?: string;
  body: string;
  cta: string;
  competitorInsight: string;
  layout: string;
}

interface WebsiteCopyGeneratorProps {
  businessData: any;
  onGenerate: () => void;
  loading: boolean;
}

const WebsiteCopyGenerator = ({ businessData, onGenerate, loading }: WebsiteCopyGeneratorProps) => {
  const [sections, setSections] = useState<WebsiteSection[]>([]);
  const [progress, setProgress] = useState(0);

  const generateWebsiteCopy = async () => {
    onGenerate();
    setProgress(0);

    // Simulate competitive analysis and generation
    const progressSteps = [
      "Analyzing top-performing websites in your niche...",
      "Extracting layout patterns from competitors...", 
      "Analyzing conversion elements and positioning...",
      "Generating optimized website sections..."
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 25);
    }

    // Generate website-specific sections based on competitive analysis
    const websiteSections: WebsiteSection[] = [
      {
        id: "hero",
        section: "Hero Section (Above the Fold)",
        headline: `${businessData.productService} That Actually Delivers Results for ${businessData.targetAudience}`,
        subheadline: `Join 10,000+ ${businessData.targetAudience} who've transformed their ${businessData.industry} business with our proven system`,
        body: `Stop struggling with ineffective solutions. Our ${businessData.productService} has helped thousands of ${businessData.targetAudience} achieve breakthrough results. ${businessData.uniqueValue}`,
        cta: "Get Started Free Today",
        competitorInsight: "Analysis shows 85% of top performers lead with outcome-focused headlines and use social proof numbers in hero sections",
        layout: "Left-aligned headline with right-side hero image/video. CTA button prominently displayed with contrasting color."
      },
      {
        id: "benefits",
        section: "Key Benefits Section (Middle)",
        headline: "Why ${businessData.targetAudience} Choose Us Over The Competition",
        body: `✓ ${businessData.uniqueValue}\n✓ Proven track record with ${businessData.targetAudience}\n✓ 90-day money-back guarantee\n✓ 24/7 expert support included\n✓ Setup in under 30 minutes`,
        cta: "See How It Works",
        competitorInsight: "Top converting sites use 3-5 benefit points with checkmarks and focus on unique differentiation",
        layout: "3-column layout with icons, benefit headlines, and supporting text. Each benefit should have visual hierarchy."
      },
      {
        id: "social-proof",
        section: "Social Proof Section",
        headline: "Trusted by Industry Leaders",
        body: `"${businessData.businessName} helped us increase our ${businessData.industry} results by 300% in just 60 days. The ROI was immediate and substantial." - Sarah Johnson, CEO of TechCorp\n\n"Finally, a solution that actually works. We've tried everything else in the ${businessData.industry} space, but nothing compared to ${businessData.businessName}." - Mike Chen, Founder`,
        cta: "Read More Success Stories",
        competitorInsight: "High-converting sites feature 2-3 detailed testimonials with photos, names, and specific results/numbers",
        layout: "Testimonial cards with customer photos, names, titles, and detailed quotes. Star ratings prominently displayed."
      },
      {
        id: "cta-bottom",
        section: "Bottom CTA Section",
        headline: "Ready to Transform Your ${businessData.industry} Results?",
        body: `Join the thousands of ${businessData.targetAudience} who've already achieved breakthrough success with ${businessData.businessName}. Don't wait - your competitors are already moving ahead.`,
        cta: "Start Your Transformation Now",
        competitorInsight: "Most effective bottom CTAs create urgency and reference competitor advantage while reinforcing the main benefit",
        layout: "Centered layout with bold headline, supporting text, and large prominent CTA button. Optional: Add trust badges below."
      }
    ];

    setSections(websiteSections);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Website Copy Generator</span>
            <Badge variant="secondary" className="ml-2">
              <Brain className="h-3 w-3 mr-1" />
              Competitor-Analyzed
            </Badge>
          </CardTitle>
          <CardDescription>
            Generate website copy based on analysis of top-performing competitor websites in your niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Analyzing competitor websites...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button 
            onClick={generateWebsiteCopy}
            disabled={loading}
            className="w-full mb-6"
            size="lg"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 mr-2" />
            )}
            Generate Website Copy
          </Button>

          {sections.map((section) => (
            <Card key={section.id} className="mb-4">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{section.section}</CardTitle>
                    <CardDescription className="mt-1 text-blue-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {section.competitorInsight}
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
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2">Layout Recommendation</Badge>
                    <p className="text-sm text-muted-foreground">{section.layout}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Headline:</label>
                    <p className="text-lg font-bold">{section.headline}</p>
                  </div>
                  
                  {section.subheadline && (
                    <div>
                      <label className="text-sm font-medium">Subheadline:</label>
                      <p className="text-muted-foreground">{section.subheadline}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium">Body Copy:</label>
                    <div className="text-muted-foreground whitespace-pre-line">{section.body}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Call to Action:</label>
                    <p className="font-medium text-blue-600">{section.cta}</p>
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

export default WebsiteCopyGenerator;
