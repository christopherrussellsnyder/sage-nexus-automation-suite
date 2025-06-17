
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Globe,
  Zap,
  Eye
} from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  structuredData: any;
}

interface SEOOptimizerProps {
  seoData: SEOData;
  onUpdate: (data: SEOData) => void;
  websiteName: string;
}

const SEOOptimizer = ({ seoData, onUpdate, websiteName }: SEOOptimizerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState(75);
  const [suggestions, setSuggestions] = useState([
    { type: 'warning', message: 'Title could be more descriptive', fixed: false },
    { type: 'success', message: 'Meta description length is optimal', fixed: true },
    { type: 'error', message: 'Missing structured data markup', fixed: false }
  ]);

  const analyzeSEO = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI-powered SEO analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newScore = Math.min(100, seoScore + Math.floor(Math.random() * 15));
    setSeoScore(newScore);
    
    const newSuggestions = [
      { type: 'success', message: 'Page title optimized for target keywords', fixed: true },
      { type: 'success', message: 'Meta description follows best practices', fixed: true },
      { type: 'warning', message: 'Consider adding more internal links', fixed: false },
      { type: 'info', message: 'Image alt texts could be more descriptive', fixed: false }
    ];
    
    setSuggestions(newSuggestions);
    setIsAnalyzing(false);
  };

  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": websiteName,
      "url": window.location.origin,
      "description": seoData.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    onUpdate({
      ...seoData,
      structuredData
    });
  };

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>SEO Performance</span>
            </div>
            <Badge variant={seoScore >= 80 ? 'default' : seoScore >= 60 ? 'secondary' : 'destructive'}>
              {seoScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall SEO Score</span>
                <span className="text-sm">{seoScore}%</span>
              </div>
              <Progress value={seoScore} className="h-2" />
            </div>
            
            <Button onClick={analyzeSEO} disabled={isAnalyzing} className="w-full">
              <Target className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Run SEO Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                {suggestion.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {suggestion.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                {suggestion.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                {suggestion.type === 'info' && <Eye className="h-5 w-5 text-blue-500 mt-0.5" />}
                
                <div className="flex-1">
                  <p className="text-sm">{suggestion.message}</p>
                  {!suggestion.fixed && (
                    <Button size="sm" variant="outline" className="mt-2">
                      Fix This
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo-title">Page Title</Label>
            <Input
              id="seo-title"
              value={seoData.title}
              onChange={(e) => onUpdate({ ...seoData, title: e.target.value })}
              placeholder="Enter page title (50-60 characters)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {seoData.title.length}/60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              value={seoData.description}
              onChange={(e) => onUpdate({ ...seoData, description: e.target.value })}
              placeholder="Enter meta description (150-160 characters)"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {seoData.description.length}/160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input
              id="seo-keywords"
              value={seoData.keywords.join(', ')}
              onChange={(e) => onUpdate({ 
                ...seoData, 
                keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
              })}
              placeholder="Enter keywords separated by commas"
            />
          </div>

          <div>
            <Label htmlFor="canonical-url">Canonical URL</Label>
            <Input
              id="canonical-url"
              value={seoData.canonicalUrl}
              onChange={(e) => onUpdate({ ...seoData, canonicalUrl: e.target.value })}
              placeholder="https://yourdomain.com/page"
            />
          </div>

          <Button onClick={generateStructuredData} variant="outline" className="w-full">
            <Globe className="h-4 w-4 mr-2" />
            Generate Structured Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOOptimizer;
