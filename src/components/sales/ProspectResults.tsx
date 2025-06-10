
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Building, TrendingUp, Target, Download, MessageSquare } from 'lucide-react';

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

interface ProspectData {
  name: string;
  company: string;
  linkedinUrl: string;
  companyWebsite: string;
  industry: string;
  location: string;
}

interface ProspectResultsProps {
  insights: ProspectInsights;
  prospectData: ProspectData;
  onClose: () => void;
}

const ProspectResults = ({ insights, prospectData, onClose }: ProspectResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportResults = () => {
    const content = `
PROSPECT RESEARCH RESULTS
Prospect: ${prospectData.name}
Company: ${prospectData.company}
Industry: ${prospectData.industry}
Location: ${prospectData.location}

QUALIFICATION SCORE: ${insights.score}/100

COMPANY INFORMATION:
- Size: ${insights.companySize}
- Revenue: ${insights.revenue}

TECHNOLOGY STACK:
${insights.techStack.map(tech => `- ${tech}`).join('\n')}

PAIN POINTS IDENTIFIED:
${insights.painPoints.map(point => `- ${point}`).join('\n')}

BUYING SIGNALS:
${insights.buyingSignals.map(signal => `- ${signal}`).join('\n')}

KEY DECISION MAKERS:
${insights.decisionMakers.map(person => `- ${person}`).join('\n')}

RECENT NEWS & ACTIVITIES:
${insights.recentNews.map(news => `- ${news}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prospectData.name}-research-results.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Research Results: {prospectData.name}</span>
              </CardTitle>
              <CardDescription>{prospectData.company} • {prospectData.industry}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={exportResults}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Qualification Score */}
          <div className="text-center p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <div className={`text-5xl font-bold ${getScoreColor(insights.score)}`}>
              {insights.score}
            </div>
            <div className="text-lg font-medium mt-2">Qualification Score</div>
            <div className="text-sm text-muted-foreground">
              {insights.score >= 80 ? 'Highly Qualified' : insights.score >= 60 ? 'Moderately Qualified' : 'Needs Nurturing'}
            </div>
          </div>

          {/* Company Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Company Size:</span>
                  <p className="text-lg">{insights.companySize}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Annual Revenue:</span>
                  <p className="text-lg">{insights.revenue}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {insights.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pain Points */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Pain Points Identified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {insights.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buying Signals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Buying Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {insights.buyingSignals.map((signal, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg bg-green-50">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                    <span className="text-sm">{signal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Decision Makers */}
          <Card>
            <CardHeader>
              <CardTitle>Key Decision Makers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.decisionMakers.map((person, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>{person}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle>Recent News & Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.recentNews.map((news, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm">{news}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Generate Outreach Sequence
            </Button>
            <Button variant="outline" className="flex-1">
              <Target className="h-4 w-4 mr-2" />
              Add to Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectResults;
