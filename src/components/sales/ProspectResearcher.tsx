
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Building, User, Globe, TrendingUp, DollarSign, Users, Brain } from 'lucide-react';

interface ProspectData {
  name: string;
  company: string;
  linkedinUrl: string;
  companyWebsite: string;
  industry: string;
  location: string;
}

interface ProspectInsights {
  score: number;
  companySize: string;
  revenue: string;
  techStack: string[];
  painPoints: string[];
  buyingSignals: string[];
  decisionMakers: string[];
  recentNews: string[];
}

interface ProspectResearcherProps {
  onResearch: (data: ProspectData) => void;
  isResearching: boolean;
  progress: number;
  insights?: ProspectInsights;
}

const ProspectResearcher = ({ onResearch, isResearching, progress, insights }: ProspectResearcherProps) => {
  const [formData, setFormData] = useState<ProspectData>({
    name: '',
    company: '',
    linkedinUrl: '',
    companyWebsite: '',
    industry: '',
    location: ''
  });

  const updateField = (field: keyof ProspectData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResearch(formData);
  };

  const isFormValid = formData.name && formData.company && (formData.linkedinUrl || formData.companyWebsite);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Research Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Prospect Research Engine</span>
          </CardTitle>
          <CardDescription>
            AI-powered prospect research with insights from multiple data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Prospect Name *</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                placeholder="https://linkedin.com/in/johnsmith"
                value={formData.linkedinUrl}
                onChange={(e) => updateField('linkedinUrl', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                placeholder="https://acmecorp.com"
                value={formData.companyWebsite}
                onChange={(e) => updateField('companyWebsite', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Technology, Healthcare, etc."
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
              />
            </div>

            {isResearching && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Researching prospect...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="text-xs text-muted-foreground">
                  Analyzing LinkedIn profile, company data, news articles, and more...
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!isFormValid || isResearching}
            >
              <Brain className="h-4 w-4 mr-2" />
              {isResearching ? 'Researching...' : 'Research Prospect'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Research Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Prospect Insights</span>
          </CardTitle>
          <CardDescription>
            AI-generated insights and qualification scoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          {insights ? (
            <div className="space-y-6">
              {/* Qualification Score */}
              <div className="text-center p-4 border rounded-lg">
                <div className={`text-4xl font-bold ${getScoreColor(insights.score)}`}>
                  {insights.score}
                </div>
                <div className="text-sm text-muted-foreground">Qualification Score</div>
                <Progress value={insights.score} className="mt-2" />
              </div>

              {/* Company Info */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Company Information</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <div className="font-medium">{insights.companySize}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue:</span>
                    <div className="font-medium">{insights.revenue}</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="font-semibold">Technology Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {insights.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pain Points */}
              <div className="space-y-2">
                <h4 className="font-semibold">Identified Pain Points</h4>
                <ul className="text-sm space-y-1">
                  {insights.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buying Signals */}
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Buying Signals</h4>
                <ul className="text-sm space-y-1">
                  {insights.buyingSignals.map((signal, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decision Makers */}
              <div className="space-y-2">
                <h4 className="font-semibold">Key Decision Makers</h4>
                <div className="space-y-1">
                  {insights.decisionMakers.map((person, index) => (
                    <div key={index} className="text-sm flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{person}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Research Data</h3>
              <p className="text-muted-foreground">
                Enter prospect information and click "Research Prospect" to get AI-powered insights
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectResearcher;
