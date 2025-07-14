
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Edit, Copy, Check } from 'lucide-react';

interface SalesScript {
  type: string;
  title: string;
  content: string;
  description: string;
  duration: string;
}

interface SalesScriptsGeneratorProps {
  data: any;
  idealCustomer?: any;
}

const SalesScriptsGenerator = ({ data, idealCustomer }: SalesScriptsGeneratorProps) => {
  const [selectedScript, setSelectedScript] = useState<SalesScript | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const scriptTypes = [
    {
      type: 'Cold Calling Script',
      title: 'Initial Outreach Call',
      description: 'First contact with prospects',
      duration: '3-5 minutes'
    },
    {
      type: 'Discovery Call Script',
      title: 'Needs Assessment Call',
      description: 'Understanding prospect needs and pain points',
      duration: '15-20 minutes'
    },
    {
      type: 'Demo/Presentation Script',
      title: 'Product Demonstration Call',
      description: 'Showcasing solution and benefits',
      duration: '20-30 minutes'
    },
    {
      type: 'Objection Handling Script',
      title: 'Overcoming Common Objections',
      description: 'Responses to typical sales objections',
      duration: '5-10 minutes'
    },
    {
      type: 'Closing Script',
      title: 'Deal Closing Conversation',
      description: 'Moving prospects to purchase decision',
      duration: '10-15 minutes'
    },
    {
      type: 'Follow-up Script',
      title: 'Post-Meeting Follow-up',
      description: 'Maintaining momentum after meetings',
      duration: '5-8 minutes'
    }
  ];

  const generateScriptContent = (type: string) => {
    const productToSell = data?.productToSell || 'our solution';
    const industry = idealCustomer?.customerIndustry || 'your industry';
    const businessName = data?.businessName || 'Your Company';
    const avgDealSize = idealCustomer?.averageDealSize || '$5,000';

    const scripts = {
      'Cold Calling Script': `**COLD CALLING SCRIPT - ${businessName}**

**OPENING (First 15 seconds):**
"Hi [First Name], this is [Your Name] from ${businessName}. I know I'm calling out of the blue, but I have a quick question for you.

Are you currently struggling with [specific pain point related to ${industry}]?"

**PERMISSION TO CONTINUE:**
"I realize I caught you at a random time. Do you have 2 minutes for me to explain why I'm calling, or should I call back at a better time?"

**VALUE PROPOSITION:**
"Great! The reason I'm calling is that we've been working with ${industry} companies like yours, and we've discovered that most are losing about ${avgDealSize} per month due to [specific problem].

We've developed ${productToSell} that has helped companies like [Similar Company] save an average of [specific amount] within 90 days."

**QUALIFYING QUESTIONS:**
1. "How are you currently handling [specific process]?"
2. "What's that costing you in terms of time and money?"
3. "If I could show you how to [specific benefit], would that be worth a 15-minute conversation?"

**CLOSE FOR APPOINTMENT:**
"Based on what you've told me, I think we might be able to help. I'd like to schedule a brief 15-minute call to show you exactly how [Similar Company] achieved [specific result].

I have Tuesday at 2 PM or Wednesday at 10 AM available. Which works better for you?"

**OBJECTION HANDLING:**
If "Not interested": "I understand. Can I ask what you're currently doing to address [pain point]?"
If "Too busy": "I get it, that's exactly why our clients love this solution - it saves them 10 hours per week. When would be a better time to discuss saving you time?"
If "Send me information": "I could do that, but honestly, generic information won't be as valuable as a 15-minute conversation tailored to your specific situation. What concerns you most about [pain point]?"`,

      'Discovery Call Script': `**DISCOVERY CALL SCRIPT - Needs Assessment**

**OPENING & RAPPORT (2-3 minutes):**
"Hi [Name], thanks for taking the time to speak with me today. Before we dive in, how has your week been?"

[Brief rapport building - 1-2 exchanges]

"Perfect. So just to set expectations, I'd like to spend about 15-20 minutes understanding your current situation with [relevant area], and then I'll share how we might be able to help. Sound good?"

**CURRENT SITUATION QUESTIONS:**
1. "Tell me about your current process for [relevant area]."
2. "What's working well with your current approach?"
3. "What challenges are you facing?"
4. "How is this impacting your business/team/results?"

**PAIN POINT EXPLORATION:**
1. "How long has this been an issue?"
2. "What have you tried to fix it?"
3. "What would happen if this problem got worse over the next 6 months?"
4. "What would it mean for your business if you could solve this completely?"

**DECISION MAKING PROCESS:**
1. "Who else would be involved in evaluating a solution like this?"
2. "What's your typical process for making decisions about [relevant category]?"
3. "What budget range are you working with for solving this problem?"
4. "What's your timeline for implementing a solution?"

**QUALIFICATION:**
- Budget: "Investments in solutions like this typically range from $X to $Y. Are you comfortable in that range?"
- Authority: "Besides yourself, who else would need to approve this type of investment?"
- Need: "On a scale of 1-10, how important is solving this problem to you?"
- Timeline: "When would you ideally like to have this solved?"

**NEXT STEPS:**
"Based on everything you've shared, it sounds like ${productToSell} could be a great fit. I'd like to show you exactly how it would work for your specific situation. 

I can prepare a customized demonstration that addresses [specific pain points mentioned]. Would Thursday at 2 PM or Friday at 10 AM work better for you?"`,

      'Demo/Presentation Script': `**PRODUCT DEMONSTRATION SCRIPT**

**OPENING & AGENDA (2 minutes):**
"Hi everyone, thanks for joining today's call. Just to confirm, we have [list attendees] on the line.

Based on our previous conversation, [Name], you mentioned that [recap 2-3 main pain points]. Today I'm going to show you exactly how ${productToSell} solves these specific challenges for you.

Our agenda today:
1. Quick recap of your current challenges (2 minutes)
2. Demo focused on your specific needs (15 minutes)  
3. ROI calculation for your business (5 minutes)
4. Next steps (3 minutes)

Sound good?"

**PAIN RECAP:**
"Just to make sure I understood correctly, your main challenges are:
- [Challenge 1]: Currently costing you [specific impact]
- [Challenge 2]: Taking [time/resources] away from [important activity]
- [Challenge 3]: Preventing you from [desired outcome]

Is that accurate, or did I miss anything?"

**DEMO STRUCTURE:**
**Problem → Solution → Benefit**

**For each major pain point:**

**"Challenge 1: [Specific Problem]"**
"So you mentioned that [specific problem]. Let me show you how we solve this..."

[Screen share/Demo specific feature]

"As you can see, this means that instead of [current painful process], you can now [improved process]. 

For a company like yours, this typically saves [specific time/money amount] per [time period]."

**ROI CALCULATION:**
"Let me show you what this looks like financially for your business:

Current Cost of Problem:
- [Pain point 1]: $[amount] per month  
- [Pain point 2]: $[amount] per month
- Total monthly cost: $[total]

Investment in ${productToSell}: $[price] per month

Monthly savings: $[savings]
Annual ROI: [percentage]%
Payback period: [time frame]

Does this make sense financially?"

**CLOSING:**
"Based on what we've covered, it looks like ${productToSell} could save you approximately $[amount] per year while [key benefit].

What questions do you have about moving forward?"`,

      'Objection Handling Script': `**OBJECTION HANDLING SCRIPTS**

**"IT'S TOO EXPENSIVE"**
"I understand price is a concern. Let me ask you this - what's it costing you NOT to solve this problem?

Based on what you told me, you're currently losing about $[amount] per month. Our solution is $[price] per month, which means you'd actually save $[difference] every month.

Would you rather invest $[price] to save $[larger amount], or continue losing $[larger amount] every month?"

**"I NEED TO THINK ABOUT IT"**
"Absolutely, this is an important decision. What specifically do you need to think about?

Is it the budget? The implementation process? Getting buy-in from your team?

[Address specific concern]

Here's what I'd suggest - let's schedule a follow-up call for [specific date] so I can answer any questions that come up. What day works best for you?"

**"WE'RE HAPPY WITH OUR CURRENT SOLUTION"**
"That's great to hear that you have something in place. Can I ask - what originally led you to take this call with me?

[Listen to response]

It sounds like while your current solution handles the basics, you're still experiencing [pain point they mentioned]. Is that accurate?

The companies we work with typically keep their existing system for [basic function] and use our solution specifically for [advanced capability]. Would it be helpful to see how that works?"

**"I DON'T HAVE BUDGET RIGHT NOW"**
"I totally understand budget constraints. Let me ask - if budget wasn't an issue, is this something you'd want to move forward with?

[If yes]: 'Great, so it's just a matter of timing. When does your next budget cycle start?'

[If no]: 'What would need to change about the solution for it to be a priority?'

Also, many of our clients have found that the ROI is so strong, the solution actually pays for itself within [time frame]. Would it be helpful to look at some creative ways to structure this investment?"

**"I DON'T HAVE TIME TO IMPLEMENT"**
"Time is definitely valuable, and I appreciate you being upfront about that.

The good news is that our implementation process is designed specifically for busy professionals like yourself. Here's how it works:

- Week 1: 2-hour setup call (mostly our team doing the work)
- Week 2: 1-hour training session  
- Week 3: 30-minute check-in

Total time investment: 3.5 hours to save [X hours] per week.

Would investing 3.5 hours to save [X hours] every week be worth it?"

**"I NEED TO DISCUSS WITH MY TEAM/BOSS"**
"Absolutely, that makes perfect sense. Who else needs to be involved in this decision?

[Get names and roles]

Would it be helpful if I prepared a brief summary of our conversation and the ROI calculation to make that discussion easier?

Also, would it make sense to include them in our next call so they can ask questions directly? I'm happy to present the same information to the full team."`,

      'Closing Script': `**CLOSING SCRIPT - Moving to Decision**

**TRIAL CLOSE:**
"Based on everything we've discussed, how do you feel about moving forward with ${productToSell}?"

[Listen to response and address any concerns]

**SUMMARY CLOSE:**
"Let me summarize what we've covered:

✓ You're currently losing $[amount] per month due to [problem]
✓ ${productToSell} solves this by [solution]  
✓ This would save you $[amount] per month
✓ The ROI is [percentage]% with payback in [timeframe]
✓ Implementation takes only [time] with our support

Does this sound like a good fit for your business?"

**ASSUMPTIVE CLOSE:**
"Great! Let's get you started. I have two implementation options:

Option 1: We can begin next Monday with full setup completed by [date]
Option 2: We can start the following week if you need more time to prepare your team

Which option works better for your schedule?"

**URGENCY CLOSE (if applicable):**
"I want to mention that we're currently offering [specific bonus/discount] for clients who get started before [date]. 

This bonus is worth $[value] and would be perfect for your situation because [specific benefit].

To secure this bonus, we'd need to get your agreement today. Are you ready to move forward?"

**DIRECT CLOSE:**
"[Name], I've shown you exactly how ${productToSell} will solve [main problem] and save you $[amount] per month.

You've confirmed that [decision criteria] are all met.

What's holding you back from getting started today?"

**ALTERNATIVE CHOICE CLOSE:**
"Would you prefer to start with our [Plan A] at $[price] per month, or would our [Plan B] at $[price] per month be a better fit?"

**HANDLING FINAL HESITATION:**
"I can sense you might have one more concern. What is it?"

[Address the concern directly]

"Other than [concern addressed], is there anything else preventing you from moving forward?"

**GETTING THE COMMITMENT:**
"Perfect! Here's what happens next:

1. I'll send you the agreement to review and sign
2. Our onboarding team will contact you within 24 hours  
3. We'll schedule your setup call for [specific date]
4. You'll start seeing results within [timeframe]

Can I get your email address to send the agreement?"`,

      'Follow-up Script': `**FOLLOW-UP SCRIPT - Post-Meeting**

**IMMEDIATE FOLLOW-UP (Same Day):**

**Email Subject:** "Great meeting today - next steps for [Company Name]"

**Call Script:**
"Hi [Name], I wanted to follow up on our great conversation earlier today.

I know you mentioned you needed to [specific action they mentioned - talk to team/review budget/etc.]. 

I've put together a summary of everything we discussed, including the ROI calculation showing the $[amount] monthly savings. I'm sending that over now.

I also wanted to mention that I spoke with our implementation team, and they confirmed they can accommodate your [specific requirement mentioned].

What questions came up for you after our call?"

**[Address any questions]**

"Based on our conversation, what's the next step from your end?"

**[Listen and confirm next steps]**

"Perfect. I'll follow up with you on [specific date] to see how those conversations went. In the meantime, don't hesitate to call if any questions come up."

**FOLLOW-UP CALL #2 (3-5 days later):**

"Hi [Name], I'm following up on our conversation from [day]. You mentioned you were going to [specific action].

How did that go?"

**[If positive response]:**
"That's great to hear! What was their reaction to [specific aspect]?"
"What questions did they have?"
"What's the next step to move this forward?"

**[If need more time]:**
"No problem, I understand these decisions take time. 
What additional information would be helpful for your evaluation?
When do you expect to have a decision timeline?"

**FOLLOW-UP CALL #3 (1 week later):**

"Hi [Name], I wanted to check in one more time about ${productToSell}.

I know you were evaluating this along with [other priorities/solutions]. Where does this stand on your priority list?

[Listen to response]

Let me ask you this - if we could address [main concern], would you be ready to move forward?

What would need to happen for this to become a priority?"

**VALUE-ADD FOLLOW-UP:**

"Hi [Name], I was just thinking about our conversation about [specific challenge].

I came across an article/case study that directly relates to what you're dealing with. [Specific relevant insight]

This reminded me of your situation because [connection to their business].

I thought you might find this interesting. I'll send it over.

By the way, have you had a chance to discuss ${productToSell} with your team?"

**FINAL FOLLOW-UP:**

"Hi [Name], I've been thinking about our conversations over the past few weeks.

I realize the timing might not be right for ${productToSell} right now, and I respect that.

Let me ask you this - what would need to change in your business for this to become a priority?

[Listen to response]

Would it be helpful if I checked back with you in [timeframe] to see if anything has changed?

In the meantime, I'm always here if questions come up or if your situation changes."`
    };

    return scripts[type] || 'Script content will be generated here...';
  };

  const handleEditScript = (script: SalesScript) => {
    setSelectedScript(script);
    setEditedContent(script.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedScript) {
      setSelectedScript({
        ...selectedScript,
        content: editedContent
      });
    }
    setIsEditing(false);
  };

  const handleCopyScript = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedScript(type);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Sales Scripts Library</span>
          </CardTitle>
          <CardDescription>
            Proven phone scripts optimized for {idealCustomer?.customerIndustry || 'your target market'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {scriptTypes.map((scriptType) => {
              const script: SalesScript = {
                type: scriptType.type,
                title: scriptType.title,
                content: generateScriptContent(scriptType.type),
                description: scriptType.description,
                duration: scriptType.duration
              };

              return (
                <Card key={scriptType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm">{scriptType.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {scriptType.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scriptType.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditScript(script)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyScript(script.content, script.type)}
                      >
                        {copiedScript === script.type ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Script Modal */}
      {isEditing && selectedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Script: {selectedScript.title}</CardTitle>
            <CardDescription>
              Customize this script for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Script Title</Label>
              <Input
                id="title"
                value={selectedScript.title}
                onChange={(e) => setSelectedScript({
                  ...selectedScript,
                  title: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="content">Script Content</Label>
              <Textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesScriptsGenerator;
