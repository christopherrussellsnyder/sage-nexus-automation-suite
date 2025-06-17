
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  UserCheck, 
  Building, 
  TrendingUp, 
  Mail, 
  Phone, 
  LinkedinIcon as Linkedin,
  Eye,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Prospect {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  score: number;
  qualification: 'hot' | 'warm' | 'cold';
  insights: string[];
  companySize: string;
  revenue: string;
  lastActivity: string;
}

const ProspectResearch = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const { toast } = useToast();

  const sampleProspects: Prospect[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      jobTitle: 'VP of Marketing',
      company: 'TechCorp Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      linkedinUrl: 'linkedin.com/in/sarahjohnson',
      score: 92,
      qualification: 'hot',
      insights: [
        'Recently posted about scaling marketing teams',
        'Company raised $50M Series B last month',
        'Looking for marketing automation solutions',
        'Previously worked at fast-growing startups'
      ],
      companySize: '200-500 employees',
      revenue: '$50M - $100M',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      jobTitle: 'Director of Sales',
      company: 'Growth Dynamics',
      industry: 'Consulting',
      location: 'New York, NY',
      email: 'michael.chen@growthdynamics.com',
      phone: '+1 (555) 987-6543',
      linkedinUrl: 'linkedin.com/in/michaelchen',
      score: 78,
      qualification: 'warm',
      insights: [
        'Active in sales leadership discussions',
        'Company expanding to new markets',
        'Mentioned challenges with sales processes',
        'Engaged with sales automation content'
      ],
      companySize: '50-200 employees',
      revenue: '$10M - $50M',
      lastActivity: '1 day ago'
    }
  ];

  const performSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a company name or person to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate AI prospect research
    setTimeout(() => {
      setProspects(sampleProspects);
      setIsSearching(false);
      toast({
        title: "Research Complete",
        description: `Found ${sampleProspects.length} qualified prospects`,
      });
    }, 3000);
  };

  const getQualificationColor = (qualification: string) => {
    switch (qualification) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-yellow-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>AI Prospect Research</span>
          </CardTitle>
          <CardDescription>
            Automatically research and qualify prospects using AI-powered data mining
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Company or Person Name</Label>
              <Input
                id="search"
                placeholder="e.g., TechCorp Solutions or John Smith"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={performSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Search className="h-4 w-4 mr-2 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Research Prospects
                  </>
                )}
              </Button>
            </div>
          </div>

          {prospects.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prospect</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prospects.map((prospect) => (
                    <TableRow key={prospect.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(prospect.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{prospect.name}</div>
                            <div className="text-sm text-muted-foreground">{prospect.jobTitle}</div>
                            <div className="text-xs text-muted-foreground">{prospect.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{prospect.company}</div>
                          <div className="text-sm text-muted-foreground">{prospect.industry}</div>
                          <div className="text-xs text-muted-foreground">{prospect.companySize}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${getScoreColor(prospect.score)}`}>
                            {prospect.score}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(prospect.score / 20) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getQualificationColor(prospect.qualification)}`} />
                          <span className="capitalize font-medium">{prospect.qualification}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{prospect.lastActivity}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedProspect(prospect)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{prospect.name} - Research Insights</DialogTitle>
                                <DialogDescription>
                                  Comprehensive AI-generated prospect analysis
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Contact Information</h4>
                                    <div className="space-y-1 text-sm">
                                      <div>📧 {prospect.email}</div>
                                      <div>📞 {prospect.phone}</div>
                                      <div>🔗 {prospect.linkedinUrl}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Company Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <div>Size: {prospect.companySize}</div>
                                      <div>Revenue: {prospect.revenue}</div>
                                      <div>Industry: {prospect.industry}</div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">AI Insights & Talking Points</h4>
                                  <div className="space-y-2">
                                    {prospect.insights.map((insight, index) => (
                                      <div key={index} className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-sm">{insight}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Linkedin className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {prospects.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Your Prospect Research</h3>
              <p className="text-muted-foreground">
                Enter a company name or person to begin AI-powered prospect research
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectResearch;
