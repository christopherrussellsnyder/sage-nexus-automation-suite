
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useTemplateManager } from "@/hooks/useTemplateManager";
import UsageTracker from "./UsageTracker";
import { 
  Globe, 
  Megaphone, 
  Mail, 
  Share2,
  Crown,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Target
} from "lucide-react";

const FeatureDashboard = () => {
  const navigate = useNavigate();
  const { usage, subscription, getRemainingUsage } = useUsageTracking();
  const { templates, getFavoriteTemplates } = useTemplateManager();

  const isPremium = subscription?.subscription_type === 'premium';

  const features = [
    {
      title: 'Website Copy',
      description: 'Generate high-converting website copy with section-by-section breakdowns',
      icon: Globe,
      color: 'bg-blue-500',
      path: '/website-copy',
      remaining: getRemainingUsage('website'),
      used: usage.website
    },
    {
      title: 'Ad Copy',
      description: 'Create compelling ad copy for all major social media platforms',
      icon: Megaphone,
      color: 'bg-green-500',
      path: '/ad-copy',
      remaining: getRemainingUsage('advertising'),
      used: usage.advertising
    },
    {
      title: 'Email Sequences',
      description: '7 different email types optimized for maximum engagement',
      icon: Mail,
      color: 'bg-purple-500',
      path: '/email-sequences',
      remaining: getRemainingUsage('email'),
      used: usage.email
    },
    {
      title: 'Social Content',
      description: 'Viral-worthy social media content with complete captions',
      icon: Share2,
      color: 'bg-orange-500',
      path: '/social-content',
      remaining: getRemainingUsage('social'),
      used: usage.social
    }
  ];

  const stats = [
    {
      title: 'Time Saved',
      value: '40+ hrs/week',
      description: 'Average time saved per business',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'ROI Generated',
      value: '400%',
      description: 'Average return on investment',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Businesses Served',
      value: '10,000+',
      description: 'Successful businesses using Sage.ai',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue Impact',
      value: '$2M+',
      description: 'Additional revenue generated',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  const favoriteTemplates = getFavoriteTemplates();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Your Copy Generation Suite</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transform your business with AI-powered copy that analyzes top-performing content across all industries 
          to create personalized, high-converting templates for your specific needs.
        </p>
        {!isPremium && (
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Free trial: 5 generations per feature • Upgrade for unlimited access</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Features */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Copy Generation Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      {!isPremium && (
                        <Badge variant={feature.remaining > 0 ? "secondary" : "destructive"}>
                          {feature.remaining}/{5} left
                        </Badge>
                      )}
                      {isPremium && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Crown className="h-3 w-3 mr-1" />
                          Unlimited
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {!isPremium && (
                        <div className="text-sm text-muted-foreground">
                          Used {feature.used} of 5 free generations
                        </div>
                      )}
                      <Button 
                        className="w-full group"
                        onClick={() => navigate(feature.path)}
                        disabled={!isPremium && feature.remaining === 0}
                      >
                        {!isPremium && feature.remaining === 0 ? (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade to Continue
                          </>
                        ) : (
                          <>
                            Start Creating
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Sage.ai?</CardTitle>
              <CardDescription>
                Advanced AI technology that analyzes the best-performing content across all industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Industry Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes top-performing content across all industries to understand what works
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Personalized Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Every template is customized using your specific business details and target audience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Multiple Approaches</h4>
                      <p className="text-sm text-muted-foreground">
                        Get 5 completely different templates using various psychology triggers and strategies
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Implementation Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Each template includes specific recommendations on how and where to implement the content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Save & Customize</h4>
                      <p className="text-sm text-muted-foreground">
                        Save your favorite templates and customize them as your business evolves
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-teal-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Proven Results</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on analysis of thousands of high-converting campaigns and websites
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <UsageTracker />
          
          {favoriteTemplates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Favorite Templates</span>
                </CardTitle>
                <CardDescription>Quick access to your saved templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favoriteTemplates.slice(0, 3).map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-2 rounded border">
                      <div>
                        <p className="text-sm font-medium">{template.template_name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{template.feature_type}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                {favoriteTemplates.length > 3 && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Templates
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {!isPremium && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-800">
                  <Crown className="h-5 w-5" />
                  <span>Upgrade to Premium</span>
                </CardTitle>
                <CardDescription className="text-yellow-700">
                  Unlock unlimited generations and advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                      <span>Unlimited template generations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                      <span>Advanced customization options</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                      <span>Export to multiple formats</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => navigate('/pricing')}>
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now - $30/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureDashboard;
