import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Lightbulb,
  Globe,
  Mail,
  Megaphone,
  Share2,
  AlertTriangle,
  Shield,
  Zap,
  Brain,
  Eye,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const [selectedCopyType, setSelectedCopyType] = useState<'website' | 'ads' | 'email' | 'social'>('website');
  
  console.log('Results Overview - Checking data structure:', data);
  console.log('Copywriting data:', data.insights?.copywritingRecommendations);
  console.log('Budget Strategy data:', data.insights?.budgetStrategy);
  
  const businessData = data.formData || {};
  const industry = businessData.industry || 'general';
  const targetAudience = businessData.targetAudience || 'target audience';
  const monthlyRevenue = businessData.monthlyRevenue || '10k-50k';
  const adBudget = businessData.monthlyAdBudget || '500-2k';

  // Use correct data path: data.insights.copywritingRecommendations
  const aiCopyRecommendations = data.insights?.copywritingRecommendations?.[0];
  const hasAICopywriting = !!aiCopyRecommendations;

  // Use correct data path: data.insights.budgetStrategy
  const aiBudgetStrategy = data.insights?.budgetStrategy?.[0];
  const hasAIBudgetStrategy = !!aiBudgetStrategy;

  console.log('Has AI copywriting:', hasAICopywriting);
  console.log('Has AI budget strategy:', hasAIBudgetStrategy);

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Enhanced copywriting display with different copy types
  const renderCopyTypeContent = () => {
    if (!hasAICopywriting) return null;

    const copyTypes = aiCopyRecommendations.copyTypes || {};
    
    switch (selectedCopyType) {
      case 'website':
        return (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Website Copy Variations
              </h4>
              
              {/* Headlines */}
              <div className="mb-6">
                <h5 className="font-semibold text-blue-700 mb-3">Headlines</h5>
                <div className="grid gap-3">
                  {copyTypes.website?.headlines?.map((headline: string, index: number) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-blue-200 flex justify-between items-center">
                      <span className="font-medium">{headline}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(headline)}
                        className="ml-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  )) || [
                    "Transform Your Business Operations with AI-Powered Automation",
                    "Stop Wasting Time on Manual Processes - Automate Everything",
                    "The Ultimate Solution for Streamlined Business Efficiency"
                  ].map((headline, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-blue-200 flex justify-between items-center">
                      <span className="font-medium">{headline}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(headline)}
                        className="ml-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Website Sections */}
              <div>
                <h5 className="font-semibold text-blue-700 mb-3">Page Sections</h5>
                <div className="space-y-4">
                  {copyTypes.website?.sections?.map((section: any, index: number) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                          {section.sectionType}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(`${section.headline}\n\n${section.body}\n\n${section.cta}`)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <h6 className="font-bold text-gray-800 mb-2">{section.headline}</h6>
                      <p className="text-sm text-gray-600 mb-3">{section.body}</p>
                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <span className="text-xs font-medium text-blue-700">CTA: </span>
                        <span className="text-sm font-semibold text-blue-800">{section.cta}</span>
                      </div>
                    </div>
                  )) || [
                    {
                      sectionType: "Hero Section",
                      headline: "Revolutionize Your Business with Smart Automation",
                      body: "Join thousands of businesses that have transformed their operations with our cutting-edge automation platform. Streamline processes, reduce costs, and scale efficiently.",
                      cta: "Start Your Free Trial Today"
                    },
                    {
                      sectionType: "Features Section",
                      headline: "Everything You Need to Automate Success",
                      body: "Our comprehensive platform includes workflow automation, data integration, and intelligent reporting - all designed to help your business operate at peak efficiency.",
                      cta: "Explore All Features"
                    }
                  ].map((section, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                          {section.sectionType}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(`${section.headline}\n\n${section.body}\n\n${section.cta}`)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <h6 className="font-bold text-gray-800 mb-2">{section.headline}</h6>
                      <p className="text-sm text-gray-600 mb-3">{section.body}</p>
                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <span className="text-xs font-medium text-blue-700">CTA: </span>
                        <span className="text-sm font-semibold text-blue-800">{section.cta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                <Megaphone className="h-5 w-5 mr-2" />
                Ad Copy Variations by Platform
              </h4>
              
              {copyTypes.ads?.platforms?.map((platform: any, index: number) => (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
                  <h5 className="font-bold text-purple-700 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    {platform.platform} Ads
                  </h5>
                  <div className="space-y-3">
                    {platform.adVariations?.map((ad: any, adIndex: number) => (
                      <div key={adIndex} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-purple-700 border-purple-300">
                            {ad.format}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.body}\n\n${ad.cta}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <h6 className="font-bold text-gray-800 mb-2">{ad.headline}</h6>
                        <p className="text-sm text-gray-600 mb-2">{ad.body}</p>
                        <div className="bg-purple-100 p-2 rounded border border-purple-300">
                          <span className="text-xs font-medium text-purple-700">CTA: </span>
                          <span className="text-sm font-semibold text-purple-800">{ad.cta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )) || [
                {
                  platform: "Facebook/Meta",
                  adVariations: [
                    {
                      headline: "Stop Wasting Hours on Manual Tasks",
                      body: "Automate your business processes and focus on what matters most. Join 10,000+ businesses already saving 20+ hours per week.",
                      cta: "Get Started Free",
                      format: "Single Image"
                    },
                    {
                      headline: "Your Competition is Already Automating",
                      body: "Don't get left behind. Our platform helps businesses increase efficiency by 300% while reducing operational costs.",
                      cta: "See How It Works",
                      format: "Video Ad"
                    }
                  ]
                },
                {
                  platform: "Google Ads",
                  adVariations: [
                    {
                      headline: "Business Automation Software | Free Trial",
                      body: "Streamline operations, reduce costs, boost productivity. Try our award-winning automation platform free for 14 days.",
                      cta: "Start Free Trial",
                      format: "Search Ad"
                    }
                  ]
                }
              ].map((platform, index) => (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
                  <h5 className="font-bold text-purple-700 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    {platform.platform} Ads
                  </h5>
                  <div className="space-y-3">
                    {platform.adVariations.map((ad: any, adIndex: number) => (
                      <div key={adIndex} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-purple-700 border-purple-300">
                            {ad.format}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.body}\n\n${ad.cta}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <h6 className="font-bold text-gray-800 mb-2">{ad.headline}</h6>
                        <p className="text-sm text-gray-600 mb-2">{ad.body}</p>
                        <div className="bg-purple-100 p-2 rounded border border-purple-300">
                          <span className="text-xs font-medium text-purple-700">CTA: </span>
                          <span className="text-sm font-semibold text-purple-800">{ad.cta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Marketing Sequences
              </h4>
              
              <div className="space-y-4">
                {copyTypes.email?.sequences?.map((email: any, index: number) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-green-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {email.emailType}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {email.timing}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <h6 className="font-bold text-gray-800 mb-2">Subject: {email.subject}</h6>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{email.body}</p>
                    </div>
                  </div>
                )) || [
                  {
                    emailType: "Welcome Email",
                    subject: "Welcome to the Future of Business Automation",
                    body: "Hi [Name],\n\nThanks for joining thousands of forward-thinking business owners who are transforming their operations with automation.\n\nOver the next few days, I'll share exactly how businesses like yours are:\n• Saving 20+ hours per week\n• Reducing operational costs by 40%\n• Scaling without adding overhead\n\nYour automation journey starts now.\n\nBest regards,\n[Your Name]",
                    timing: "Immediate"
                  },
                  {
                    emailType: "Educational Email",
                    subject: "The #1 Mistake Most Businesses Make with Automation",
                    body: "Hi [Name],\n\nI see this mistake all the time...\n\nBusinesses try to automate everything at once and end up overwhelmed.\n\nThe secret? Start with ONE process that takes you the most time.\n\nFor most of our clients, that's lead management. Here's how we automated it:\n\n[Case study details]\n\nReady to identify your automation opportunity?\n\n[CTA Button]\n\nBest,\n[Your Name]",
                    timing: "Day 2"
                  },
                  {
                    emailType: "Social Proof Email",
                    subject: "How [Client Name] Doubled Revenue with Automation",
                    body: "Hi [Name],\n\nJust got off a call with [Client Name], and I had to share this with you...\n\nSix months ago, they were drowning in manual processes. Today, they've:\n• Doubled their monthly revenue\n• Cut operational costs by 45%\n• Freed up 30 hours per week\n\nThe best part? It took just 4 weeks to implement.\n\nWant to see how they did it?\n\n[CTA Button]\n\nBest,\n[Your Name]",
                    timing: "Day 5"
                  }
                ].map((email, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-green-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {email.emailType}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {email.timing}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <h6 className="font-bold text-gray-800 mb-2">Subject: {email.subject}</h6>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{email.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
              <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Social Media Content
              </h4>
              
              {copyTypes.social?.platforms?.map((platform: any, index: number) => (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-orange-200">
                  <h5 className="font-bold text-orange-700 mb-3 flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    {platform.platform} Posts
                  </h5>
                  <div className="space-y-3">
                    {platform.posts?.map((post: any, postIndex: number) => (
                      <div key={postIndex} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-orange-700 border-orange-300">
                            {post.contentType}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(`${post.caption}\n\n${post.hashtags?.join(' ')}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{post.caption}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags?.map((hashtag: string, hashIndex: number) => (
                            <Badge key={hashIndex} variant="outline" className="text-xs text-orange-600 border-orange-300">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )) || [
                {
                  platform: "LinkedIn",
                  posts: [
                    {
                      caption: "The biggest lie in business:\n\n\"We don't have time to automate.\"\n\nThe truth? You don't have time NOT to automate.\n\nEvery hour spent on manual tasks is an hour stolen from growth.\n\nStart with ONE process. Automate it. Then move to the next.\n\nWhat process would you automate first?",
                      hashtags: ["#BusinessAutomation", "#Productivity", "#Efficiency", "#BusinessGrowth"],
                      contentType: "Educational"
                    },
                    {
                      caption: "CLIENT SPOTLIGHT 🎯\n\nMeet Sarah, who runs a digital marketing agency.\n\n6 months ago:\n• Working 70+ hours/week\n• Drowning in client requests\n• Revenue plateau at $15K/month\n\nToday:\n• Works 40 hours/week\n• Clients love the streamlined process\n• Revenue: $45K/month\n\nThe difference? She automated her client onboarding, reporting, and communication.\n\nAutomation isn't just about efficiency—it's about scaling your impact.",
                      hashtags: ["#ClientSuccess", "#Automation", "#DigitalMarketing", "#ScaleBusiness"],
                      contentType: "Case Study"
                    }
                  ]
                }
              ].map((platform, index) => (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-orange-200">
                  <h5 className="font-bold text-orange-700 mb-3 flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    {platform.platform} Posts
                  </h5>
                  <div className="space-y-3">
                    {platform.posts.map((post: any, postIndex: number) => (
                      <div key={postIndex} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-orange-700 border-orange-300">
                            {post.contentType}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(`${post.caption}\n\n${post.hashtags?.join(' ')}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{post.caption}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags?.map((hashtag: string, hashIndex: number) => (
                            <Badge key={hashIndex} variant="outline" className="text-xs text-orange-600 border-orange-300">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderAwarenessStages = () => {
    if (!aiCopyRecommendations?.awarenessStageVariations) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-blue-800">
          <Brain className="h-5 w-5 mr-2" />
          AI Customer Awareness Journey
        </h4>
        <div className="space-y-4">
          {Object.entries(aiCopyRecommendations.awarenessStageVariations).map(([stage, copy], index) => (
            <div key={stage} className="border-l-4 border-blue-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="capitalize font-semibold text-blue-700 border-blue-300">
                  Stage {index + 1}: {stage.replace(/([A-Z])/g, ' $1').trim()}
                </Badge>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{copy as string}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmotionalTriggers = () => {
    if (!aiCopyRecommendations?.emotionalTriggers) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-green-800">
          <Zap className="h-5 w-5 mr-2" />
          High-Impact Emotional Triggers
        </h4>
        <div className="grid gap-4">
          {aiCopyRecommendations.emotionalTriggers.map((trigger: any, index: number) => (
            <div key={index} className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-bold text-green-800 text-base">{trigger.trigger}</h5>
                <Badge className="bg-green-100 text-green-800 font-semibold">
                  +{trigger.expectedImpact}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">{trigger.implementation}</p>
              <div className="text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">
                Expected Impact: {trigger.expectedImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderABTestingFramework = () => {
    if (!aiCopyRecommendations?.abTestingFramework) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 rounded-xl border-2 border-purple-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-purple-800">
          <Target className="h-5 w-5 mr-2" />
          Advanced A/B Testing Strategy
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-3 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Variables to Test:
            </h5>
            <ul className="space-y-2">
              {aiCopyRecommendations.abTestingFramework.variables?.map((variable: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="font-medium">{variable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Success Metrics:
            </h5>
            <ul className="space-y-2">
              {aiCopyRecommendations.abTestingFramework.successMetrics?.map((metric: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="font-medium">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {aiCopyRecommendations.abTestingFramework.statisticalSignificance && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm font-bold text-purple-800">Statistical Requirements: </span> 
            <span className="text-sm text-gray-600">{aiCopyRecommendations.abTestingFramework.statisticalSignificance}</span>
          </div>
        )}
      </div>
    );
  };

  const renderCrisisManagement = () => {
    const crisisData = aiBudgetStrategy?.crisisManagement || {
      performanceThreshold: 2.0,
      automatedActions: [
        'Pause underperforming ad sets immediately',
        'Reallocate budget to top-performing campaigns',
        'Activate emergency remarketing sequences',
        'Implement A/B testing on new creative variations',
        'Increase bid adjustments for high-converting audiences'
      ],
      budgetReallocation: 'Shift 50% of budget from underperforming platforms to top 2 performers within 24 hours',
      emergencyRemarketing: ['Cart Abandonment Sequence', 'Video Viewer Retargeting', 'Website Visitor Warm-up', 'Past Customer Reactivation']
    };

    return (
      <div className="mt-8 p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl border-2 border-red-200 shadow-lg">
        <h4 className="text-xl font-bold mb-6 flex items-center text-red-800">
          <Shield className="h-6 w-6 mr-3" />
          Crisis Management Protocols
          <Badge className="ml-3 bg-red-100 text-red-800 font-bold">
            Emergency Response System
          </Badge>
        </h4>
        
        <div className="grid gap-6">
          <div className="p-5 bg-white rounded-lg border-2 border-red-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-red-800 text-lg">Performance Alert Threshold</h5>
              <Badge className="bg-red-500 text-white text-lg font-bold px-4 py-2">
                ROAS &lt; {crisisData.performanceThreshold}x
              </Badge>
            </div>
            <p className="text-sm text-gray-600 bg-red-50 p-3 rounded border border-red-200">
              <strong>Trigger:</strong> When campaign ROAS drops below {crisisData.performanceThreshold}x for 48 consecutive hours, automatic crisis protocols activate.
            </p>
          </div>
          
          <div className="p-5 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
            <h5 className="font-bold text-orange-800 mb-4 text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Automated Crisis Actions
            </h5>
            <div className="grid md:grid-cols-2 gap-3">
              {crisisData.automatedActions.map((action: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg border-2 border-yellow-200 shadow-sm">
            <h5 className="font-bold text-yellow-800 mb-3 text-lg">Budget Reallocation Strategy</h5>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-gray-700 leading-relaxed">{crisisData.budgetReallocation}</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
            <h5 className="font-bold text-blue-800 mb-4 text-lg">Emergency Remarketing Campaigns</h5>
            <div className="grid grid-cols-2 gap-3">
              {crisisData.emergencyRemarketing.map((campaign: string, index: number) => (
                <Badge key={index} variant="outline" className="border-blue-300 text-blue-700 font-semibold p-3 justify-center">
                  🚨 {campaign}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getRevenueInsight = () => {
    const insights: Record<string, string> = {
      '0-10k': 'Focus on building audience and proving concept with organic content',
      '10k-50k': 'Perfect stage for scaling with targeted advertising and automation',
      '50k-100k': 'Optimize conversion funnels and expand to new platforms',
      '100k-500k': 'Implement advanced segmentation and personalization',
      '500k+': 'Focus on enterprise solutions and strategic partnerships'
    };
    return insights[monthlyRevenue] || insights['10k-50k'];
  };

  const getBudgetStrategy = () => {
    const strategies: Record<string, string> = {
      '0-500': 'Start with organic content, test small paid campaigns on best-performing platforms',
      '500-2k': 'Split 70/30 between top platform and testing secondary channels',
      '2k-5k': 'Diversify across 2-3 platforms with A/B testing on all campaigns',
      '5k-10k': 'Scale winning campaigns and implement advanced targeting',
      '10k-25k': 'Multi-platform presence with sophisticated attribution tracking',
      '25k+': 'Enterprise-level campaigns with custom audiences and lookalikes'
    };
    return strategies[adBudget] || strategies['500-2k'];
  };

  return (
    <div className="space-y-8">
      {/* Business Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Business Overview</span>
            </CardTitle>
            <CardDescription>Key insights about your business and market position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
                <p className="font-semibold capitalize">{industry}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Business Type</Label>
                <p className="font-semibold capitalize">{businessType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Revenue Stage</Label>
                <p className="font-semibold">${monthlyRevenue}/month</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Ad Budget</Label>
                <p className="font-semibold">${adBudget}/month</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
              <p className="text-sm bg-gray-50 p-2 rounded">{targetAudience}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Strategic Focus</Label>
              <p className="text-sm bg-blue-50 p-2 rounded border border-blue-200">{getRevenueInsight()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Budget Strategy</span>
            </CardTitle>
            <CardDescription>
              {hasAIBudgetStrategy ? 'AI-optimized spending recommendations' : 'Template budget recommendations'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasAIBudgetStrategy ? (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">AI Budget Allocation</Label>
                <div className="space-y-2 mt-2">
                  {aiBudgetStrategy.allocation?.map((platform: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{platform.platform}</span>
                      <span className="font-semibold">{platform.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Recommended Strategy</Label>
                  <p className="text-sm bg-green-50 p-2 rounded border border-green-200">{getBudgetStrategy()}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Budget Allocation</Label>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Primary Platform (Facebook/Google)</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Secondary Platform (Instagram/TikTok)</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Testing & Optimization</span>
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-600">4.2x</div>
                <div className="text-xs text-muted-foreground">Expected ROAS</div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-600">$12.50</div>
                <div className="text-xs text-muted-foreground">Target CPM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crisis Management Section */}
      {renderCrisisManagement()}

      {/* Enhanced AI Copywriting Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6" />
              <span className="text-xl">{hasAICopywriting ? 'AI-Generated' : 'Template'} Copywriting Intelligence</span>
              {hasAICopywriting && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="copyType" className="text-sm">Content Type:</Label>
              <Select value={selectedCopyType} onValueChange={(value: any) => setSelectedCopyType(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Website Copy</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ads">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="h-4 w-4" />
                      <span>Ad Copy</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Marketing</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="social">
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>Social Content</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardDescription className="text-base">
            {hasAICopywriting 
              ? `Advanced AI copywriting analysis for your ${industry} business targeting ${targetAudience}`
              : `Template copywriting recommendations for your ${industry} business targeting ${targetAudience}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasAICopywriting ? (
            <div className="space-y-6">
              {/* Copy Type Content */}
              {renderCopyTypeContent()}

              {/* Enhanced AI Components */}
              {renderAwarenessStages()}
              {renderEmotionalTriggers()}
              {renderABTestingFramework()}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">AI copywriting analysis not available - using template recommendations</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Audience Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">+127%</p>
                <p className="text-xs text-muted-foreground">Growth Potential</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">3.8%</p>
                <p className="text-xs text-muted-foreground">Target CVR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">30</p>
                <p className="text-xs text-muted-foreground">Days to Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced AI Data Status */}
      {!hasAICopywriting && (
        <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Template Data Notice</h4>
            <p className="text-sm text-yellow-700">
              Displaying template copywriting recommendations - AI analysis not available. Regenerate your intelligence report for personalized insights.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsOverview;
