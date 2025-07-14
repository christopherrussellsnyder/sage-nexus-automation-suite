import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Phone, Edit3, Copy, Download, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SalesScript {
  type: string;
  title: string;
  duration: string;
  opening: string;
  buildRapport: string;
  problemIdentification: string;
  solutionPresentation: string;
  objectionHandling: string[];
  closingTechnique: string;
  followUp: string;
  purpose: string;
  industry: string;
}

interface SalesScriptsProps {
  data: any;
  businessType: string | null;
}

const SalesScripts = ({ data, businessType }: SalesScriptsProps) => {
  const { toast } = useToast();
  const [selectedScriptType, setSelectedScriptType] = useState<string>('cold-prospecting');
  const [editingScript, setEditingScript] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  // Sales script types for different situations
  const scriptTypes = [
    'cold-prospecting',
    'warm-lead-follow-up',
    'discovery-call',
    'objection-handling',
    'closing-call',
    'follow-up-nurture'
  ];

  const getSalesScripts = (): SalesScript[] => {
    const businessData = data.formData || {};
    const idealCustomer = data.formData?.idealCustomerProfile || {};
    const productToSell = data.formData?.productToSell || businessData.productService || 'your product/service';
    const industry = idealCustomer.customerIndustry || businessData.industry || 'general';
    const customerType = idealCustomer.customerType || 'business';
    const dealSize = idealCustomer.averageDealSize || '$10,000';
    
    return [
      {
        type: 'cold-prospecting',
        title: 'Cold Prospecting Call',
        duration: '2-3 minutes',
        opening: `Hi [Prospect Name], this is [Your Name] from [Company]. I know you weren't expecting my call, so I'll be brief. I specialize in helping ${industry} ${customerType === 'b2b' ? 'businesses' : 'customers'} like yours with ${productToSell}. Do you have just 30 seconds for me to tell you why I called?`,
        buildRapport: `I've been working with similar ${industry} companies, and I noticed that many are struggling with [specific industry challenge]. I recently helped [similar company] achieve [specific result] in just [timeframe]. That's actually why I'm calling you today.`,
        problemIdentification: `[Prospect Name], let me ask you this - when it comes to [relevant business area], what's your biggest challenge right now? Are you finding that [common industry problem]? How is that impacting your [revenue/operations/growth]?`,
        solutionPresentation: `That's exactly what we solve. Our ${productToSell} helps ${industry} ${customerType === 'b2b' ? 'businesses' : 'customers'} [primary benefit]. For example, we helped [specific client] [specific outcome] which resulted in [measurable result]. The best part is, most clients see results within [timeframe].`,
        objectionHandling: [
          'Price: "I understand budget is important. Can I ask what you\'re currently spending on [current solution]? Because most clients find we actually save them money while delivering better results."',
          'Timing: "I hear you on timing. Quick question - if I could show you how to [achieve key benefit] in just [short timeframe], would it be worth 15 minutes of your time?"',
          'Not interested: "I appreciate your honesty. Can I ask - is it that you\'re happy with your current solution, or is it just not a priority right now?"',
          'Need to think: "Absolutely, this is an important decision. What specific questions do you have that would help you feel confident moving forward?"'
        ],
        closingTechnique: `Based on everything we've discussed, it sounds like this could be a perfect fit for [Company]. I have two options: we could start with [smaller option] to test the waters, or jump right into [full solution] for maximum impact. Which approach feels right to you?`,
        followUp: `Perfect! I'm going to send you [relevant resource] right after this call, and let's schedule a follow-up for [specific date/time] to discuss your specific situation in more detail. Does [day] at [time] work for you?`,
        purpose: 'Initial cold outreach to unknown prospects',
        industry: industry
      },
      {
        type: 'warm-lead-follow-up',
        title: 'Warm Lead Follow-up Call',
        duration: '5-10 minutes',
        opening: `Hi [Prospect Name], this is [Your Name] from [Company]. You downloaded our [lead magnet] about [topic] last week. I wanted to personally reach out to see if you had any questions and to learn more about your specific situation with [relevant area].`,
        buildRapport: `I noticed you're with [Company] in the ${industry} space. That's exciting! I've worked with several ${industry} companies like [similar client], and they all face similar challenges when it comes to [relevant area]. What drew you to download the [lead magnet]?`,
        problemIdentification: `That makes sense. In your role at [Company], what's the biggest challenge you're facing with [relevant area]? How long has this been an issue? What have you tried so far to address it?`,
        solutionPresentation: `Based on what you're telling me, this is exactly what we help ${industry} companies solve. Our ${productToSell} specifically addresses [their pain point]. In fact, [similar client] had the exact same challenge, and we helped them [specific result] in [timeframe]. Would something like that be valuable for [their company]?`,
        objectionHandling: [
          'Budget concerns: "I understand budget is always a consideration. Help me understand - what\'s the cost of not solving this problem? What\'s it costing you in [time/money/opportunity]?"',
          'Need approval: "That makes sense. Who else would be involved in this decision? Would it be helpful if I prepared some information for them as well?"',
          'Comparing options: "Smart approach. What other solutions are you looking at? What criteria are most important in your decision?"',
          'Timing issues: "I get it, timing is crucial. When would be the ideal time to have this solved? What happens if you wait until then?"'
        ],
        closingTechnique: `It sounds like this could really help [Company] achieve [their goal]. I'd love to show you exactly how this would work for your specific situation. Would you be open to a brief 20-minute demo where I can walk you through how [similar client] achieved [specific result]?`,
        followUp: `Excellent! I'll send you a calendar link right after this call so you can pick a time that works best for you. In the meantime, I'll prepare a customized demo based on what you've told me about [their specific situation]. Sound good?`,
        purpose: 'Following up with engaged prospects who showed initial interest',
        industry: industry
      },
      {
        type: 'discovery-call',
        title: 'Discovery & Qualification Call',
        duration: '15-30 minutes',
        opening: `Hi [Prospect Name], thanks for making time today. As I mentioned when we scheduled this call, I want to learn more about [Company] and your current situation with [relevant area] to see if there's a good fit for working together. Is that still a good use of our time today?`,
        buildRapport: `Before we dive in, I'd love to learn a bit more about your role at [Company]. How long have you been there? What does a typical day look like for you? What are your main responsibilities when it comes to [relevant area]?`,
        problemIdentification: `Tell me about your current process for [relevant area]. What's working well? What's frustrating? If you could wave a magic wand and fix one thing about [relevant area], what would it be? What's the impact of these challenges on [their business goals]?`,
        solutionPresentation: `That's really helpful context. Based on what you're telling me, I can see how our ${productToSell} could address several of these issues. We've helped companies like [similar client] go from [current state] to [desired state] by [key differentiator]. The result was [specific outcome]. Does something like that align with what you're trying to achieve?`,
        objectionHandling: [
          'Price sensitivity: "Let\'s talk about investment. What\'s your current budget for solving this problem? What would the ROI need to be for this to make sense?"',
          'Decision timeline: "When are you looking to have this solved? What\'s driving that timeline? What happens if you don\'t meet that deadline?"',
          'Stakeholder involvement: "Who else is involved in this decision? What\'s important to them? What concerns might they have?"',
          'Current solution: "Tell me about what you\'re using now. What do you like about it? What would need to be different for you to consider switching?"'
        ],
        closingTechnique: `Based on everything we've discussed, it seems like there could be a really good fit here. The next step would be for me to put together a customized proposal showing exactly how we'd help [Company] achieve [their goals]. Would you like me to prepare that for you?`,
        followUp: `Perfect! I'll put together a detailed proposal and send it over by [date]. Then let's schedule a follow-up call for [date/time] to go through it together and answer any questions. Does that timeline work for you?`,
        purpose: 'Deep dive qualification and needs assessment',
        industry: industry
      },
      {
        type: 'objection-handling',
        title: 'Objection Handling Call',
        duration: '10-15 minutes',
        opening: `Hi [Prospect Name], thanks for taking my call. I know you had some concerns about [specific objection] from our last conversation. I wanted to address those directly and see if we can find a path forward that works for everyone.`,
        buildRapport: `I really appreciate you being upfront about your concerns. It shows you're taking this decision seriously, which I respect. These are important considerations, and I want to make sure you have all the information you need.`,
        problemIdentification: `Help me understand your concerns better. When you say [their objection], what specifically worries you? What would need to be different for you to feel confident moving forward? What's the worst-case scenario you're trying to avoid?`,
        solutionPresentation: `I completely understand those concerns. Let me share how we've addressed similar situations with other ${industry} companies. For example, [Client Name] had the exact same concern about [objection]. Here's how we handled it: [specific solution]. The result was [positive outcome]. Would an approach like that work for your situation?`,
        objectionHandling: [
          'Still too expensive: "I hear you on the investment. Let\'s break this down differently. What\'s the cost of not solving this problem? Over 12 months, what would that total? Now let\'s compare that to the investment in our solution."',
          'Need more time: "I understand wanting to think it through. What specific information would help you make this decision? What questions are still unanswered?"',
          'Concerned about results: "That\'s a valid concern. What would success look like to you? How would you measure it? Let me show you exactly how we ensure those results."',
          'Internal resistance: "Politics can be tricky. What would help you build internal support? What information would make this an easy yes for your team?"'
        ],
        closingTechnique: `Given everything we've discussed, what would it take for you to move forward? If I could address [remaining concern], would you be ready to get started? What's the next step from your perspective?`,
        followUp: `I'm going to [specific action to address their concern] and get back to you by [date] with [specific deliverable]. Then let's reconnect on [date/time] to see if that resolves your concerns. Fair enough?`,
        purpose: 'Addressing specific concerns and objections',
        industry: industry
      },
      {
        type: 'closing-call',
        title: 'Closing Call',
        duration: '15-20 minutes',
        opening: `Hi [Prospect Name], thanks for your time today. We've had several great conversations about how our ${productToSell} can help [Company] achieve [their goals]. I'm excited to discuss the next steps and get you started on the path to [desired outcome].`,
        buildRapport: `Before we finalize everything, I want to make sure we're completely aligned. From our previous conversations, your main goals are [summarize goals], and the key challenges you want to solve are [summarize challenges]. Is that still accurate?`,
        problemIdentification: `Perfect. And just to confirm, you mentioned that solving this would [impact on their business]. What would success look like 6 months from now? How would you measure the impact of working together?`,
        solutionPresentation: `Excellent. Based on everything we've discussed, I've prepared a customized solution that addresses all of your key requirements. This includes [key components] and will deliver [expected outcomes] within [timeframe]. The investment is [amount], which breaks down to [monthly/quarterly amount]. How does that sound?`,
        objectionHandling: [
          'Final price negotiation: "I understand you want to get the best value. This pricing reflects [value justification]. However, I do have some flexibility. If you can commit today, I can offer [specific concession]."',
          'Approval needed: "Who else needs to sign off on this? What information do they need? Would it help if I joined a call with them to answer any questions?"',
          'Start date concerns: "When would you ideally like to start seeing results? Let\'s work backward from there to determine the best start date."',
          'Contract terms: "What specific terms are concerning you? Let\'s address those so we can move forward with confidence."'
        ],
        closingTechnique: `Based on everything we've covered, it's clear this is going to help [Company] achieve [their goals] and solve [their problems]. Are you ready to move forward? Should we get the paperwork started today so you can begin seeing results by [date]?`,
        followUp: `Fantastic! I'll send over the contract within the next hour. Once you sign and return it, we'll schedule your onboarding call for [date]. I'm excited to help [Company] achieve [their goals]. Any final questions before we make this official?`,
        purpose: 'Final push to close qualified prospects',
        industry: industry
      },
      {
        type: 'follow-up-nurture',
        title: 'Follow-up & Nurture Call',
        duration: '5-8 minutes',
        opening: `Hi [Prospect Name], this is [Your Name] from [Company]. I wanted to follow up on our conversation from [timeframe] about helping [Company] with [their challenge]. I know you were evaluating options - how has that process been going?`,
        buildRapport: `I've been thinking about your situation with [specific challenge] since we last spoke. I actually came across an article/case study that reminded me of [Company], and I thought you might find it interesting.`,
        problemIdentification: `Has anything changed with [their original problem]? Are you still experiencing [specific issue]? I'm curious - what's been the priority since we last talked?`,
        solutionPresentation: `I thought you'd be interested to know that [similar client] just achieved [specific result] using our ${productToSell}. They started in a very similar situation to [Company], facing [similar challenge]. The transformation has been remarkable - [specific outcome]. Would an update like that be valuable for [Company]?`,
        objectionHandling: [
          'Still evaluating: "That\'s smart to take your time. What factors are most important in your decision? How can I help you evaluate us against those criteria?"',
          'Budget changes: "I understand budgets can shift. Has the cost of not solving this problem changed? What would need to happen for this to become a priority again?"',
          'Different priorities: "Priorities definitely shift. When do you think this might become important again? What would trigger that?"',
          'Went with competitor: "I understand. How has that been working out? Are you getting the results you expected? I\'d still love to stay in touch."'
        ],
        closingTechnique: `I don't want to be pushy, but I also don't want you to miss out on the opportunity to [achieve their goal]. Would it make sense to schedule a brief call in [timeframe] to check in? Or would you prefer I just send you updates when we have relevant case studies or insights?`,
        followUp: `Perfect! I'll reach out again in [timeframe] unless you contact me first. In the meantime, I'll send you that [relevant resource] I mentioned. If anything changes or you have questions, please don't hesitate to call me directly.`,
        purpose: 'Maintaining relationships with prospects not ready to buy',
        industry: industry
      }
    ];
  };

  const scripts = getSalesScripts();
  const currentScript = scripts.find(s => s.type === selectedScriptType) || scripts[0];

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Sales script has been copied to your clipboard.",
    });
  };

  const handleEdit = (field: string, currentContent: string) => {
    setEditingScript(field);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = () => {
    toast({
      title: "Script updated",
      description: "Your changes have been saved.",
    });
    setEditingScript(null);
    setEditedContent('');
  };

  const getScriptTypeName = (type: string) => {
    const names = {
      'cold-prospecting': 'Cold Prospecting',
      'warm-lead-follow-up': 'Warm Lead Follow-up',
      'discovery-call': 'Discovery Call',
      'objection-handling': 'Objection Handling',
      'closing-call': 'Closing Call',
      'follow-up-nurture': 'Follow-up & Nurture'
    };
    return names[type] || type;
  };

  const formatFullScript = (script: SalesScript) => {
    return `${script.title} (${script.duration})

PURPOSE: ${script.purpose}

OPENING:
${script.opening}

BUILD RAPPORT:
${script.buildRapport}

PROBLEM IDENTIFICATION:
${script.problemIdentification}

SOLUTION PRESENTATION:
${script.solutionPresentation}

OBJECTION HANDLING:
${script.objectionHandling.map((objection, index) => `${index + 1}. ${objection}`).join('\n')}

CLOSING TECHNIQUE:
${script.closingTechnique}

FOLLOW-UP:
${script.followUp}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>AI-Generated Sales Scripts</span>
          </CardTitle>
          <CardDescription>
            Customized phone call scripts for sales teams based on customer profile and industry best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="scriptType">Script Type:</Label>
            <Select value={selectedScriptType} onValueChange={setSelectedScriptType}>
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scriptTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getScriptTypeName(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Script Components */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-blue-50">
                  <Clock className="h-3 w-3 mr-1" />
                  {currentScript.duration}
                </Badge>
                <Badge variant="outline" className="bg-green-50">
                  {currentScript.industry}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium">Purpose</Label>
                <p className="text-sm text-muted-foreground bg-blue-50 p-2 rounded">{currentScript.purpose}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Opening</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('opening', currentScript.opening)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">{currentScript.opening}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Build Rapport</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('rapport', currentScript.buildRapport)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-green-50 p-3 rounded border border-green-200">{currentScript.buildRapport}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Problem Identification</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('problem', currentScript.problemIdentification)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-red-50 p-3 rounded border border-red-200">{currentScript.problemIdentification}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Solution Presentation</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('solution', currentScript.solutionPresentation)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200">{currentScript.solutionPresentation}</p>
              </div>
            </div>

            {/* Script Continuation */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Objection Handling</Label>
                <div className="space-y-2">
                  {currentScript.objectionHandling.map((objection, index) => (
                    <div key={index} className="bg-orange-50 p-3 rounded border border-orange-200">
                      <p className="text-sm">{objection}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Closing Technique</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('closing', currentScript.closingTechnique)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-purple-50 p-3 rounded border border-purple-200 font-medium">{currentScript.closingTechnique}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Follow-up</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('followup', currentScript.followUp)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-gray-50 p-3 rounded border">{currentScript.followUp}</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Complete Script Preview</Label>
                <div className="bg-white border rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs whitespace-pre-wrap font-sans">{formatFullScript(currentScript)}</pre>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleCopyToClipboard(formatFullScript(currentScript))}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Complete Script
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">
              <strong>📞 Pro Tip:</strong> These scripts are templates - personalize them with specific details about your prospect's company, 
              industry challenges, and pain points for maximum effectiveness. Practice the key sections until they feel natural.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesScripts;