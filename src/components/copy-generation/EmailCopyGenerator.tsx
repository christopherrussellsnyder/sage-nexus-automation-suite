
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// Usage tracking and template manager hooks removed - database not configured
import { Mail, Save, RefreshCw, Download } from "lucide-react";
import UsageTracker from "../UsageTracker";

interface EmailTemplate {
  id: number;
  approach: string;
  psychology: string;
  subject_line: string;
  preview_text: string;
  body: string;
  cta: string;
  purpose: string;
}

const EMAIL_TYPES = [
  { value: 'welcome', label: 'Immediate Welcome/Confirmation Email (Intro Email)' },
  { value: 'social_proof', label: 'Social Proof + Value (Testimonial Email)' },
  { value: 'educational', label: 'Education + Problem Agitation (Informational Email)' },
  { value: 'relationship', label: 'Social Connection (Relationship Email)' },
  { value: 'light_offer', label: 'Objection Handling + Soft Pitch (Light Offer Email)' },
  { value: 'hard_offer', label: 'Direct Offer + Urgency (Hard Offer Email)' },
  { value: 'final_chance', label: 'Final Chance + No-Oriented Question (Ending Email)' }
];

const EmailCopyGenerator = () => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    targetAudience: '',
    description: '',
    mainOffer: '',
    pricePoint: ''
  });
  
  const [selectedEmailType, setSelectedEmailType] = useState<string>('');
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState<number | null>(null);
  
  // Usage tracking disabled
  const canUseFeature = () => true;
  const incrementUsage = async () => true;

  const generateEmailTemplates = async () => {
    if (!canUseFeature() || !selectedEmailType) return;
    
    setLoading(true);
    
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const emailTypeData = EMAIL_TYPES.find(type => type.value === selectedEmailType);
    
    let generatedTemplates: EmailTemplate[] = [];
    
    switch (selectedEmailType) {
      case 'welcome':
        generatedTemplates = [
          {
            id: 1,
            approach: "Warm Welcome with Immediate Value",
            psychology: "Creates positive first impression and sets expectations",
            subject_line: `Welcome to ${businessData.businessName} - Your journey starts now!`,
            preview_text: "Here's everything you need to get started + exclusive welcome bonus inside",
            body: `Hi there!\n\nWelcome to the ${businessData.businessName} family! 🎉\n\nI'm thrilled you've decided to join thousands of ${businessData.targetAudience} who are already transforming their ${businessData.industry} results.\n\nHere's what happens next:\n• Check your email for login details\n• Access your welcome bonus (exclusive for new members)\n• Start exploring our ${businessData.businessType} platform\n\nYour success is our priority, and I'm here to help every step of the way.\n\nTo your success,\n[Your Name]\nFounder, ${businessData.businessName}`,
            cta: "Access Your Account Now",
            purpose: "Confirm signup, set expectations, provide immediate value"
          },
          {
            id: 2,
            approach: "Personal Introduction with Social Proof",
            psychology: "Builds personal connection while demonstrating credibility",
            subject_line: `${businessData.businessName}: Let me introduce myself`,
            preview_text: "The story behind our mission and why 10,000+ customers trust us",
            body: `Hi [First Name],\n\nI wanted to personally welcome you to ${businessData.businessName}.\n\nMy name is [Your Name], and I started this company because I was frustrated with the lack of quality ${businessData.businessType} solutions in the ${businessData.industry} space.\n\nWhat started as a simple idea has now helped over 10,000 ${businessData.targetAudience} achieve remarkable results.\n\nI promise you this: every email I send will contain something valuable to help you succeed.\n\nYour welcome package is ready - it includes our most popular resources that our existing customers rave about.\n\nLooking forward to helping you succeed!\n\n[Your Name]`,
            cta: "Download Welcome Package",
            purpose: "Build personal relationship and establish founder credibility"
          },
          {
            id: 3,
            approach: "Expectation Setting with Quick Win",
            psychology: "Reduces anxiety and provides immediate gratification",
            subject_line: "What to expect from ${businessData.businessName} (+ quick win inside)",
            preview_text: "Your roadmap to success starts with this 5-minute action item",
            body: `Hello [First Name],\n\nCongratulations on taking the first step toward transforming your ${businessData.industry} results!\n\nOver the next few days, you'll receive:\n✓ Day 1: Quick-start guide (that's today!)\n✓ Day 3: Success stories from customers like you\n✓ Day 7: Exclusive ${businessData.businessType} strategies\n\nBut first, here's a quick win you can implement in the next 5 minutes:\n\n[Insert specific, actionable tip related to their business]\n\nThis simple change has helped our customers see immediate improvements.\n\nTry it out and let me know how it goes!\n\nBest regards,\n[Your Name]`,
            cta: "Get Your Quick Start Guide",
            purpose: "Set clear expectations and provide immediate value"
          },
          {
            id: 4,
            approach: "Community Welcome with Belonging",
            psychology: "Creates sense of belonging and community connection",
            subject_line: "You're officially part of the ${businessData.businessName} community!",
            preview_text: "Meet your fellow members and get exclusive community perks",
            body: `Welcome to the family, [First Name]!\n\nYou've just joined a community of ambitious ${businessData.targetAudience} who are serious about growing their ${businessData.industry} success.\n\nAs a community member, you get:\n• Access to our private member forum\n• Monthly live Q&A sessions\n• Direct connection with other successful ${businessData.targetAudience}\n• Priority support from our team\n\nI encourage you to introduce yourself in our community forum - our members love welcoming new faces and sharing their experiences.\n\nRemember: you're not alone in this journey. We're all here to support each other.\n\nSee you in the community!\n\n[Your Name] & the ${businessData.businessName} team`,
            cta: "Join Community Forum",
            purpose: "Foster community feeling and encourage engagement"
          },
          {
            id: 5,
            approach: "Value-First Welcome with Clear Next Steps",
            psychology: "Demonstrates value immediately while guiding user journey",
            subject_line: `Your ${businessData.businessName} account is ready (+ exclusive bonuses)`,
            preview_text: "Login now to claim your welcome bonuses worth $500+",
            body: `Hi [First Name],\n\nYour ${businessData.businessName} account is now active and ready to use!\n\nI've added some exclusive bonuses to your account:\n🎁 Bonus #1: ${businessData.businessType} Starter Template ($197 value)\n🎁 Bonus #2: 30-minute strategy call with our team ($297 value)\n🎁 Bonus #3: Access to our ${businessData.industry} Success Blueprint ($97 value)\n\nTotal bonus value: $591 - yours free as a welcome gift.\n\nTo claim your bonuses:\n1. Login to your account\n2. Visit the "Welcome Bonuses" section\n3. Download your materials immediately\n\nThese bonuses are time-sensitive and will expire in 48 hours.\n\nWelcome aboard!\n\n[Your Name]`,
            cta: "Claim Your Bonuses Now",
            purpose: "Provide high-value bonuses and encourage immediate login"
          }
        ];
        break;

      case 'social_proof':
        generatedTemplates = [
          {
            id: 1,
            approach: "Customer Success Story Spotlight",
            psychology: "Uses specific success stories to build credibility and desire",
            subject_line: `How [Customer Name] achieved [specific result] with ${businessData.businessName}`,
            preview_text: "Real results from a real customer - see exactly what they did",
            body: `Hi [First Name],\n\nI wanted to share an incredible success story from one of our ${businessData.businessName} customers.\n\nMeet Sarah, a ${businessData.targetAudience} from Texas:\n\n"Before ${businessData.businessName}, I was struggling with [specific problem]. In just 90 days using their ${businessData.businessType} system, I achieved [specific result]. The results speak for themselves!"\n\nSarah's results:\n✓ [Specific metric 1]\n✓ [Specific metric 2]\n✓ [Specific metric 3]\n\nWhat I love about Sarah's story is that she started exactly where you are right now.\n\nThe same strategies that worked for Sarah are available to you in our platform.\n\nReady to write your own success story?\n\n[Your Name]`,
            cta: "See More Success Stories",
            purpose: "Build credibility through detailed customer success stories"
          },
          {
            id: 2,
            approach: "Numbers and Statistics Focus",
            psychology: "Uses concrete data to demonstrate proven results",
            subject_line: "The numbers don't lie: ${businessData.businessName} results revealed",
            preview_text: "Real data from 1,000+ customers shows average 300% improvement",
            body: `[First Name],\n\nI believe in transparency, so I want to share some real numbers with you.\n\nAfter analyzing results from 1,000+ ${businessData.businessName} customers:\n\n📊 Average improvement: 300% in first 90 days\n📊 Customer satisfaction: 4.9/5 stars\n📊 Success rate: 94% of customers see results in 30 days\n📊 ROI: Average $7 return for every $1 invested\n\nThese aren't cherry-picked results - this is the average performance across all our customers in the ${businessData.industry} space.\n\nWhat makes me most proud? 89% of our customers say ${businessData.businessName} exceeded their expectations.\n\nYour results may vary, but our track record speaks for itself.\n\nReady to become our next success story?\n\n[Your Name]`,
            cta: "Start Your Success Journey",
            purpose: "Use statistical proof to demonstrate consistent results"
          },
          {
            id: 3,
            approach: "Before and After Transformation",
            psychology: "Visual transformation creates desire and belief",
            subject_line: "Before & After: Amazing ${businessData.industry} transformation",
            preview_text: "See how one customer completely transformed their business in 6 months",
            body: `Hi [First Name],\n\nTransformations like this are why I love what we do at ${businessData.businessName}.\n\nCustomer: Mike, ${businessData.targetAudience}\nTime frame: 6 months\n\nBEFORE ${businessData.businessName}:\n❌ [Specific struggle 1]\n❌ [Specific struggle 2]\n❌ [Specific struggle 3]\n\nAFTER ${businessData.businessName}:\n✅ [Specific achievement 1]\n✅ [Specific achievement 2]\n✅ [Specific achievement 3]\n\nMike's quote: "I can't believe how much my ${businessData.industry} results improved. ${businessData.businessName} gave me the exact roadmap I needed."\n\nThe best part? Mike's transformation is typical of what we see with dedicated customers.\n\nIf you're ready for your own transformation, everything Mike used is available in your account.\n\n[Your Name]`,
            cta: "Start My Transformation",
            purpose: "Show dramatic before/after improvements to inspire action"
          },
          {
            id: 4,
            approach: "Industry Recognition and Awards",
            psychology: "Third-party validation builds immediate credibility",
            subject_line: "${businessData.businessName} named #1 ${businessData.businessType} solution",
            preview_text: "Industry recognition + what this means for your success",
            body: `[First Name],\n\nI'm excited to share some incredible news!\n\n${businessData.businessName} was just named the #1 ${businessData.businessType} solution by [Industry Publication].\n\nHere's what the review said:\n\n"${businessData.businessName} stands out for its comprehensive approach to ${businessData.industry} success. Their customer results and innovative methodology make them the clear leader in this space."\n\nThis recognition means:\n✓ You're using the industry's top-rated solution\n✓ Our methods are proven and validated by experts\n✓ You're in great company with thousands of successful customers\n\nBut the real validation comes from customers like you who achieve amazing results.\n\nThank you for being part of our award-winning community!\n\n[Your Name]\nFounder, ${businessData.businessName}`,
            cta: "See Why We Won",
            purpose: "Leverage external validation and industry recognition"
          },
          {
            id: 5,
            approach: "Testimonial Compilation",
            psychology: "Multiple voices create overwhelming social proof",
            subject_line: "What our customers are saying about ${businessData.businessName}",
            preview_text: "Real feedback from real customers - see what they love most",
            body: `Hi [First Name],\n\nI love reading customer feedback, and I thought you'd enjoy seeing what people are saying about ${businessData.businessName}:\n\n💬 "Game-changer for my ${businessData.industry} business!" - Jennifer K.\n\n💬 "Results in just 2 weeks - incredible!" - David M.\n\n💬 "Best investment I've made for my business" - Lisa R.\n\n💬 "The support team is amazing, results are even better" - Tom H.\n\n💬 "Wish I found ${businessData.businessName} years ago" - Maria S.\n\nThese are just a few of the hundreds of reviews we receive every month.\n\nWhat I notice in almost every review: customers are amazed by how quickly they see results.\n\nThe same tools and strategies that helped these customers are waiting for you in your account.\n\nReady to add your success story to this list?\n\n[Your Name]`,
            cta: "Start Getting Results",
            purpose: "Compile multiple testimonials for overwhelming social proof"
          }
        ];
        break;

      case 'educational':
        generatedTemplates = [
          {
            id: 1,
            approach: "Problem Identification and Education",
            psychology: "Educates while highlighting problems customer may not realize they have",
            subject_line: `The hidden ${businessData.industry} mistake costing you customers`,
            preview_text: "Most businesses don't realize they're making this critical error",
            body: `Hi [First Name],\n\nI need to share something important with you.\n\nAfter working with thousands of ${businessData.targetAudience}, I've discovered a hidden mistake that's costing businesses like yours significant revenue.\n\nThe mistake? [Insert specific problem related to their industry]\n\nHere's why this is so damaging:\n• Impact #1: [Specific consequence]\n• Impact #2: [Specific consequence]\n• Impact #3: [Specific consequence]\n\nThe frustrating part? Most ${businessData.targetAudience} don't even realize this is happening.\n\nBut here's the good news: once you know what to look for, this problem is completely fixable.\n\nIn tomorrow's email, I'll share the exact 3-step process we use to eliminate this issue for our ${businessData.businessName} customers.\n\nTalk soon,\n[Your Name]`,
            cta: "Learn More About This Problem",
            purpose: "Identify problems to create urgency for solution"
          },
          {
            id: 2,
            approach: "Industry Trend Analysis",
            psychology: "Positions as thought leader while creating urgency around trends",
            subject_line: "The ${businessData.industry} trend that's changing everything",
            preview_text: "Early adopters are seeing 400% better results - here's why",
            body: `[First Name],\n\nThere's a major shift happening in the ${businessData.industry} world, and I want to make sure you're aware of it.\n\nThe trend: [Describe relevant industry trend]\n\nWhy this matters for ${businessData.targetAudience}:\n\n📈 Early adopters are seeing 400% better results\n📈 Traditional methods are becoming less effective\n📈 Customer expectations are rapidly evolving\n\nHere's what this means for your business:\n\nIf you adapt quickly, you'll have a massive competitive advantage.\n\nIf you wait, you'll be playing catch-up while competitors pull ahead.\n\nThe businesses that understand and implement this trend are the ones that will dominate their markets in the next 2-3 years.\n\nWant to be ahead of the curve? Here's what you need to know...\n\n[Your Name]`,
            cta: "Get the Trend Report",
            purpose: "Educate on trends while creating urgency to adapt"
          },
          {
            id: 3,
            approach: "Step-by-Step Tutorial with Value",
            psychology: "Provides immediate value while demonstrating expertise",
            subject_line: "Free tutorial: [Specific skill] in 10 minutes",
            preview_text: "Follow this simple guide to see immediate improvements",
            body: `Hi [First Name],\n\nI want to teach you something that will immediately improve your ${businessData.industry} results.\n\nToday's lesson: [Specific valuable skill or technique]\n\nHere's the step-by-step process:\n\n📝 Step 1: [Specific action]\n📝 Step 2: [Specific action]\n📝 Step 3: [Specific action]\n📝 Step 4: [Specific action]\n📝 Step 5: [Specific action]\n\nThis entire process takes about 10 minutes, but the results can last for months.\n\nOur ${businessData.businessName} customers who implement this see an average improvement of [specific metric].\n\nThe best part? This is just one of the dozens of strategies we teach inside our platform.\n\nTry this technique today and let me know how it works for you!\n\n[Your Name]`,
            cta: "Get More Advanced Strategies",
            purpose: "Provide valuable education while showcasing deeper expertise"
          },
          {
            id: 4,
            approach: "Myth-Busting with Truth Revelation",
            psychology: "Challenges conventional wisdom to position as authority",
            subject_line: "Myth: [Common belief] - Here's the truth",
            preview_text: "This popular advice is actually hurting your results",
            body: `[First Name],\n\nI need to debunk a dangerous myth that's been circulating in the ${businessData.industry} community.\n\nThe myth: [Insert common misconception]\n\nWhy this advice is actually harmful:\n❌ Reason #1: [Specific explanation]\n❌ Reason #2: [Specific explanation]\n❌ Reason #3: [Specific explanation]\n\nHere's what actually works:\n✅ Truth #1: [Correct approach]\n✅ Truth #2: [Correct approach]\n✅ Truth #3: [Correct approach]\n\nI see too many ${businessData.targetAudience} struggling because they're following outdated or incorrect advice.\n\nThe strategies I teach at ${businessData.businessName} are based on current data and real results from thousands of customers.\n\nDon't let myths hold you back from the success you deserve.\n\n[Your Name]`,
            cta: "Get the Real Facts",
            purpose: "Position as authority by correcting misinformation"
          },
          {
            id: 5,
            approach: "Case Study Deep-Dive",
            psychology: "Uses detailed analysis to educate while building credibility",
            subject_line: "Case study: How [Customer] solved [specific problem]",
            preview_text: "Behind-the-scenes look at a customer's success strategy",
            body: `Hi [First Name],\n\nI want to share a fascinating case study with you.\n\nCustomer: Alex, ${businessData.targetAudience}\nProblem: [Specific challenge]\nResult: [Specific achievement]\n\nHere's exactly what Alex did:\n\n🔍 Analysis: First, we identified the root cause...\n🎯 Strategy: Then we developed a custom plan...\n⚡ Implementation: Alex followed these specific steps...\n📊 Results: Within [timeframe], Alex achieved...\n\nThe key insight from Alex's success:\n[Important lesson or principle]\n\nThis case study demonstrates [important concept] - something we teach extensively in our ${businessData.businessName} program.\n\nThe same methodology that worked for Alex can work for any ${businessData.targetAudience} who's willing to implement it consistently.\n\nWant to see more detailed case studies like this?\n\n[Your Name]`,
            cta: "Access Full Case Study Library",
            purpose: "Educate through detailed success analysis"
          }
        ];
        break;

      // Continue with other email types...
      default:
        generatedTemplates = [];
    }
    
    await incrementUsage();
    setTemplates(generatedTemplates);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Details</CardTitle>
              <CardDescription>
                Configure your email campaign for personalized templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailType">Email Type</Label>
                <Select value={selectedEmailType} onValueChange={setSelectedEmailType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose email type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
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
                  placeholder="e.g., Software, Consulting, E-commerce"
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
                  placeholder="What does your business do?"
                  value={businessData.description}
                  onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                />
              </div>
              
              <Button 
                onClick={generateEmailTemplates} 
                className="w-full" 
                disabled={loading || !canUseFeature() || !selectedEmailType}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Generate 5 Email Templates
              </Button>
            </CardContent>
          </Card>
          
          <UsageTracker featureType="email" />
        </div>

        {/* Generated Templates */}
        <div className="lg:col-span-2 space-y-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Template {template.id}: {template.approach}
                  <Badge variant="secondary">{template.psychology}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Subject Line:</Label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{template.subject_line}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Preview Text:</Label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{template.preview_text}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="font-medium">Email Body:</Label>
                  <div className="text-sm mt-1 p-4 bg-muted rounded whitespace-pre-line">{template.body}</div>
                </div>
                
                <div>
                  <Label className="font-medium">Call to Action:</Label>
                  <p className="text-sm mt-1 p-2 bg-blue-100 rounded font-medium text-blue-800">{template.cta}</p>
                </div>
                
                <div>
                  <Label className="font-medium">Purpose:</Label>
                  <p className="text-sm mt-1 text-muted-foreground">{template.purpose}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailCopyGenerator;
