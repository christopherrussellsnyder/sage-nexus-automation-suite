
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Save, 
  Download, 
  Target,
  Brain,
  TrendingUp,
  Zap
} from "lucide-react";
import { MarketingIntelligenceService } from "@/services/MarketingIntelligenceService";

interface CopyVariation {
  id: number;
  headline: string;
  body: string;
  cta: string;
  psychology: string;
  framework: string;
  competitorInsights?: string;
}

interface CopyGenerationHubProps {
  activeType: 'website' | 'ads' | 'emails' | 'social';
}

const CopyGenerationHub = ({ activeType }: CopyGenerationHubProps) => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    productService: '',
    uniqueValue: '',
    tone: 'professional',
    niche: ''
  });

  const [variations, setVariations] = useState<CopyVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<any>(null);
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);

  const analyzeCompetitors = async () => {
    setAnalyzingCompetitors(true);
    try {
      // Simulate competitor analysis using the marketing intelligence service approach
      const mockAnalysis = {
        topPerformers: [
          {
            name: `Top ${businessData.industry} Brand`,
            conversionRate: 4.2,
            topMessages: [
              "Transform your business in 30 days",
              "The only solution you'll ever need",
              "Join 10,000+ successful customers"
            ],
            psychologyTriggers: ['urgency', 'social proof', 'authority'],
            frameworks: ['Problem-Agitation-Solution', 'Before-After-Bridge', 'AIDA']
          }
        ],
        industryTrends: [
          "Increasing focus on personalization",
          "Emphasis on quick results and transformation",
          "Strong use of social proof and testimonials"
        ],
        commonEmotions: ['urgency', 'desire', 'fear of missing out', 'trust'],
        gapOpportunities: [
          "Most competitors focus on features, not outcomes",
          "Limited use of storytelling in copy",
          "Weak emotional connection in messaging"
        ]
      };
      setCompetitorAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setAnalyzingCompetitors(false);
    }
  };

  const generateCopy = async () => {
    setLoading(true);
    
    // Simulate AI copy generation with competitive insights
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedVariations: CopyVariation[] = [
      {
        id: 1,
        headline: competitorAnalysis ? 
          `${businessData.productService}: The ${businessData.industry} Solution That Actually Works` :
          `Transform Your ${businessData.industry} Results with ${businessData.businessName}`,
        body: competitorAnalysis ?
          `While other ${businessData.industry} companies focus on features, we focus on outcomes. Here's why ${businessData.targetAudience} choose us over the competition:\n\n✓ ${businessData.uniqueValue}\n✓ Proven results with ${businessData.targetAudience}\n✓ ${competitorAnalysis.topPerformers[0]?.conversionRate}% better conversion rates than industry average\n\nDon't settle for average solutions. Join the thousands who've already transformed their business with our proven system.` :
          `${businessData.businessName} helps ${businessData.targetAudience} achieve breakthrough results with our innovative ${businessData.productService}. Our proven approach delivers the outcomes you've been looking for.`,
        cta: "Get Started Today",
        psychology: competitorAnalysis ? 
          `Leverages competitor weakness (feature focus) + industry authority (${competitorAnalysis.topPerformers[0]?.conversionRate}% conversion rate)` :
          "Social proof + outcome focus + urgency",
        framework: "Problem-Agitation-Solution",
        competitorInsights: competitorAnalysis ? 
          `Addresses gap: ${competitorAnalysis.gapOpportunities[0]}` : undefined
      },
      {
        id: 2,
        headline: `The Secret ${businessData.industry} Strategy That's Changing Everything`,
        body: `There's a hidden strategy that the top 1% of ${businessData.industry} businesses use to dominate their market.\n\nMost ${businessData.targetAudience} don't know about it.\n\nBut those who do are seeing:\n• 300% faster growth\n• Higher customer satisfaction\n• Unprecedented market share\n\nThis isn't theory. It's the exact system ${businessData.businessName} uses to deliver ${businessData.uniqueValue}.\n\nReady to join the elite 1%?`,
        cta: "Discover the Secret",
        psychology: "Curiosity + exclusivity + insider knowledge + social proof",
        framework: "Secret/Insider Knowledge",
        competitorInsights: competitorAnalysis ? 
          `Uses emotional trigger: ${competitorAnalysis.commonEmotions[0]}` : undefined
      },
      {
        id: 3,
        headline: `How ${businessData.businessName} Helps ${businessData.targetAudience} Achieve [Specific Result] in 30 Days`,
        body: `Imagine if you could achieve [specific transformation] in just 30 days.\n\nNo more struggling with [common pain point].\nNo more wasting time on solutions that don't work.\nNo more feeling frustrated with slow progress.\n\nOur ${businessData.productService} makes this possible through:\n\n🎯 Our proven 3-step system\n🎯 Personalized support from our expert team\n🎯 Tools designed specifically for ${businessData.targetAudience}\n\nOver 5,000 customers have already experienced this transformation.\n\nYour turn starts today.`,
        cta: "Start Your 30-Day Transformation",
        psychology: "Problem-agitation + specific timeframe + social proof + outcome visualization",
        framework: "Before-After-Bridge"
      },
      {
        id: 4,
        headline: `Warning: Most ${businessData.industry} Advice is Outdated (Here's What Actually Works)`,
        body: `The ${businessData.industry} world has changed dramatically in the last 2 years.\n\nYet most ${businessData.targetAudience} are still using strategies from 2020.\n\nHere's what's NOT working anymore:\n❌ [Old approach 1]\n❌ [Old approach 2]\n❌ [Old approach 3]\n\nHere's what IS working:\n✅ ${businessData.uniqueValue}\n✅ Our data-driven methodology\n✅ Personalized strategies for ${businessData.targetAudience}\n\n${businessData.businessName} stays ahead of these changes so you don't have to.\n\nStop using outdated strategies. Start getting real results.`,
        cta: "Get the Updated Strategy",
        psychology: "Authority positioning + myth-busting + urgency + current relevance",
        framework: "Myth-Busting + Authority"
      },
      {
        id: 5,
        headline: `${businessData.targetAudience}: Here's Your Step-by-Step Success Blueprint`,
        body: `After working with 1,000+ ${businessData.targetAudience}, we've identified the exact blueprint for success in ${businessData.industry}.\n\nStep 1: [Specific action]\nStep 2: [Specific action]\nStep 3: [Specific action]\n\nThis isn't guesswork. It's the proven path that our most successful customers follow.\n\nThe same blueprint that helped [Customer Name] achieve [specific result] in [timeframe].\n\nThe same system that's generated over $10M in results for our customers.\n\n${businessData.businessName} provides everything you need to follow this blueprint successfully.\n\nReady to follow the proven path to success?`,
        cta: "Get Your Blueprint Now",
        psychology: "Step-by-step clarity + case study proof + proven methodology + outcome guarantee",
        framework: "Blueprint/System Approach"
      }
    ];

    setVariations(generatedVariations);
    setLoading(false);
  };

  const getTypeConfig = () => {
    switch (activeType) {
      case 'website':
        return {
          title: 'Website Copy Generator',
          description: 'Generate headlines, landing pages, product descriptions, and CTAs',
          placeholder: 'Describe your website section or page...'
        };
      case 'ads':
        return {
          title: 'Ad Copy Generator',
          description: 'Create high-converting ads for all major platforms',
          placeholder: 'Describe your ad campaign...'
        };
      case 'emails':
        return {
          title: 'Email Copy Generator',
          description: 'Generate complete email sequences that convert',
          placeholder: 'Describe your email campaign...'
        };
      case 'social':
        return {
          title: 'Social Content Generator',
          description: 'Create engaging social media content',
          placeholder: 'Describe your social media goals...'
        };
      default:
        return {
          title: 'Copy Generator',
          description: 'Generate high-converting copy',
          placeholder: 'Describe what you need...'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>{config.title}</span>
              </CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={businessData.businessName}
                  onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry/Niche</Label>
                <Input
                  id="industry"
                  placeholder="e.g., SaaS, E-commerce, Coaching"
                  value={businessData.industry}
                  onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners"
                  value={businessData.targetAudience}
                  onChange={(e) => setBusinessData({...businessData, targetAudience: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productService">Product/Service</Label>
                <Input
                  id="productService"
                  placeholder="What do you offer?"
                  value={businessData.productService}
                  onChange={(e) => setBusinessData({...businessData, productService: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValue"
                  placeholder="What makes you different?"
                  value={businessData.uniqueValue}
                  onChange={(e) => setBusinessData({...businessData, uniqueValue: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Voice</Label>
                <Select value={businessData.tone} onValueChange={(value) => setBusinessData({...businessData, tone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Competitive Intelligence</span>
                </Label>
                {!competitorAnalysis && (
                  <Button 
                    onClick={analyzeCompetitors}
                    disabled={analyzingCompetitors || !businessData.industry}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {analyzingCompetitors ? 'Analyzing...' : 'Analyze Industry Copy'}
                  </Button>
                )}
                
                {competitorAnalysis && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-600 mb-2">
                      <Brain className="h-4 w-4" />
                      <span className="text-sm font-semibold">Analysis Complete!</span>
                    </div>
                    <div className="text-xs text-green-700 space-y-1">
                      <div>• {competitorAnalysis.commonEmotions?.length || 0} emotional triggers identified</div>
                      <div>• {competitorAnalysis.gapOpportunities?.length || 0} market gaps found</div>
                      <div>• Industry conversion benchmarks loaded</div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={generateCopy} 
                className="w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                {competitorAnalysis ? 'Generate 5 Intelligence-Powered Variations' : 'Generate 5 Copy Variations'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Variations */}
        <div className="lg:col-span-2 space-y-4">
          {variations.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">5 Copy Variations</h3>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Target className="h-3 w-3" />
                <span>A/B Test Ready</span>
              </Badge>
            </div>
          )}

          {variations.map((variation) => (
            <Card key={variation.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      Variation {variation.id}: {variation.framework}
                      {variation.competitorInsights && (
                        <Badge variant="default" className="bg-blue-600">
                          <Brain className="h-3 w-3 mr-1" />
                          Intelligence-Powered
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      Psychology: {variation.psychology}
                    </CardDescription>
                    {variation.competitorInsights && (
                      <CardDescription className="text-sm text-blue-600 mt-1">
                        💡 {variation.competitorInsights}
                      </CardDescription>
                    )}
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
                <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
                  <div>
                    <Label className="text-sm font-medium">Headline:</Label>
                    <p className="text-lg font-bold">{variation.headline}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Body Copy:</Label>
                    <div className="text-muted-foreground whitespace-pre-line">{variation.body}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Call to Action:</Label>
                    <p className="font-medium text-blue-600">{variation.cta}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {variations.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Copy?</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out your business information and get 5 unique copy variations with competitive intelligence
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyGenerationHub;
