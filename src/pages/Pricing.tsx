
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Brain, Zap, Target, Rocket } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">One Platform, Everything Automated</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get unlimited access to our complete AI business automation suite. 
            E-commerce, marketing, sales, and copywriting tools all included.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">All-in-One</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600">Fully Automated</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Free Trial</CardTitle>
              <CardDescription>Perfect for testing our complete automation platform</CardDescription>
              <div className="text-3xl font-bold">$0<span className="text-lg font-normal">/14 days</span></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">E-commerce Automation</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    5 website templates
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Weekly product research (10 products)
                  </li>
                </ul>
                
                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">Marketing Agency Tools</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    3 campaign setups
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Basic lead scoring
                  </li>
                </ul>

                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">Sales Operations</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    10 prospect research credits
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Basic sales sequences
                  </li>
                </ul>

                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">AI Copywriting</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    5 generations per copy type
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Save & export templates
                  </li>
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                Complete Automation Suite
              </CardTitle>
              <CardDescription>Unlimited access to all automation tools</CardDescription>
              <div className="text-3xl font-bold">$97<span className="text-lg font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">E-commerce Automation</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited custom websites
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Weekly trending products (30+ products)
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced store templates
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Custom domain integration
                  </li>
                </ul>
                
                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">Marketing Agency Tools</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited campaign management
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced lead scoring & nurturing
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Social media content factory
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    White-label client reporting
                  </li>
                </ul>

                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">Sales Operations</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited prospect research
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced sales sequences
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Meeting intelligence & CRM sync
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Deal progression automation
                  </li>
                </ul>

                <div className="text-sm font-medium text-gray-900 mb-3 mt-4">AI Copywriting</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited copy generations
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced customization options
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Export to multiple formats
                  </li>
                </ul>
              </div>
              <Button className="w-full">
                <Crown className="h-4 w-4 mr-2" />
                Start Automating Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Everything You Need to Automate Your Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  E-commerce Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• AI website builder</li>
                  <li>• Product research engine</li>
                  <li>• Trending analysis</li>
                  <li>• Store optimization</li>
                  <li>• Domain integration</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  Agency Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Campaign orchestration</li>
                  <li>• Lead scoring system</li>
                  <li>• Social content factory</li>
                  <li>• Client reporting</li>
                  <li>• Multi-platform sync</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Rocket className="h-5 w-5 text-purple-600" />
                  </div>
                  Sales Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Prospect research AI</li>
                  <li>• Sales sequence automation</li>
                  <li>• Meeting intelligence</li>
                  <li>• Deal tracking</li>
                  <li>• CRM integration</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Brain className="h-5 w-5 text-orange-600" />
                  </div>
                  AI Copywriting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Website copy generation</li>
                  <li>• Ad copy creation</li>
                  <li>• Email sequences</li>
                  <li>• Social content</li>
                  <li>• Template library</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ or guarantees section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Card className="bg-blue-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses that have automated their operations with Sage.ai. 
                Start your free trial today and see the difference AI automation can make.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">
                  Start 14-Day Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
