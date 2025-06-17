import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  Target, 
  BarChart3,
  RefreshCw,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  Megaphone,
  Mail
} from "lucide-react";
import EnhancedMarketingWizard from './shared/EnhancedMarketingWizard';
import MarketingSolutionResults from './shared/MarketingSolutionResults';

const CopywritingDashboard = () => {
  const [activeTab, setActiveTab] = useState<'ads' | 'emails' | 'content' | 'intelligence'>('intelligence');
  const [isCreatingCopy, setIsCreatingCopy] = useState(false);
  const [copyProgress, setCopyProgress] = useState(0);
  const [marketingSolution, setMarketingSolution] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCreateSolution = async (data: any) => {
    setIsCreatingCopy(true);
    setCopyProgress(0);

    // Simulate progress for copywriting solution generation
    const steps = [
      { message: 'Analyzing competitor copy and messaging', duration: 3000 },
      { message: 'Generating high-converting copy variations', duration: 4000 },
      { message: 'Creating personalized messaging strategy', duration: 4000 },
      { message: 'Optimizing for conversion psychology', duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setCopyProgress((i + 1) * 25);
    }

    setIsCreatingCopy(false);
    setMarketingSolution(data);
    setShowResults(true);
    console.log('Complete copywriting solution created:', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Copywriting Suite</h2>
          <p className="text-muted-foreground">High-converting copy powered by competitor intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'ads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ads')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Ad Copy</span>
          </Button>
          <Button
            variant={activeTab === 'emails' ? 'default' : 'outline'}
            onClick={() => setActiveTab('emails')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Emails</span>
          </Button>
          <Button
            variant={activeTab === 'content' ? 'default' : 'outline'}
            onClick={() => setActiveTab('content')}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Content</span>
          </Button>
          <Button
            variant={activeTab === 'intelligence' ? 'default' : 'outline'}
            onClick={() => setActiveTab('intelligence')}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Intelligence</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          {!showResults && (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">50+</p>
                        <p className="text-sm text-muted-foreground">Copy Variations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">200+</p>
                        <p className="text-sm text-muted-foreground">Competitor Ads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">15+</p>
                        <p className="text-sm text-muted-foreground">Psychology Triggers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">3.2x</p>
                        <p className="text-sm text-muted-foreground">Avg Conversion Lift</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <EnhancedMarketingWizard
                onCreateSolution={handleCreateSolution}
                isCreating={isCreatingCopy}
                progress={copyProgress}
              />
            </>
          )}

          {showResults && marketingSolution && (
            <MarketingSolutionResults
              data={marketingSolution}
              onClose={() => {
                setShowResults(false);
                setMarketingSolution(null);
              }}
            />
          )}
        </div>
      )}

      {/* Other Tabs - Placeholder Content */}
      {activeTab !== 'intelligence' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5" />
                <span>{activeTab === 'ads' ? 'Ad Copy Generator' : activeTab === 'emails' ? 'Email Copy Generator' : 'Content Generator'}</span>
              </CardTitle>
              <CardDescription>
                {activeTab === 'ads' && 'Generate high-converting ad copy for all platforms'}
                {activeTab === 'emails' && 'Create engaging email sequences that convert'}
                {activeTab === 'content' && 'Generate blog posts, social media content, and more'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'ads' && 'Advanced ad copy generation with A/B testing recommendations'}
                  {activeTab === 'emails' && 'Email sequence automation with personalization'}
                  {activeTab === 'content' && 'SEO-optimized content creation and planning'}
                </p>
                <Button variant="outline">
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CopywritingDashboard;
