
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Users, 
  Phone, 
  PenTool,
  Globe,
  Search,
  Megaphone,
  TrendingUp,
  MessageSquare,
  UserCheck,
  PhoneCall,
  Brain,
  ArrowRight,
  Zap,
  Target,
  Rocket,
  Crown,
  BarChart3,
  Clock,
  DollarSign,
  Mail,
  Video,
  Palette,
  Layout,
  Smartphone,
  Star,
  CheckCircle,
  Settings,
  Database,
  Shield,
  Lightbulb
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      title: "E-commerce Automation Hub",
      description: "Complete e-commerce automation suite with AI-powered website builder and product research",
      icon: ShoppingCart,
      color: "bg-blue-500",
      features: [
        {
          name: "AI Website Builder",
          description: "Create professional e-commerce websites in minutes with AI-generated content and layouts",
          details: [
            "Industry-specific templates",
            "AI-generated product descriptions",
            "SEO optimization built-in",
            "Mobile-responsive designs",
            "One-click deployment"
          ]
        },
        {
          name: "Product Research Engine",
          description: "Weekly analysis of 1000+ Shopify stores to identify trending products",
          details: [
            "Real-time trending analysis",
            "Conversion rate predictions",
            "Competitor pricing data",
            "Market demand insights",
            "Supplier recommendations"
          ]
        },
        {
          name: "Store Optimization",
          description: "Automated A/B testing and conversion optimization for your online store",
          details: [
            "Automated A/B testing",
            "Conversion funnel analysis",
            "Product page optimization",
            "Checkout flow improvements",
            "Performance tracking"
          ]
        }
      ]
    },
    {
      title: "Marketing Agency Hub",
      description: "Multi-platform campaign management and lead generation automation",
      icon: Megaphone,
      color: "bg-green-500",
      features: [
        {
          name: "Campaign Orchestration",
          description: "Manage campaigns across Google Ads, Facebook, LinkedIn, TikTok, and Twitter",
          details: [
            "Multi-platform deployment",
            "Automated bid optimization",
            "Real-time performance tracking",
            "Budget reallocation",
            "Cross-platform analytics"
          ]
        },
        {
          name: "Lead Scoring & Nurturing",
          description: "AI-powered lead qualification and automated nurturing sequences",
          details: [
            "BANT qualification scoring",
            "Behavioral trigger automation",
            "Multi-channel nurturing",
            "Lead progression tracking",
            "Conversion optimization"
          ]
        },
        {
          name: "Social Media Factory",
          description: "Automated content creation and scheduling for all social platforms",
          details: [
            "AI content generation",
            "Optimal timing analysis",
            "Brand voice consistency",
            "Hashtag optimization",
            "Engagement tracking"
          ]
        },
        {
          name: "Client Reporting",
          description: "Automated report generation with insights and recommendations",
          details: [
            "Custom branded reports",
            "ROI calculations",
            "Performance insights",
            "Recommendation engine",
            "White-label options"
          ]
        }
      ]
    },
    {
      title: "Sales Operations Hub",
      description: "Intelligent prospect research and automated sales sequence management",
      icon: Phone,
      color: "bg-red-500",
      features: [
        {
          name: "Prospect Research Engine",
          description: "AI-powered research and qualification of potential customers",
          details: [
            "LinkedIn profile analysis",
            "Company data enrichment",
            "Pain point identification",
            "Buying signal detection",
            "Contact information discovery"
          ]
        },
        {
          name: "Sales Sequence Builder",
          description: "Multi-channel automated sales sequences with personalization",
          details: [
            "Email sequence automation",
            "LinkedIn outreach",
            "Phone call scheduling",
            "Video message creation",
            "Follow-up automation"
          ]
        },
        {
          name: "Meeting Intelligence",
          description: "AI-powered call analysis and CRM integration",
          details: [
            "Call transcription & analysis",
            "Sentiment tracking",
            "Objection identification",
            "Next step recommendations",
            "CRM auto-updates"
          ]
        },
        {
          name: "Pipeline Management",
          description: "Automated deal progression and forecasting",
          details: [
            "Deal stage automation",
            "Revenue forecasting",
            "Win/loss analysis",
            "Activity tracking",
            "Performance metrics"
          ]
        }
      ]
    },
    {
      title: "AI Copywriting Suite",
      description: "High-converting copy generation for all marketing channels",
      icon: PenTool,
      color: "bg-purple-500",
      features: [
        {
          name: "Website Copy Generation",
          description: "Complete website copy with section-by-section optimization",
          details: [
            "Hero section optimization",
            "Product descriptions",
            "About page content",
            "FAQ generation",
            "Call-to-action optimization"
          ]
        },
        {
          name: "Ad Copy Creation",
          description: "Platform-specific ad copy for maximum conversion rates",
          details: [
            "Google Ads copy",
            "Facebook ad variations",
            "LinkedIn sponsored content",
            "TikTok ad scripts",
            "YouTube ad copy"
          ]
        },
        {
          name: "Email Sequences",
          description: "7 different email types optimized for engagement",
          details: [
            "Welcome sequences",
            "Nurture campaigns",
            "Sales sequences",
            "Re-engagement emails",
            "Newsletter content"
          ]
        },
        {
          name: "Social Content",
          description: "Viral-worthy social media content with captions",
          details: [
            "Platform-specific content",
            "Trending hashtags",
            "Engagement optimization",
            "Story templates",
            "Video scripts"
          ]
        }
      ]
    }
  ];

  const aiCapabilities = [
    {
      title: "Industry Analysis",
      description: "Analyzes top-performing content across all industries",
      icon: BarChart3
    },
    {
      title: "Personalization Engine",
      description: "Customizes content based on your specific business data",
      icon: Target
    },
    {
      title: "Performance Optimization",
      description: "Continuously optimizes based on real-time performance data",
      icon: TrendingUp
    },
    {
      title: "Multi-Channel Integration",
      description: "Seamlessly works across all marketing and sales channels",
      icon: Globe
    }
  ];

  const integrations = [
    {
      category: "CRM Systems",
      tools: ["Salesforce", "HubSpot", "Pipedrive", "Monday.com", "Airtable"]
    },
    {
      category: "Marketing Platforms",
      tools: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "TikTok Ads", "Twitter Ads"]
    },
    {
      category: "E-commerce",
      tools: ["Shopify", "WooCommerce", "BigCommerce", "Magento", "Squarespace"]
    },
    {
      category: "Email Marketing",
      tools: ["Mailchimp", "Klaviyo", "ConvertKit", "ActiveCampaign", "SendGrid"]
    },
    {
      category: "Analytics",
      tools: ["Google Analytics", "Facebook Pixel", "LinkedIn Insight", "Hotjar", "Mixpanel"]
    },
    {
      category: "Communication",
      tools: ["Slack", "Microsoft Teams", "Zoom", "Calendly", "Loom"]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl font-bold">Comprehensive AI Business Automation Features</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Discover all the powerful features that make Sage.ai the ultimate all-in-one business automation platform. 
            Every tool is powered by advanced AI that learns from top-performing content across all industries.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Fully Automated
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Results-Driven
            </Badge>
          </div>
        </div>

        {/* Main Features */}
        <div className="space-y-16">
          {mainFeatures.map((hub, hubIndex) => (
            <div key={hubIndex} className="space-y-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg ${hub.color} text-white`}>
                    <hub.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold">{hub.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{hub.description}</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {hub.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{feature.name}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Capabilities */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced AI Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every feature in Sage.ai is powered by cutting-edge artificial intelligence that continuously 
              learns and improves to deliver better results for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((capability, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <capability.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Native Integrations</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sage.ai seamlessly integrates with all the tools you already use, ensuring a smooth 
              workflow and maximum efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{integration.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {integration.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security & Performance */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Enterprise Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">SOC 2 Type II Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">256-bit AES Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">GDPR & CCPA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Regular Security Audits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Two-Factor Authentication</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span>Performance & Reliability</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">99.9% Uptime Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Global CDN Infrastructure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Real-time Data Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Automated Backups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">24/7 System Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses that have automated their operations and increased revenue with Sage.ai. 
              Start your free trial today and experience the power of AI-driven business automation.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                <Crown className="h-4 w-4 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features;
