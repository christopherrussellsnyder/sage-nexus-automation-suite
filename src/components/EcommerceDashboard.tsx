import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  Palette, 
  Layout,
  Eye,
  Download,
  Star,
  DollarSign,
  BarChart3,
  RefreshCw
} from "lucide-react";

const EcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'research'>('builder');
  const [websiteData, setWebsiteData] = useState({
    businessType: '',
    businessName: '',
    industry: '',
    targetAudience: '',
    description: ''
  });

  const trendingProducts = [
    {
      id: 1,
      name: "Smart Wireless Earbuds Pro",
      price: "$89.99",
      trend: "+245%",
      stores: "12 stores",
      category: "Electronics",
      rating: 4.8,
      conversionRate: "12.4%"
    },
    {
      id: 2,
      name: "Eco-Friendly Water Bottle",
      price: "$24.99",
      trend: "+189%",
      stores: "8 stores",
      category: "Lifestyle",
      rating: 4.6,
      conversionRate: "9.8%"
    },
    {
      id: 3,
      name: "LED Strip Lights RGB",
      price: "$34.99",
      trend: "+156%",
      stores: "15 stores",
      category: "Home Decor",
      rating: 4.7,
      conversionRate: "11.2%"
    },
    {
      id: 4,
      name: "Portable Phone Charger",
      price: "$19.99",
      trend: "+134%",
      stores: "20 stores",
      category: "Electronics",
      rating: 4.5,
      conversionRate: "8.9%"
    },
    {
      id: 5,
      name: "Yoga Mat Premium",
      price: "$39.99",
      trend: "+128%",
      stores: "6 stores",
      category: "Fitness",
      rating: 4.9,
      conversionRate: "10.6%"
    }
  ];

  const websiteTemplates = [
    {
      id: 1,
      name: "Modern E-commerce",
      category: "Retail",
      features: ["Product Catalog", "Shopping Cart", "Payment Integration", "User Reviews"],
      preview: "Clean, modern design with focus on product showcase"
    },
    {
      id: 2,
      name: "Agency Portfolio",
      category: "Services",
      features: ["Portfolio Gallery", "Contact Forms", "Team Showcase", "Case Studies"],
      preview: "Professional layout highlighting services and testimonials"
    },
    {
      id: 3,
      name: "Startup Landing",
      category: "Technology",
      features: ["Hero Section", "Feature Highlights", "Pricing Tables", "Newsletter"],
      preview: "Conversion-focused design for startup launches"
    }
  ];

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
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Website Generator</span>
                </CardTitle>
                <CardDescription>Tell us about your business and we'll create a custom website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={websiteData.businessName}
                    onChange={(e) => setWebsiteData({...websiteData, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    placeholder="E-commerce, Agency, SaaS, etc."
                    value={websiteData.businessType}
                    onChange={(e) => setWebsiteData({...websiteData, businessType: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="Fashion, Tech, Health, etc."
                    value={websiteData.industry}
                    onChange={(e) => setWebsiteData({...websiteData, industry: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="Young professionals, families, etc."
                    value={websiteData.targetAudience}
                    onChange={(e) => setWebsiteData({...websiteData, targetAudience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Input
                    id="description"
                    placeholder="What does your business do?"
                    value={websiteData.description}
                    onChange={(e) => setWebsiteData({...websiteData, description: e.target.value})}
                  />
                </div>
                <Button className="w-full" size="lg">
                  <Layout className="h-4 w-4 mr-2" />
                  Generate Website
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Website Templates */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Website Templates</span>
                </CardTitle>
                <CardDescription>Pre-built templates customized by AI based on your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {websiteTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <CardDescription className="text-sm">{template.preview}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          {template.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-1 text-xs">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generation Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Website Generation Progress</CardTitle>
                <CardDescription>AI is analyzing your business and creating your custom website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing Business Requirements</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating Page Structure</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Creating Content & Copy</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Optimizing Design</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Product Research Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Weekly Product Research</h3>
              <p className="text-muted-foreground">Top 30 trending products updated weekly from Shopify stores</p>
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

          {/* Trending Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Trending Products This Week</span>
              </CardTitle>
              <CardDescription>High-converting products from 30+ different Shopify stores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        <Badge variant="secondary" className="text-green-600">
                          {product.trend}
                        </Badge>
                      </div>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stores:</span>
                          <span>{product.stores}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversion:</span>
                          <span className="text-green-600 font-medium">{product.conversionRate}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Research
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EcommerceDashboard;
