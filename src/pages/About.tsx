
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Globe,
  ShoppingCart,
  Megaphone,
  Phone,
  PenTool,
  CheckCircle,
  Star
} from "lucide-react";

const About = () => {
  const platformFeatures = [
    {
      icon: ShoppingCart,
      title: "E-commerce Automation",
      description: "AI-powered website builder with custom templates, product research engine tracking 1000+ Shopify stores weekly, and automated store optimization."
    },
    {
      icon: Megaphone,
      title: "Marketing Agency Tools",
      description: "Multi-platform campaign orchestration, intelligent lead scoring, social media content factory, and automated client reporting across all major platforms."
    },
    {
      icon: Phone,
      title: "Sales Operations",
      description: "Intelligent prospect research engine, automated sales sequences, meeting intelligence with call analysis, and BANT qualification scoring."
    },
    {
      icon: PenTool,
      title: "AI Copywriting Suite",
      description: "High-converting copy generation for websites, ads, emails, and social media with industry-specific optimization and brand voice training."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Businesses Automated", icon: Users },
    { number: "$2M+", label: "Revenue Generated", icon: TrendingUp },
    { number: "400%", label: "Average ROI", icon: Target },
    { number: "40+", label: "Hours Saved Weekly", icon: Clock }
  ];

  const values = [
    {
      title: "AI-First Approach",
      description: "Every feature is powered by advanced AI that learns from top-performing content across all industries to deliver personalized results.",
      icon: Brain
    },
    {
      title: "All-in-One Platform",
      description: "No need for multiple tools. Everything you need to automate your business operations is integrated into one seamless platform.",
      icon: Zap
    },
    {
      title: "Industry Expertise",
      description: "Our AI analyzes data from thousands of successful businesses across all industries to provide proven strategies and templates.",
      icon: Target
    },
    {
      title: "Continuous Innovation",
      description: "We constantly update our AI models and add new features based on the latest market trends and customer feedback.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="h-16 w-16 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Sage.ai
            </h1>
          </div>
          <h2 className="text-4xl font-bold">Revolutionizing Business Automation</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Sage.ai is the world's first all-in-one AI business automation platform that combines e-commerce, 
            marketing, sales, and copywriting automation into one powerful system. We analyze top-performing 
            content across all industries to generate personalized, high-converting templates and strategies 
            for your specific business needs.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise Security
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Global Reach
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Proven Results
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Four Powerful Automation Hubs</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="text-lg text-muted-foreground space-y-6">
              <p>
                Sage.ai was born from a simple observation: businesses were using dozens of different tools 
                to manage their operations, leading to inefficiency, data silos, and missed opportunities. 
                Our founders, experienced entrepreneurs who had built and scaled multiple companies, knew 
                there had to be a better way.
              </p>
              <p>
                After analyzing thousands of successful businesses across all industries, we discovered 
                patterns in what made some companies dramatically more successful than others. The key wasn't 
                just having good tools—it was having intelligent systems that could learn from the best 
                performers and automatically apply those insights to your specific business.
              </p>
              <p>
                That's when we decided to build Sage.ai: an AI-powered platform that doesn't just automate 
                tasks, but actually makes your business smarter. By continuously analyzing top-performing 
                content, campaigns, and strategies across all industries, Sage.ai ensures that every piece 
                of content, every campaign, and every sales sequence is optimized for maximum results.
              </p>
              <p>
                Today, Sage.ai powers over 10,000 businesses worldwide, from solo entrepreneurs to large 
                enterprises, helping them save time, increase revenue, and scale more efficiently than 
                ever before.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">What Drives Us</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <value.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Advanced AI Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground space-y-6">
              <p>
                Sage.ai is built on cutting-edge artificial intelligence that goes far beyond simple 
                automation. Our proprietary AI models analyze millions of data points from top-performing 
                businesses across all industries to understand what makes content, campaigns, and 
                strategies successful.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Machine Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Continuously learns from successful patterns across industries
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Predictive Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Predicts performance and optimizes strategies in real-time
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Automation Engine</h4>
                  <p className="text-sm text-muted-foreground">
                    Executes complex workflows without human intervention
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Trust */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Security & Trust</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground space-y-4">
              <p>
                Your business data is precious, and we treat it that way. Sage.ai employs enterprise-grade 
                security measures including end-to-end encryption, SOC 2 compliance, and regular security 
                audits to ensure your information is always protected.
              </p>
              <div className="flex items-center justify-center space-x-8 pt-6">
                <Badge variant="outline" className="px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  256-bit Encryption
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  99.9% Uptime
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
