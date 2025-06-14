import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, RefreshCw, Download, TrendingUp, Zap } from "lucide-react";
import { CompetitiveIntelligenceService } from "@/services/CompetitiveIntelligenceService";
import ApiKeySetup from "../ApiKeySetup";

interface AdTemplate {
  id: number;
  platform: string;
  approach: string;
  headline: string;
  body: string;
  cta: string;
  psychology: string;
  competitorInsights?: string;
  emotionalTriggers?: string[];
}

const AdCopyGenerator = () => {
  const [adData, setAdData] = useState({
    businessName: '',
    product: '',
    targetAudience: '',
    platform: '',
    goal: '',
    budget: '',
    description: '',
    industry: '',
    uniqueValue: ''
  });
  
  const [templates, setTemplates] = useState<AdTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);
  const [competitiveInsights, setCompetitiveInsights] = useState<any>(null);

  const analyzeCompetitors = async () => {
    const apiKey = CompetitiveIntelligenceService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return;
    }

    setAnalyzingCompetitors(true);
    try {
      const insights = await CompetitiveIntelligenceService.analyzeIndustryCompetitors(
        adData.industry,
        'Business',
        adData.targetAudience,
        adData.businessName,
        adData.uniqueValue
      );
      setCompetitiveInsights(insights);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setAnalyzingCompetitors(false);
    }
  };

  const generateAdTemplates = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplates: AdTemplate[] = [
      {
        id: 1,
        platform: adData.platform,
        approach: "Competitive Advantage Hook",
        headline: competitiveInsights?.topPerformers?.length > 0 ?
          `${adData.product}: ${competitiveInsights.topPerformers[0].adCopy.headlines[0].replace(/their|they/gi, 'your')}` :
          `Stop struggling with ${adData.product}!`,
        body: competitiveInsights ? 
          `While ${competitiveInsights.topPerformers[0]?.name || 'others'} ${competitiveInsights.marketGaps[0]}, ${adData.businessName} ${adData.uniqueValue}.\n\nHere's what makes us different:\n✅ ${competitiveInsights.successMetrics?.avgConversionRate}% better results than industry average\n✅ Proven track record with ${adData.targetAudience}\n✅ Unique approach that competitors can't match\n\nJoin the ${Math.floor(Math.random() * 5000) + 1000}+ businesses who chose us over the competition. See why industry leaders trust ${adData.businessName} for guaranteed results that actually move the needle.\n\nDon't settle for average when you can have exceptional. Your competitors are already falling behind - make sure you're not one of them.` :
          `${adData.businessName} helps ${adData.targetAudience} solve their biggest challenges with our proven ${adData.product} solution. Transform your business with industry-leading results that speak for themselves.`,
        cta: competitiveInsights?.commonEmotions?.includes('urgency') ? 
          "Get Your Competitive Edge Now" : 
          "Get Started Today",
        psychology: competitiveInsights ?
          `Uses competitor weakness (${competitiveInsights.marketGaps[0]}) to highlight your strength, plus proven emotional trigger: ${competitiveInsights.commonEmotions[0]}` :
          "Identifies pain points and offers immediate relief",
        competitorInsights: competitiveInsights ?
          `Outperforms average ${adData.platform} ads in your industry by leveraging competitor gap: ${competitiveInsights.marketGaps[0]}` :
          undefined,
        emotionalTriggers: competitiveInsights?.commonEmotions || ['urgency', 'social proof']
      },
      {
        id: 2,
        platform: adData.platform,
        approach: "Data-Driven Social Proof Story",
        headline: competitiveInsights?.topPerformers?.length > 0 ?
          `Join ${Math.floor(Math.random() * 5000) + 1000}+ ${adData.targetAudience} Who Chose ${adData.businessName} Over ${competitiveInsights.topPerformers[0].name}` :
          `Join 10,000+ ${adData.targetAudience} who trust ${adData.businessName}`,
        body: competitiveInsights ?
          `Here's the truth about ${adData.industry}: Most companies promise the world but deliver mediocre results.\n\nThat's exactly why Sarah J., CEO of TechStartup Inc., made the switch to ${adData.businessName}:\n\n"We tried ${competitiveInsights.topPerformers[0]?.name || 'other solutions'} first, but they ${competitiveInsights.marketGaps[0]}. Within 30 days of switching to ${adData.businessName}, we saw ${competitiveInsights.successMetrics?.avgConversionRate}% better results."\n\nSarah isn't alone. We've helped hundreds of ${adData.targetAudience} overcome the exact challenges you're facing right now.\n\nWhile competitors ${competitiveInsights.marketGaps[0]}, we guarantee ${adData.uniqueValue}. The results speak for themselves - and so do our clients.` :
          `Discover why industry leaders choose ${adData.businessName}. Our clients consistently see remarkable results that transform their business. Don't take our word for it - let the success stories speak for themselves.`,
        cta: "Join the Winners Today",
        psychology: competitiveInsights ?
          `Leverages competitor comparison + industry benchmarks (${competitiveInsights.successMetrics?.avgConversionRate}% conversion rate) + customer testimonial for maximum credibility` :
          "Uses social validation and FOMO to drive action",
        competitorInsights: competitiveInsights ?
          `Specifically targets weakness in ${competitiveInsights.topPerformers[0]?.name || 'top competitor'}'s positioning with real customer story` :
          undefined,
        emotionalTriggers: ['social proof', 'superiority', 'exclusivity']
      },
      {
        id: 3,
        platform: adData.platform,
        approach: "Problem-Agitation-Solution Framework",
        headline: `${adData.targetAudience}: Stop Wasting Money on Solutions That Don't Work`,
        body: `Let me guess...\n\nYou've tried multiple ${adData.product} solutions, spent thousands of dollars, and you're STILL not getting the results you were promised.\n\nSound familiar?\n\nHere's what's really happening: Most ${adData.industry} companies are selling you outdated strategies that worked 5 years ago. They're stuck in the past while your competitors are moving ahead.\n\nBut what if I told you there's a better way?\n\n${adData.businessName} has cracked the code that others haven't. We've helped over ${Math.floor(Math.random() * 3000) + 500} businesses like yours achieve breakthrough results using our proprietary system.\n\nNo more wasted time. No more empty promises. Just real results that impact your bottom line.\n\nReady to finally get the success you deserve?`,
        cta: "Stop Struggling - Get Results Now",
        psychology: "Problem-Agitation-Solution framework that builds emotional tension before presenting the solution",
        emotionalTriggers: ['frustration', 'hope', 'urgency']
      },
      {
        id: 4,
        platform: adData.platform,
        approach: "Behind-the-Scenes Authority",
        headline: `The ${adData.industry} Secret That ${adData.targetAudience} Don't Want You to Know`,
        body: `I'm about to share something that might upset some people in the ${adData.industry} industry...\n\nFor years, I've been watching companies like yours struggle with ${adData.product}, trying solution after solution without getting real results.\n\nMeanwhile, a small group of insiders has been using a completely different approach - one that delivers ${Math.floor(Math.random() * 300) + 200}% better results than traditional methods.\n\nI should know - I developed this system after 10+ years of studying what actually works (and what doesn't).\n\nHere's what we discovered:\n\n🔍 Most ${adData.industry} solutions focus on the wrong metrics\n🔍 The "best practices" everyone teaches are actually outdated\n🔍 There's a hidden pattern that top performers use (but never talk about)\n\nToday, I'm pulling back the curtain and sharing this system with ${adData.targetAudience} who are serious about getting real results.\n\nThis isn't theory - it's the exact blueprint we've used to help ${Math.floor(Math.random() * 1000) + 200} businesses transform their results.`,
        cta: "Get the Inside System Now",
        psychology: "Authority positioning with 'insider secret' appeal and social proof through specific numbers",
        emotionalTriggers: ['curiosity', 'exclusivity', 'authority']
      },
      {
        id: 5,
        platform: adData.platform,
        approach: "Transformation Story with Proof",
        headline: `How ${adData.businessName} Helped [Client Name] Go From Struggling to $1M+ Revenue`,
        body: `12 months ago, Marcus T. was exactly where you might be right now...\n\nHis ${adData.industry} business was stuck. Despite trying every ${adData.product} solution on the market, he was barely breaking even.\n\nFrustrated and ready to give up, Marcus discovered ${adData.businessName}.\n\nHere's what happened next:\n\n✅ Month 1: We identified the 3 critical gaps holding him back\n✅ Month 3: Revenue increased by 180% using our proven system\n✅ Month 6: Expanded to 2 new markets with confidence\n✅ Month 12: Crossed the $1M revenue milestone\n\nMarcus isn't special. He didn't have any secret advantages.\n\nHe simply applied the same system we've used to help hundreds of ${adData.targetAudience} break through their growth barriers.\n\nThe difference? Our approach focuses on ${adData.uniqueValue}, something most competitors completely ignore.\n\nWhile others are still using outdated strategies, our clients are seeing results that seemed impossible just months ago.\n\nYour transformation could be next.`,
        cta: "Start Your Transformation Today",
        psychology: "Complete transformation story with specific timeline and proof points that make success feel achievable",
        emotionalTriggers: ['hope', 'possibility', 'social proof']
      }
    ];
    
    setTemplates(generatedTemplates);
    setLoading(false);
  };

  return (
    <>
      <ApiKeySetup 
        isVisible={showApiSetup}
        onApiKeySet={() => {
          setShowApiSetup(false);
          analyzeCompetitors();
        }}
      />

      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ad Campaign Information</CardTitle>
                <CardDescription>
                  Provide details for competitive analysis and data-driven ad copy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business name"
                    value={adData.businessName}
                    onChange={(e) => setAdData({...adData, businessName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product">Product/Service</Label>
                  <Input
                    id="product"
                    placeholder="What are you advertising?"
                    value={adData.product}
                    onChange={(e) => setAdData({...adData, product: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={adData.platform} onValueChange={(value) => setAdData({...adData, platform: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="google">Google Ads</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small business owners, Parents"
                    value={adData.targetAudience}
                    onChange={(e) => setAdData({...adData, targetAudience: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign goals and key messages"
                    value={adData.description}
                    onChange={(e) => setAdData({...adData, description: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, E-commerce, Consulting"
                    value={adData.industry}
                    onChange={(e) => setAdData({...adData, industry: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniqueValue">Your Unique Advantage</Label>
                  <Textarea
                    id="uniqueValue"
                    placeholder="What makes you different from competitors?"
                    value={adData.uniqueValue}
                    onChange={(e) => setAdData({...adData, uniqueValue: e.target.value})}
                  />
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label className="text-sm font-medium flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Competitive Intelligence</span>
                  </Label>
                  {!competitiveInsights && (
                    <Button 
                      onClick={analyzeCompetitors}
                      disabled={analyzingCompetitors || !adData.industry}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {analyzingCompetitors ? 'Analyzing...' : 'Analyze Competitor Ads'}
                    </Button>
                  )}
                  
                  {competitiveInsights && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 text-green-600 mb-2">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm font-semibold">Competitor Analysis Complete!</span>
                      </div>
                      <div className="text-xs text-green-700 space-y-1">
                        <div>• Top performing ads analyzed</div>
                        <div>• {competitiveInsights.commonEmotions?.length || 0} emotional triggers identified</div>
                        <div>• {competitiveInsights.marketGaps?.length || 0} competitive advantages found</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={generateAdTemplates} 
                  className="w-full" 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {competitiveInsights ? 'Generate 5 Data-Driven Ad Templates' : 'Generate 5 Ad Templates'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {templates.length > 0 && (
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Generated Ad Copy Templates</h3>
              </div>
            )}
            
            {templates.map((template) => (
              <Card key={template.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Ad {template.id}: {template.approach}
                        <Badge variant="secondary">{template.platform}</Badge>
                        {template.competitorInsights && (
                          <Badge variant="default" className="bg-blue-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Competitor-Optimized
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {template.psychology}
                      </CardDescription>
                      {template.competitorInsights && (
                        <CardDescription className="text-sm text-blue-600 mt-1">
                          💡 {template.competitorInsights}
                        </CardDescription>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
                    <div>
                      <Label className="text-sm font-medium">Headline:</Label>
                      <p className="text-lg font-bold">{template.headline}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Body Copy:</Label>
                      <div className="text-muted-foreground whitespace-pre-line">{template.body}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Call to Action:</Label>
                      <p className="font-medium text-blue-600">{template.cta}</p>
                    </div>
                    
                    {template.emotionalTriggers && (
                      <div>
                        <Label className="text-sm font-medium">Emotional Triggers Used:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.emotionalTriggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-purple-600">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {templates.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Copy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Generate Ad Copy?</h3>
                  <p className="text-muted-foreground mb-4">
                    Fill out your campaign information and generate 5 unique ad templates with engaging, video-style content
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCopyGenerator;
