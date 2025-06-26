
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Users, Mail, Phone, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  estimatedValue: number;
  lastContact: string;
  notes: string;
  industry: string;
}

interface LeadScore {
  leadId: string;
  score: number;
  factors: {
    companySize: number;
    budget: number;
    timeline: number;
    engagement: number;
    authority: number;
  };
  recommendation: 'high-priority' | 'medium-priority' | 'low-priority' | 'nurture';
  nextAction: string;
}

interface ClientScoringDashboardProps {
  leads: Lead[];
  onNurtureLead: (lead: Lead) => void;
  onScheduleMeeting: (lead: Lead) => void;
}

const ClientScoringDashboard = ({ leads, onNurtureLead, onScheduleMeeting }: ClientScoringDashboardProps) => {
  const [leadScores, setLeadScores] = useState<LeadScore[]>([]);

  useEffect(() => {
    // Calculate lead scores based on various factors
    const scores = leads.map(lead => {
      const factors = {
        companySize: getCompanySizeScore(lead.company),
        budget: getBudgetScore(lead.estimatedValue),
        timeline: getTimelineScore(lead.lastContact),
        engagement: getEngagementScore(lead.source, lead.status),
        authority: getAuthorityScore(lead.name, lead.email)
      };

      const totalScore = Math.round(
        (factors.companySize * 0.2 +
         factors.budget * 0.3 +
         factors.timeline * 0.2 +
         factors.engagement * 0.2 +
         factors.authority * 0.1) * 100
      );

      return {
        leadId: lead.id,
        score: totalScore,
        factors,
        recommendation: getRecommendation(totalScore),
        nextAction: getNextAction(totalScore, lead.status)
      };
    });

    setLeadScores(scores);
  }, [leads]);

  const getCompanySizeScore = (company: string): number => {
    // Simple scoring based on company name patterns
    if (company.toLowerCase().includes('inc') || company.toLowerCase().includes('corp')) return 0.8;
    if (company.toLowerCase().includes('startup')) return 0.6;
    return 0.7;
  };

  const getBudgetScore = (value: number): number => {
    if (value >= 50000) return 1.0;
    if (value >= 25000) return 0.8;
    if (value >= 10000) return 0.6;
    if (value >= 5000) return 0.4;
    return 0.2;
  };

  const getTimelineScore = (lastContact: string): number => {
    const daysSince = Math.floor((new Date().getTime() - new Date(lastContact).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 1) return 1.0;
    if (daysSince <= 3) return 0.8;
    if (daysSince <= 7) return 0.6;
    if (daysSince <= 14) return 0.4;
    return 0.2;
  };

  const getEngagementScore = (source: string, status: string): number => {
    let score = 0.5;
    if (source === 'Website Contact' || source === 'Referral') score += 0.3;
    if (status === 'qualified' || status === 'proposal') score += 0.2;
    return Math.min(score, 1.0);
  };

  const getAuthorityScore = (name: string, email: string): number => {
    // Simple scoring based on common executive titles/patterns
    const title = name.toLowerCase();
    if (title.includes('ceo') || title.includes('founder') || title.includes('owner')) return 1.0;
    if (title.includes('director') || title.includes('manager')) return 0.8;
    if (email.includes('info@') || email.includes('contact@')) return 0.3;
    return 0.6;
  };

  const getRecommendation = (score: number): LeadScore['recommendation'] => {
    if (score >= 80) return 'high-priority';
    if (score >= 60) return 'medium-priority';
    if (score >= 40) return 'low-priority';
    return 'nurture';
  };

  const getNextAction = (score: number, status: string): string => {
    if (score >= 80) return 'Schedule immediate call';
    if (score >= 60) return 'Send personalized proposal';
    if (score >= 40) return 'Follow up with case studies';
    return 'Add to nurture sequence';
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'high-priority': return 'bg-red-500';
      case 'medium-priority': return 'bg-yellow-500';
      case 'low-priority': return 'bg-blue-500';
      case 'nurture': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-blue-600';
    return 'text-gray-600';
  };

  const sortedLeads = leadScores
    .map(score => ({
      ...score,
      lead: leads.find(l => l.id === score.leadId)!
    }))
    .sort((a, b) => b.score - a.score);

  const highPriorityCount = leadScores.filter(s => s.recommendation === 'high-priority').length;
  const averageScore = Math.round(leadScores.reduce((sum, s) => sum + s.score, 0) / leadScores.length) || 0;

  return (
    <div className="space-y-6">
      {/* Scoring Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{highPriorityCount}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{leadScores.length}</p>
                <p className="text-sm text-muted-foreground">Scored Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{leadScores.filter(s => s.recommendation === 'nurture').length}</p>
                <p className="text-sm text-muted-foreground">To Nurture</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scored Leads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Lead Scoring Results</h3>
          <Badge variant="outline">Sorted by Score</Badge>
        </div>

        {sortedLeads.map(({ lead, score, factors, recommendation, nextAction }) => (
          <Card key={lead.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{lead.name}</span>
                    <Badge variant="outline">{lead.company}</Badge>
                    <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {lead.email} • ${lead.estimatedValue.toLocaleString()} potential value
                  </CardDescription>
                </div>
                <Badge className={`${getRecommendationColor(recommendation)} text-white`}>
                  {recommendation.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score Breakdown */}
              <div className="grid md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium">Company Size</p>
                  <Progress value={factors.companySize * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(factors.companySize * 100)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Budget</p>
                  <Progress value={factors.budget * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(factors.budget * 100)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Timeline</p>
                  <Progress value={factors.timeline * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(factors.timeline * 100)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Engagement</p>
                  <Progress value={factors.engagement * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(factors.engagement * 100)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Authority</p>
                  <Progress value={factors.authority * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(factors.authority * 100)}</p>
                </div>
              </div>

              {/* Next Action */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Recommended Action:</p>
                <p className="text-sm text-muted-foreground">{nextAction}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => onScheduleMeeting(lead)}
                  className="flex items-center space-x-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Meeting</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onNurtureLead(lead)}
                  className="flex items-center space-x-1"
                >
                  <Mail className="h-4 w-4" />
                  <span>Add to Nurture</span>
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedLeads.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Leads to Score</h3>
              <p className="text-muted-foreground">
                Add some leads to see AI-powered scoring and recommendations
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientScoringDashboard;
