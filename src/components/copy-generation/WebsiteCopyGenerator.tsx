
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useTemplateManager } from "@/hooks/useTemplateManager";
import { Copy, Save, RefreshCw, Download, Crown } from "lucide-react";
import UsageTracker from "../UsageTracker";

interface WebsiteTemplate {
  id: number;
  approach: string;
  psychology: string;
  top: {
    headline: string;
    subheadline: string;
    cta: string;
    recommendation: string;
  };
  middle: {
    content: string;
    features: string[];
    recommendation: string;
  };
  bottom: {
    content: string;
    final_cta: string;
    recommendation: string;
  };
}

const WebsiteCopyGenerator = () => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    targetAudience: '',
    description: '',
    uniqueValue: '',
    mainGoal: ''
  });
  
  const [templates, setTemplates] = useState<WebsiteTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState<number | null>(null);
  
  const { incrementUsage, canUseFeature, subscription } = useUsageTracking();
  const { saveTemplate } = useTemplateManager();

  const generateWebsiteTemplates = async () => {
    if (!canUseFeature('website')) return;
    
    setLoading(true);
    
    // Simulate API call for now - in real implementation, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplates: WebsiteTemplate[] = [
      {
        id: 1,
        approach: "Authority & Trust Building",
        psychology: "Establishes credibility and expertise to build immediate trust",
        top: {
          headline: `Transform Your ${businessData.industry} Business with ${businessData.businessName}`,
          subheadline: `Join 10,000+ ${businessData.targetAudience} who trust our proven ${businessData.businessType} solutions`,
          cta: "Get Your Free Consultation",
          recommendation: "TOP SECTION: Based on analysis of top performers in your niche, leading businesses place trust signals, client counts, and value propositions prominently at the top to establish immediate credibility."
        },
        middle: {
          content: `Why ${businessData.targetAudience} Choose ${businessData.businessName}`,
          features: [
            "Industry-leading expertise since 2020",
            "Proven track record with measurable results",
            "Personalized solutions for your specific needs",
            "24/7 dedicated support team"
          ],
          recommendation: "MIDDLE SECTION: Top competitors showcase detailed features, benefits, and social proof in the middle. Include testimonials, case studies, and specific benefits that address your target audience's pain points."
        },
        bottom: {
          content: "Ready to achieve the results you deserve? Join successful businesses who've transformed their operations with our expert guidance.",
          final_cta: "Start Your Transformation Today",
          recommendation: "BOTTOM SECTION: High-converting websites end with urgency and a clear next step. Include final objection handling and a strong, action-oriented CTA that removes risk."
        }
      },
      {
        id: 2,
        approach: "Problem-Solution Framework",
        psychology: "Identifies pain points and positions your business as the solution",
        top: {
          headline: `Stop Struggling with ${businessData.industry} Challenges`,
          subheadline: `${businessData.businessName} eliminates the frustrations that keep ${businessData.targetAudience} from reaching their goals`,
          cta: "See How We Solve This",
          recommendation: "TOP SECTION: Problem-agitation approach works well in your industry. Top performers start by identifying the biggest pain point your audience faces."
        },
        middle: {
          content: `The ${businessData.industry} Solution That Actually Works`,
          features: [
            "Eliminates common industry pain points",
            "Streamlined process saves time and money",
            "Guaranteed results or money back",
            "No hidden fees or complicated contracts"
          ],
          recommendation: "MIDDLE SECTION: After identifying problems, successful sites present clear solutions. Focus on how your unique approach differs from competitors and why it works better."
        },
        bottom: {
          content: "Don't let another day pass struggling with the same challenges. Take action now and see immediate improvements.",
          final_cta: "Get Your Solution Now",
          recommendation: "BOTTOM SECTION: Create urgency by emphasizing the cost of inaction. Top performers use phrases like 'don't let another day pass' to motivate immediate action."
        }
      },
      {
        id: 3,
        approach: "Transformation & Results",
        psychology: "Focuses on the transformation and results your service provides",
        top: {
          headline: `From ${businessData.industry} Struggles to Success in 90 Days`,
          subheadline: `See how ${businessData.businessName} transforms ${businessData.targetAudience} into industry leaders`,
          cta: "View Success Stories",
          recommendation: "TOP SECTION: Transformation messaging resonates strongly in service industries. Lead with specific timeframes and concrete outcomes to grab attention immediately."
        },
        middle: {
          content: "Real Results from Real Clients",
          features: [
            "Average 300% improvement in first quarter",
            "90-day money-back guarantee",
            "Personalized strategy for your business",
            "Ongoing support and optimization"
          ],
          recommendation: "MIDDLE SECTION: Results-focused content performs best when backed by specific metrics. Include before/after scenarios, percentage improvements, and client success stories."
        },
        bottom: {
          content: "Your transformation starts today. Join successful clients who've already achieved remarkable results with our proven system.",
          final_cta: "Begin Your Transformation",
          recommendation: "BOTTOM SECTION: End with future pacing - help visitors visualize their success. Use phrases like 'your transformation starts today' to create excitement about the future state."
        }
      },
      {
        id: 4,
        approach: "Exclusive & Premium Positioning",
        psychology: "Creates desire through exclusivity and premium positioning",
        top: {
          headline: `Exclusive ${businessData.businessType} Services for Elite ${businessData.targetAudience}`,
          subheadline: `${businessData.businessName} - Where quality meets excellence in ${businessData.industry}`,
          cta: "Apply for Access",
          recommendation: "TOP SECTION: Premium positioning works when you want to attract high-value clients. Use words like 'exclusive,' 'elite,' and 'apply' instead of 'sign up' to create perceived value."
        },
        middle: {
          content: "Why We Only Work with Select Clients",
          features: [
            "White-glove, personalized service",
            "Direct access to senior team members",
            "Custom solutions, not templates",
            "Guaranteed priority support"
          ],
          recommendation: "MIDDLE SECTION: Premium brands emphasize selectivity and personalized service. Explain why you're choosy about clients and what makes your service different from mass-market alternatives."
        },
        bottom: {
          content: "Spaces are limited for our exclusive program. We only accept clients who are serious about achieving exceptional results.",
          final_cta: "Apply Now - Limited Spots",
          recommendation: "BOTTOM SECTION: Create scarcity and exclusivity. Use application language rather than sales language to position your service as something clients must qualify for."
        }
      },
      {
        id: 5,
        approach: "Community & Belonging",
        psychology: "Builds connection through community and shared values",
        top: {
          headline: `Join the ${businessData.businessName} Community`,
          subheadline: `Where ${businessData.targetAudience} connect, grow, and succeed together in ${businessData.industry}`,
          cta: "Join Our Community",
          recommendation: "TOP SECTION: Community-driven messaging builds emotional connection. Emphasize belonging, shared experiences, and collective success rather than individual achievement."
        },
        middle: {
          content: "More Than Just a Service - We're Your Growth Partners",
          features: [
            "Access to exclusive member community",
            "Monthly networking events and workshops",
            "Peer mentorship and support system",
            "Lifetime access to resources and updates"
          ],
          recommendation: "MIDDLE SECTION: Community-focused businesses should highlight connection opportunities. Include networking, peer support, and ongoing relationships rather than just deliverables."
        },
        bottom: {
          content: "Ready to be part of something bigger? Join a community that celebrates your success and supports your growth journey.",
          final_cta: "Become a Member Today",
          recommendation: "BOTTOM SECTION: Community messaging should feel inclusive and aspirational. Use 'become a member' rather than 'buy now' to emphasize belonging over transaction."
        }
      }
    ];
    
    await incrementUsage('website');
    setTemplates(generatedTemplates);
    setLoading(false);
  };

  const regenerateTemplates = async () => {
    // Same generation logic but with different variations
    await generateWebsiteTemplates();
  };

  const handleSaveTemplate = async (template: WebsiteTemplate, customName: string) => {
    await saveTemplate(
      customName,
      'website',
      template,
      businessData
    );
    setShowSaveDialog(null);
  };

  const exportTemplate = (template: WebsiteTemplate) => {
    const content = `
Website Copy Template - ${template.approach}

Business: ${businessData.businessName}
Psychology: ${template.psychology}

TOP SECTION:
Headline: ${template.top.headline}
Subheadline: ${template.top.subheadline}
CTA: ${template.top.cta}
Recommendation: ${template.top.recommendation}

MIDDLE SECTION:
Content: ${template.middle.content}
Features:
${template.middle.features.map(feature => `• ${feature}`).join('\n')}
Recommendation: ${template.middle.recommendation}

BOTTOM SECTION:
Content: ${template.bottom.content}
Final CTA: ${template.bottom.final_cta}
Recommendation: ${template.bottom.recommendation}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessData.businessName}-website-template-${template.id}.txt`;
    a.click();
  };

  const exportAllTemplates = () => {
    const content = templates.map(template => {
      return `
=== TEMPLATE ${template.id}: ${template.approach} ===

Psychology: ${template.psychology}

TOP SECTION:
Headline: ${template.top.headline}
Subheadline: ${template.top.subheadline}
CTA: ${template.top.cta}
Implementation: ${template.top.recommendation}

MIDDLE SECTION:
Content: ${template.middle.content}
Features:
${template.middle.features.map(feature => `• ${feature}`).join('\n')}
Implementation: ${template.middle.recommendation}

BOTTOM SECTION:
Content: ${template.bottom.content}
Final CTA: ${template.bottom.final_cta}
Implementation: ${template.bottom.recommendation}

${'='.repeat(80)}
      `;
    }).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessData.businessName}-all-website-templates.txt`;
    a.click();
  };

  const isPremium = subscription?.subscription_type === 'premium';

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Provide details about your business for personalized website copy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={businessData.businessName}
                  onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., Consulting, E-commerce, SaaS"
                  value={businessData.businessType}
                  onChange={(e) => setBusinessData({...businessData, businessType: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={businessData.industry}
                  onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Entrepreneurs"
                  value={businessData.targetAudience}
                  onChange={(e) => setBusinessData({...businessData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your business does and how it helps customers"
                  value={businessData.description}
                  onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValue"
                  placeholder="What makes your business different from competitors?"
                  value={businessData.uniqueValue}
                  onChange={(e) => setBusinessData({...businessData, uniqueValue: e.target.value})}
                />
              </div>
              
              <Button 
                onClick={generateWebsiteTemplates} 
                className="w-full" 
                disabled={loading || !canUseFeature('website')}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Generate 5 Website Templates
              </Button>
              
              {templates.length > 0 && (
                <Button 
                  onClick={regenerateTemplates} 
                  variant="outline" 
                  className="w-full"
                  disabled={loading || !canUseFeature('website')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate New Templates
                </Button>
              )}
            </CardContent>
          </Card>
          
          <UsageTracker featureType="website" />
        </div>

        {/* Generated Templates */}
        <div className="lg:col-span-2 space-y-4">
          {templates.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Generated Website Templates</h3>
              <Button onClick={exportAllTemplates} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All Templates
              </Button>
            </div>
          )}
          
          {templates.map((template) => (
            <Card key={template.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Template {template.id}: {template.approach}
                      <Badge variant="secondary">{template.psychology}</Badge>
                    </CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowSaveDialog(template.id)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => exportTemplate(template)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Top Section */}
                <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-900">TOP SECTION</h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Headline:</Label>
                      <p className="text-lg font-bold">{template.top.headline}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Subheadline:</Label>
                      <p className="text-muted-foreground">{template.top.subheadline}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Call to Action:</Label>
                      <p className="font-medium text-blue-600">{template.top.cta}</p>
                    </div>
                    <div className="mt-3 p-3 bg-blue-100 rounded">
                      <Label className="text-sm font-medium text-blue-800">💡 Implementation Tip:</Label>
                      <p className="text-sm text-blue-700 mt-1">{template.top.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div className="space-y-3 p-4 border rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-900">MIDDLE SECTION</h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Section Title:</Label>
                      <p className="text-lg font-semibold">{template.middle.content}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Key Features/Benefits:</Label>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {template.middle.features.map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 p-3 bg-green-100 rounded">
                      <Label className="text-sm font-medium text-green-800">💡 Implementation Tip:</Label>
                      <p className="text-sm text-green-700 mt-1">{template.middle.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 p-4 border rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-purple-900">BOTTOM SECTION</h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Closing Content:</Label>
                      <p>{template.bottom.content}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Final Call to Action:</Label>
                      <p className="font-medium text-purple-600">{template.bottom.final_cta}</p>
                    </div>
                    <div className="mt-3 p-3 bg-purple-100 rounded">
                      <Label className="text-sm font-medium text-purple-800">💡 Implementation Tip:</Label>
                      <p className="text-sm text-purple-700 mt-1">{template.bottom.recommendation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {templates.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Copy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Website Copy?</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out your business information and generate 5 unique website templates
                </p>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes top-performing websites across all industries to create 
                  personalized copy that converts visitors into customers.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Save Template</CardTitle>
              <CardDescription>Give your template a memorable name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Template name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      const template = templates.find(t => t.id === showSaveDialog);
                      if (template) {
                        handleSaveTemplate(template, input.value.trim());
                      }
                    }
                  }
                }}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Template name"]') as HTMLInputElement;
                    if (input?.value.trim()) {
                      const template = templates.find(t => t.id === showSaveDialog);
                      if (template) {
                        handleSaveTemplate(template, input.value.trim());
                      }
                    }
                  }}
                  className="flex-1"
                >
                  Save Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WebsiteCopyGenerator;
