import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Brain, TrendingUp } from "lucide-react";
import WebsiteCopyGenerator from './WebsiteCopyGenerator';
import AdCopyGenerator from './AdCopyGenerator';
import EmailSequenceGenerator from '../copy-generation/EmailSequenceGenerator';
import SocialContentGenerator from '../copy-generation/SocialContentGenerator';

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
    tone: 'professional'
  });
  
  const [loading, setLoading] = useState(false);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<any>(null);
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);

  const analyzeCompetitors = async () => {
    setAnalyzingCompetitors(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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

  const handleGenerate = () => {
    setLoading(true);
    // The specific generator components will handle their own generation
    setTimeout(() => setLoading(false), 4000);
  };

  const getTypeConfig = () => {
    switch (activeType) {
      case 'website':
        return {
          title: 'Website Copy Generator',
          description: 'Generate section-by-section website copy based on top competitor analysis'
        };
      case 'ads':
        return {
          title: 'Ad Copy Generator', 
          description: 'Create platform-specific ad copy optimized for each channel'
        };
      case 'emails':
        return {
          title: 'Email Copy Generator',
          description: 'Generate email sequences based on high-converting templates'
        };
      case 'social':
        return {
          title: 'Social Content Generator',
          description: 'Create platform-optimized social media content'
        };
      default:
        return {
          title: 'Copy Generator',
          description: 'Generate high-converting copy'
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
            </CardContent>
          </Card>
        </div>

        {/* Type-Specific Generators */}
        <div className="lg:col-span-2">
          {activeType === 'website' && (
            <WebsiteCopyGenerator 
              businessData={businessData}
              onGenerate={handleGenerate}
              loading={loading}
            />
          )}
          
          {activeType === 'ads' && (
            <AdCopyGenerator 
              businessData={businessData}
              onGenerate={handleGenerate}
              loading={loading}
            />
          )}
          
          {activeType === 'emails' && (
            <EmailSequenceGenerator />
          )}
          
          {activeType === 'social' && (
            <SocialContentGenerator />
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyGenerationHub;
