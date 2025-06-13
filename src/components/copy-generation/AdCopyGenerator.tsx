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
        approach: "Competitive Advantage",
        headline: competitiveInsights?.topPerformers?.length > 0 ?
          `${adData.product}: ${competitiveInsights.topPerformers[0].adCopy.headlines[0].replace(/their|they/gi, 'your')}` :
          `Stop struggling with ${adData.product}!`,
        body: competitiveInsights ? 
          `While ${competitiveInsights.topPerformers[0]?.name || 'others'} ${competitiveInsights.marketGaps[0]}, ${adData.businessName} ${adData.uniqueValue}. Join ${adData.targetAudience} who are getting ${competitiveInsights.successMetrics?.avgConversionRate}% better results.` :
          `${adData.businessName} helps ${adData.targetAudience} solve their biggest challenges with our proven ${adData.product} solution.`,
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
        approach: "Data-Driven Social Proof",
        headline: competitiveInsights?.topPerformers?.length > 0 ?
          `Join ${Math.floor(Math.random() * 5000) + 1000}+ ${adData.targetAudience} Who Chose ${adData.businessName} Over ${competitiveInsights.topPerformers[0].name}` :
          `Join 10,000+ ${adData.targetAudience} who trust ${adData.businessName}`,
        body: competitiveInsights ?
          `Our ${adData.product} delivers ${competitiveInsights.successMetrics?.avgConversionRate}% better results than industry average. While competitors ${competitiveInsights.marketGaps[0]}, we guarantee ${adData.uniqueValue}.` :
          `See why industry leaders choose our ${adData.product} for guaranteed results. Don't miss out on what everyone's talking about.`,
        cta: "Join the Winners",
        psychology: competitiveInsights ?
          `Leverages competitor comparison + industry benchmarks (${competitiveInsights.successMetrics?.avgConversionRate}% conversion rate) for maximum credibility` :
          "Uses social validation and FOMO to drive action",
        competitorInsights: competitiveInsights ?
          `Specifically targets weakness in ${competitiveInsights.topPerformers[0]?.name || 'top competitor'}'s positioning` :
          undefined,
        emotionalTriggers: ['social proof', 'superiority', 'exclusivity']
      },
      // ... additional enhanced templates
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
                  {competitiveInsights ? 'Generate Data-Driven Ad Templates' : 'Generate 5 Ad Templates'}
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
                      <p className="text-muted-foreground">{template.body}</p>
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
                    Fill out your campaign information and generate 5 unique ad templates
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
