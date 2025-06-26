
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw } from "lucide-react";
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
          description: 'Generate section-by-section website copy optimized for conversions'
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

              <div className="pt-4 border-t">
                <Badge variant="outline" className="w-full justify-center">
                  For competitive intelligence, use the Intelligence feature
                </Badge>
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
