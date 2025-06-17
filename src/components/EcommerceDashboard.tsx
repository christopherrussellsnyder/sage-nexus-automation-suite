
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingUp, 
  BarChart3,
  RefreshCw,
  Star,
  DollarSign,
  ShoppingBag,
  Target,
  Megaphone
} from "lucide-react";
import ProductResearchTable from './ecommerce/ProductResearchTable';
import EnhancedMarketingWizard from './shared/EnhancedMarketingWizard';
import MarketingSolutionResults from './shared/MarketingSolutionResults';

const EcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'marketing'>('research');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [marketingSolution, setMarketingSolution] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleViewProduct = (product: any) => {
    console.log('View product:', product);
  };

  const handleResearchProduct = (product: any) => {
    console.log('Research product:', product);
  };

  const handleCreateSolution = async (data: any) => {
    setIsCreatingCampaign(true);
    setCampaignProgress(0);

    // Simulate progress for the marketing solution generation
    const steps = [
      { message: 'Scraping competitor websites and ad libraries', duration: 3000 },
      { message: 'Analyzing top performing ads and organic content', duration: 4000 },
      { message: 'Generating personalized 30-day marketing plan', duration: 4000 },
      { message: 'Creating optimization recommendations', duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setCampaignProgress((i + 1) * 25);
    }

    setIsCreatingCampaign(false);
    setMarketingSolution(data);
    setShowResults(true);
    console.log('Complete marketing solution created:', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">E-commerce Suite</h2>
          <p className="text-muted-foreground">AI-powered product research and marketing intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('research')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Product Research</span>
          </Button>
          <Button
            variant={activeTab === 'marketing' ? 'default' : 'outline'}
            onClick={() => setActiveTab('marketing')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Marketing Intelligence</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Data</span>
          </Button>
        </div>
      </div>

      {/* Product Research Tab */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* Product Research Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Weekly Product Research</h3>
              <p className="text-muted-foreground">Top 30 trending products updated weekly from 1000+ Shopify stores</p>
            </div>
          </div>

          {/* Research Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">30</p>
                    <p className="text-sm text-muted-foreground">Products Found</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">+156%</p>
                    <p className="text-sm text-muted-foreground">Avg Growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">4.7</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">10.2%</p>
                    <p className="text-sm text-muted-foreground">Avg Conversion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Research Table */}
          <ProductResearchTable 
            products={[]}
            onViewProduct={handleViewProduct}
            onResearchProduct={handleResearchProduct}
          />
        </div>
      )}

      {/* Marketing Intelligence Tab */}
      {activeTab === 'marketing' && (
        <div className="space-y-6">
          {!showResults && (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">10+</p>
                        <p className="text-sm text-muted-foreground">Competitors Analyzed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">100+</p>
                        <p className="text-sm text-muted-foreground">Ad Libraries Scraped</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">30</p>
                        <p className="text-sm text-muted-foreground">Day Plan Generated</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">4.2x</p>
                        <p className="text-sm text-muted-foreground">Avg ROAS</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <EnhancedMarketingWizard 
                onCreateSolution={handleCreateSolution}
                isCreating={isCreatingCampaign}
                progress={campaignProgress}
              />
            </>
          )}

          {showResults && marketingSolution && (
            <MarketingSolutionResults 
              data={marketingSolution}
              onClose={() => setShowResults(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EcommerceDashboard;
