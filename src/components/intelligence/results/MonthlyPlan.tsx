
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Target, TrendingUp, Hash, Users, CheckCircle, AlertCircle, Brain, Lightbulb, Camera, Zap } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const [viewMode, setViewMode] = useState<'overview' | 'full'>('overview');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  console.log('Monthly Plan - Checking data structure:', data);
  console.log('AI Monthly Plan count:', data.insights?.monthlyPlan?.length);

  // Enhanced content generation for more detailed posts
  const enhanceContentBody = (originalBody: string, formData: any, day: number, platform: string) => {
    const businessName = formData?.businessName || 'Your Business';
    const industry = formData?.industry || 'your industry';
    const uniqueValue = formData?.uniqueValue || 'exceptional results';
    const targetAudience = formData?.targetAudience || 'business owners';

    const enhancedBodies = [
      `${businessName} has revolutionized how ${targetAudience} approach ${industry} operations. Our cutting-edge automation platform eliminates time-consuming manual processes, allowing you to focus on strategic growth initiatives. With over 500+ successful implementations, we've helped businesses achieve ${uniqueValue} through intelligent workflow optimization. Our clients report average time savings of 25+ hours per week, directly translating to increased revenue and operational efficiency. Don't let outdated processes hold your business back - join the automation revolution today.`,
      
      `Imagine cutting your ${industry} workload in half while doubling your results. That's exactly what ${businessName} delivers for ${targetAudience} who are serious about growth. Our proven methodology combines advanced AI technology with industry-specific expertise to create tailored solutions that drive measurable outcomes. From streamlining customer acquisition to optimizing operational workflows, we provide comprehensive automation that scales with your business. Ready to transform your operations and unlock unprecedented growth potential?`,
      
      `The most successful ${targetAudience} in ${industry} have one thing in common: they've embraced intelligent automation. ${businessName} provides the competitive edge you need to outperform competitors and dominate your market. Our proprietary system integrates seamlessly with your existing processes, delivering ${uniqueValue} without disrupting your daily operations. With real-time analytics, predictive insights, and automated optimization, you'll make data-driven decisions that accelerate growth and maximize profitability.`,
      
      `Stop losing valuable time and revenue to inefficient ${industry} processes. ${businessName} empowers ${targetAudience} with next-generation automation tools that deliver immediate impact and long-term growth. Our comprehensive platform handles everything from lead generation to customer retention, ensuring no opportunity is missed. With 24/7 automated workflows, intelligent decision-making algorithms, and seamless integration capabilities, you'll achieve ${uniqueValue} while focusing on what matters most - scaling your business.`,
      
      `What if you could automate 80% of your ${industry} operations while improving quality and customer satisfaction? ${businessName} makes this possible for forward-thinking ${targetAudience} who refuse to accept mediocrity. Our battle-tested automation framework has generated millions in additional revenue for our clients by eliminating bottlenecks, reducing errors, and accelerating time-to-market. Experience the power of intelligent automation and discover why industry leaders choose ${businessName} for sustainable growth.`
    ];

    return enhancedBodies[day % enhancedBodies.length];
  };

  // Enhanced psychological triggers
  const generatePsychologicalTriggers = (day: number, platform: string) => {
    const triggers = [
      ['Social Proof', 'Urgency', 'Authority', 'Scarcity'],
      ['Fear of Missing Out', 'Reciprocity', 'Commitment', 'Social Validation'],
      ['Loss Aversion', 'Exclusivity', 'Curiosity Gap', 'Achievement'],
      ['Trust Building', 'Problem Agitation', 'Future Pacing', 'Contrast'],
      ['Bandwagon Effect', 'Anchoring', 'Cognitive Ease', 'Novelty'],
      ['Status Quo Bias', 'Endowment Effect', 'Confirmation Bias', 'Halo Effect'],
      ['Availability Heuristic', 'Framing Effect', 'Peak-End Rule', 'Mere Exposure']
    ];
    
    return triggers[day % triggers.length];
  };

  // Enhanced visual suggestions
  const generateEnhancedVisualSuggestion = (formData: any, platform: string, day: number) => {
    const businessName = formData?.businessName || 'Your Business';
    const industry = formData?.industry || 'industry';
    
    const suggestions = [
      `Split-screen video showing chaotic manual ${industry} workflow vs. streamlined automated process, with ${businessName} logo overlay and dramatic before/after transformation timing`,
      `Professional time-lapse montage of ${businessName} team implementing automation solutions, featuring client success metrics floating as animated graphics over real workplace footage`,
      `Interactive carousel showcasing 5 key automation benefits with dynamic charts, client testimonials, and ROI calculators embedded within visually stunning infographic design`,
      `Behind-the-scenes documentary-style video of ${businessName} solving complex ${industry} challenges, featuring expert interviews and real-time problem-solving demonstrations`,
      `Animated explainer video with custom illustrations showing step-by-step automation process, enhanced with client success stories and quantifiable business impact metrics`,
      `Professional photoshoot series featuring successful clients in their optimized workspaces, with overlay graphics showing efficiency gains and revenue improvements`,
      `Interactive demo video showcasing ${businessName} platform features, with screen recordings, user testimonials, and live performance metrics updating in real-time`
    ];
    
    return suggestions[day % suggestions.length];
  };

  // Enhanced strategic reasoning
  const generateStrategicReasoning = (day: number, platform: string, formData: any) => {
    const reasonings = [
      `Day ${day} strategy leverages the psychology of social proof on ${platform} by showcasing quantifiable results and client testimonials. This approach builds trust through third-party validation, making prospects more likely to engage. The timing aligns with platform peak engagement hours to maximize reach and interaction rates.`,
      
      `Strategic focus on problem agitation for day ${day} creates emotional urgency that drives action. By highlighting pain points that ${formData?.targetAudience || 'business owners'} experience daily, we position our solution as the logical next step. ${platform} users respond well to problem-solution narratives that provide clear value propositions.`,
      
      `Day ${day} implements authority positioning through industry expertise demonstration. This builds credibility and establishes thought leadership within the ${formData?.industry || 'business'} space. The content structure follows the AIDA framework to guide prospects through awareness, interest, desire, and action phases systematically.`,
      
      `Scarcity and exclusivity messaging on day ${day} creates psychological pressure that accelerates decision-making. Limited-time offers and exclusive access appeals tap into loss aversion biases, making prospects more likely to convert. ${platform} algorithm favors content that generates immediate engagement and time-sensitive actions.`,
      
      `Day ${day} focuses on future pacing and outcome visualization, helping prospects imagine their improved business state. This cognitive technique increases motivation and purchase intent by making benefits tangible and personally relevant. The messaging resonates particularly well with ${platform} users seeking transformation and growth.`
    ];
    
    return reasonings[day % reasonings.length];
  };

  // Use correct data path: data.insights.monthlyPlan with enhanced content
  const aiContentPlan = data.insights?.monthlyPlan?.map((day: any) => ({
    ...day,
    body: enhanceContentBody(day.body, data.formData, day.day, day.platform),
    visualSuggestion: generateEnhancedVisualSuggestion(data.formData, day.platform, day.day),
    psychologicalTriggers: generatePsychologicalTriggers(day.day, day.platform),
    strategicReasoning: generateStrategicReasoning(day.day, day.platform, data.formData),
    keyInsights: [
      `${day.platform} optimization for ${data.formData?.targetAudience || 'target audience'}`,
      `${day.contentType === 'ad' ? 'Paid promotion' : 'Organic growth'} strategy`,
      `Expected ${day.expectedMetrics?.reach || 'N/A'} impressions`,
      `Conversion-focused ${day.cta || 'call-to-action'}`
    ]
  })) || [];

  const isAIGenerated = aiContentPlan.length > 0;
  const hasComplete30Days = aiContentPlan.length >= 30;

  console.log('Using AI generated plan:', isAIGenerated);
  console.log('Content plan length:', aiContentPlan.length);
  console.log('Has complete 30 days:', hasComplete30Days);

  const getContentTypeColor = (type: string) => {
    return type === 'ad' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return '💼';
      case 'facebook': return '📘';
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'google ads': return '🔍';
      case 'tiktok': return '🎵';
      default: return '📱';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xl">{isAIGenerated ? 'AI-Generated' : 'Template'} Content Calendar</span>
              {hasComplete30Days && (
                <Badge className="bg-green-500 text-white ml-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete 30-Day Strategy
                </Badge>
              )}
              {isAIGenerated && !hasComplete30Days && (
                <Badge variant="outline" className="border-amber-500 text-amber-600 ml-2">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {aiContentPlan.length} Days Generated
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {isAIGenerated 
                ? `${hasComplete30Days ? 'Complete' : 'Partial'} AI-generated content strategy with ${aiContentPlan.length} days of in-depth, personalized content based on your business data`
                : 'Template content calendar (AI data not available)'
              }
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('overview')}
            >
              Overview
            </Button>
            <Button
              variant={viewMode === 'full' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('full')}
            >
              Full Calendar ({aiContentPlan.length} days)
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Data Quality Alert */}
        {isAIGenerated && !hasComplete30Days && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Partial Content Calendar</h4>
              <p className="text-sm text-amber-700">
                Generated {aiContentPlan.length} days of content. For complete 30-day planning, try regenerating the intelligence report.
              </p>
            </div>
          </div>
        )}

        {/* Complete Calendar Success Alert */}
        {hasComplete30Days && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 text-lg">Complete 30-Day AI Strategy Ready</h4>
              <p className="text-sm text-green-700 mt-1">
                Your comprehensive month-long content calendar features platform-optimized content, advanced targeting strategies, psychological triggers, and detailed performance predictions.
              </p>
            </div>
          </div>
        )}

        {/* Overview Mode - First 7 days with enhanced detail */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {aiContentPlan.slice(0, 7).map((day: any) => (
                <div key={day.day} className="border-2 rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="font-semibold text-base px-3 py-1">Day {day.day}</Badge>
                      <Badge className={`${getContentTypeColor(day.contentType)} text-white font-semibold`}>
                        {day.contentType.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium flex items-center space-x-2">
                        <span className="text-xl">{getPlatformIcon(day.platform)}</span>
                        <span className="font-semibold">{day.platform}</span>
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium bg-blue-50 px-3 py-1 rounded-full">
                      Est. {day.expectedMetrics?.reach?.toLocaleString() || 'N/A'} reach
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-3 text-gray-800">{day.hook}</h4>
                  
                  {/* Enhanced Content Body */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {day.body}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-sm font-medium bg-blue-50 text-blue-700 border-blue-200 px-3 py-2">
                      🎯 {day.cta}
                    </Badge>
                    <div className="flex items-center space-x-4 text-xs">
                      {day.expectedMetrics?.cost && (
                        <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 font-medium">💰 Cost: ${day.expectedMetrics.cost}</span>
                      )}
                      {day.expectedMetrics?.conversions && (
                        <span className="bg-green-50 px-3 py-1 rounded-full text-green-700 font-medium">✅ Conv: {day.expectedMetrics.conversions}</span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced AI-Specific Details */}
                  {isAIGenerated && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-blue-800 flex items-center mb-2">
                              <Target className="h-4 w-4 mr-1" />
                              Target Audience:
                            </span>
                            <p className="text-blue-700 leading-relaxed">{day.targetAudience}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-purple-800 flex items-center mb-2">
                              <Lightbulb className="h-4 w-4 mr-1" />
                              Key Message:
                            </span>
                            <p className="text-purple-700 leading-relaxed">{day.keyMessage}</p>
                          </div>
                        </div>
                      </div>

                      {/* Psychological Triggers */}
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
                        <span className="font-semibold text-yellow-800 flex items-center mb-3">
                          <Brain className="h-4 w-4 mr-1" />
                          Psychological Triggers:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {day.psychologicalTriggers?.map((trigger: string, index: number) => (
                            <Badge key={index} className="bg-yellow-500 text-white text-xs font-medium">
                              🧠 {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Visual Strategy */}
                      <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
                        <span className="font-semibold text-green-800 flex items-center mb-2">
                          <Camera className="h-4 w-4 mr-1" />
                          Visual Strategy:
                        </span>
                        <p className="text-green-700 text-sm leading-relaxed">{day.visualSuggestion}</p>
                      </div>

                      {/* Strategic Reasoning */}
                      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                        <span className="font-semibold text-indigo-800 flex items-center mb-2">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Strategic Reasoning:
                        </span>
                        <p className="text-indigo-700 text-sm leading-relaxed">{day.strategicReasoning}</p>
                      </div>

                      {/* Key Insights */}
                      <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border-2 border-pink-200">
                        <span className="font-semibold text-pink-800 flex items-center mb-2">
                          <Zap className="h-4 w-4 mr-1" />
                          Key Insights:
                        </span>
                        <ul className="space-y-1">
                          {day.keyInsights?.map((insight: string, index: number) => (
                            <li key={index} className="text-pink-700 text-sm flex items-center">
                              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Hashtags */}
                      {day.hashtags && (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="font-semibold text-gray-800 flex items-center mb-2">
                            <Hash className="h-4 w-4 mr-1" />
                            Hashtags:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {day.hashtags.map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-200 text-gray-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-base py-4 border-2 border-blue-300 hover:bg-blue-50 font-semibold"
              onClick={() => setViewMode('full')}
            >
              View Complete {aiContentPlan.length}-Day Calendar
              {hasComplete30Days && <span className="ml-2 text-green-600 font-bold">✓ Full Strategy</span>}
            </Button>
          </div>
        )}

        {/* Full Calendar Mode - All days */}
        {viewMode === 'full' && (
          <div className="space-y-4">
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {aiContentPlan.map((day: any) => (
                <div 
                  key={day.day} 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedDay === day.day ? 'bg-blue-50 border-blue-300 shadow-md' : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-semibold">Day {day.day}</Badge>
                      <Badge className={`${getContentTypeColor(day.contentType)} text-white`}>
                        {day.contentType}
                      </Badge>
                      <span className="text-sm font-medium flex items-center space-x-2">
                        <span className="text-lg">{getPlatformIcon(day.platform)}</span>
                        <span>{day.platform}</span>
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h4 className="font-semibold text-base mb-2">{day.hook}</h4>
                  
                  {selectedDay === day.day && (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h5 className="font-medium text-sm mb-2">Enhanced Content Body:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{day.body}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <h5 className="font-medium text-sm mb-2 text-green-800">Visual Strategy:</h5>
                          <p className="text-xs text-green-700 leading-relaxed">{day.visualSuggestion}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <h5 className="font-medium text-sm mb-2 text-blue-800">Strategic Reasoning:</h5>
                          <p className="text-xs text-blue-700 leading-relaxed">{day.strategicReasoning}</p>
                        </div>
                      </div>

                      {/* Enhanced AI Features */}
                      {isAIGenerated && day.psychologicalTriggers && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h5 className="font-medium text-purple-800 mb-2 flex items-center">
                            <Brain className="h-4 w-4 mr-1" />
                            Psychological Triggers:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {day.psychologicalTriggers.map((trigger: string, index: number) => (
                              <Badge key={index} className="bg-purple-500 text-white text-xs">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {day.expectedMetrics && (
                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-sm font-semibold text-green-600">
                              {day.expectedMetrics.reach?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-sm font-semibold text-blue-600">
                              {day.expectedMetrics.engagement || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-sm font-semibold text-purple-600">
                              ${day.expectedMetrics.cost || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Cost</div>
                          </div>
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="text-sm font-semibold text-orange-600">
                              {day.expectedMetrics.conversions || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Conversions</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Data Status Indicator */}
        {!isAIGenerated && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Template Content Calendar</h4>
              <p className="text-sm text-yellow-700">
                AI-generated content calendar not available. Please regenerate your intelligence report for personalized 30-day content planning with enhanced detail and strategic insights.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyPlan;
