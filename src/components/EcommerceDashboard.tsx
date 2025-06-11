
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  BarChart3,
  RefreshCw,
  Star,
  DollarSign
} from "lucide-react";
import WebsiteBuilderForm from './ecommerce/WebsiteBuilderForm';
import WebsiteTemplates from './ecommerce/WebsiteTemplates';
import ProductResearchTable from './ecommerce/ProductResearchTable';

interface WebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
}

const EcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'research'>('builder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [templatesGenerated, setTemplatesGenerated] = useState(false);

  const handleWebsiteGeneration = async (data: WebsiteData) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setWebsiteData(data);

    // Simulate website generation process
    const steps = [
      { message: 'Analyzing business requirements', duration: 1500 },
      { message: 'Generating personalized templates', duration: 2000 },
      { message: 'Creating page structure', duration: 1500 },
      { message: 'Optimizing design and content', duration: 1000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setGenerationProgress((i + 1) * 25);
    }

    setIsGenerating(false);
    setTemplatesGenerated(true);
    console.log('Website generated with data:', data);
  };

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
  };

  const handleTemplatePreview = (template: any) => {
    console.log('Preview template:', template);
  };

  const handleViewProduct = (product: any) => {
    console.log('View product:', product);
  };

  const handleResearchProduct = (product: any) => {
    console.log('Research product:', product);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">E-commerce Suite</h2>
          <p className="text-muted-foreground">AI-powered website building and product research</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'builder' ? 'default' : 'outline'}
            onClick={() => setActiveTab('builder')}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Website Builder</span>
          </Button>
          <Button
            variant={activeTab === 'research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('research')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Product Research</span>
          </Button>
        </div>
      </div>

      {activeTab === 'builder' ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Website Builder Form */}
          <div className="lg:col-span-1">
            <WebsiteBuilderForm 
              onGenerate={handleWebsiteGeneration}
              isGenerating={isGenerating}
              progress={generationProgress}
            />
          </div>

          {/* Website Templates */}
          <div className="lg:col-span-2 space-y-4">
            <WebsiteTemplates 
              templates={[]}
              onSelectTemplate={handleTemplateSelect}
              onPreviewTemplate={handleTemplatePreview}
              websiteData={websiteData}
              isGenerated={templatesGenerated}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Product Research Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Weekly Product Research</h3>
              <p className="text-muted-foreground">Top 30 trending products updated weekly from 1000+ Shopify stores</p>
            </div>
            <Button className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
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
    </div>
  );
};

export default EcommerceDashboard;
