
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Plus, Edit, Trash2, Clock, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  type: 'welcome' | 'social-proof' | 'education' | 'connection' | 'objection' | 'offer' | 'final';
  subject: string;
  content: string;
  timing: string;
  conversionRate: number;
}

interface EmailSequence {
  id: string;
  name: string;
  type: 'universal' | 'abandoned-cart' | 'lead-nurture' | 're-engagement';
  emails: EmailTemplate[];
  status: 'draft' | 'active' | 'paused';
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
}

const EmailSequenceBuilder = () => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<EmailSequence | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState<EmailTemplate | null>(null);
  const [newSequence, setNewSequence] = useState({
    name: '',
    type: 'universal',
    description: ''
  });
  const { toast } = useToast();

  const sequenceTemplates = {
    'universal': {
      name: '7-Email Universal Framework',
      description: 'High-converting sequence based on data-driven analysis',
      emails: [
        {
          name: 'Immediate Welcome',
          type: 'welcome' as const,
          subject: 'Welcome! Here\'s your [PROMISED ITEM] 🎁',
          timing: '0-15 minutes',
          conversionRate: 45.7,
          content: `Thank you for joining us!

Here's your promised content as mentioned: [CONTENT LINK]

Over the next few days, I'll be sharing:
• Proven strategies that work
• Real case studies and results
• Actionable tips you can implement today

Make sure to whitelist this email so you don't miss anything important.

Best regards,
[YOUR NAME]

P.S. Hit reply and let me know what your biggest challenge is right now!`
        },
        {
          name: 'Social Proof Story',
          type: 'social-proof' as const,
          subject: 'How [Customer Name] got [Specific Result] in [Timeframe]',
          timing: '24 hours',
          conversionRate: 38.2,
          content: `I want to share an incredible success story with you...

[Customer Name] was struggling with [PROBLEM] just like you might be.

Here's exactly what happened:
• Started with: [INITIAL SITUATION]
• Implemented: [SOLUTION/STRATEGY]
• Result: [SPECIFIC OUTCOME] in just [TIMEFRAME]

The best part? [Customer Name] said: "[TESTIMONIAL QUOTE]"

This could be you. The same strategy that worked for [Customer Name] is available to you too.

[CTA: See More Success Stories]

Talk soon,
[YOUR NAME]`
        },
        {
          name: 'Educational Authority',
          type: 'education' as const,
          subject: 'The #1 mistake [Target Audience] makes with [Topic]',
          timing: '48 hours',
          conversionRate: 42.1,
          content: `Here's a shocking statistic: [RELEVANT STAT]

Most [TARGET AUDIENCE] make this critical mistake: [MISTAKE]

This costs them [CONSEQUENCE] and prevents them from [DESIRED OUTCOME].

Here's what to do instead:

1. [ACTIONABLE TIP 1]
2. [ACTIONABLE TIP 2]  
3. [ACTIONABLE TIP 3]

Pro tip: [ADVANCED INSIGHT]

This is just the beginning. There's so much more I want to share with you.

[CTA: Get the Full Guide]

Best,
[YOUR NAME]`
        },
        {
          name: 'Personal Connection',
          type: 'connection' as const,
          subject: 'The story behind [Brand/Product] (personal)',
          timing: '3 days',
          conversionRate: 35.8,
          content: `I want to share something personal with you...

[PERSONAL STORY/STRUGGLE]

That's why I created [SOLUTION]. I knew there had to be a better way.

My mission is simple: [YOUR MISSION]

This isn't just business for me - it's personal.

I'd love to connect with you on a deeper level:
• Follow me on [SOCIAL PLATFORM]: [LINK]
• Check out behind-the-scenes content: [LINK]

Hit reply and tell me your story. I read every email.

Cheering you on,
[YOUR NAME]`
        },
        {
          name: 'Objection Handler',
          type: 'objection' as const,
          subject: 'But what if [Common Objection]?',
          timing: '5 days',
          conversionRate: 39.4,
          content: `I know what you might be thinking...

"[COMMON OBJECTION]"

I get it. I used to think the same thing.

Let me address your concerns:

Concern #1: [OBJECTION]
Reality: [PROOF/EVIDENCE]

Concern #2: [OBJECTION]  
Reality: [PROOF/EVIDENCE]

Concern #3: [OBJECTION]
Reality: [PROOF/EVIDENCE]

Plus, you're protected by our [GUARANTEE/RISK REVERSAL].

Ready to see how this works? [CTA: Learn More]

Your success partner,
[YOUR NAME]`
        },
        {
          name: 'Direct Offer',
          type: 'offer' as const,
          subject: 'Ready? Here\'s exactly how I can help you [Achieve Goal]',
          timing: '7 days',
          conversionRate: 18.6,
          content: `After everything I've shared, you're probably wondering...

"How can I get the same results?"

Here's exactly how I can help you [ACHIEVE SPECIFIC GOAL]:

[CLEAR OFFER DESCRIPTION]

What you get:
• [BENEFIT 1]
• [BENEFIT 2]
• [BENEFIT 3]
• [BONUS ITEM]

Normal price: [REGULAR PRICE]
Your price today: [DISCOUNTED PRICE]

This offer expires in 48 hours.

[CTA: Get Started Now]

Only [X] spots available.

Ready to transform your [AREA]?

[YOUR NAME]

P.S. Remember, you're backed by our [GUARANTEE].`
        },
        {
          name: 'Final Chance',
          type: 'final' as const,
          subject: 'Have you given up on [Their Goal]?',
          timing: '10 days',
          conversionRate: 15.2,
          content: `I noticed you haven't taken action yet...

Have you given up on [THEIR GOAL]?

I hope not, because it's still 100% possible for you.

Look, I know life gets busy. I know there are always obstacles.

But here's the truth: [MOTIVATIONAL TRUTH]

This is your last chance to join [PROGRAM/OFFER] at this price.

After tonight, this opportunity disappears.

[CTA: No, I Haven't Given Up]

If you're not ready, no worries. Just hit reply and let me know what's holding you back.

In your corner,
[YOUR NAME]

P.S. Your goals matter. Don't let them slip away.`
        }
      ]
    },
    'abandoned-cart': {
      name: 'Abandoned Cart Recovery (18.64% CR)',
      description: 'Highest converting sequence for e-commerce',
      emails: [
        {
          name: 'Gentle Reminder',
          type: 'welcome' as const,
          subject: 'Oops! You left something behind...',
          timing: '1 hour',
          conversionRate: 8.2,
          content: `Hi [NAME],

I noticed you left some items in your cart:

[CART ITEMS WITH IMAGES]

Don't worry, we saved everything for you!

Complete your order in just one click: [COMPLETE ORDER BUTTON]

Questions? Just reply to this email.

Best,
[STORE NAME] Team`
        },
        {
          name: 'Social Proof',
          type: 'social-proof' as const,
          subject: 'Still thinking about [Product Name]?',
          timing: '24 hours',
          conversionRate: 6.4,
          content: `Hi [NAME],

Still considering [PRODUCT NAME]?

Here's what other customers say:

⭐⭐⭐⭐⭐ "[REVIEW 1]" - [CUSTOMER NAME]
⭐⭐⭐⭐⭐ "[REVIEW 2]" - [CUSTOMER NAME]

[PRODUCT BENEFITS]

Your items are still waiting: [COMPLETE ORDER]

[STORE NAME]`
        },
        {
          name: 'Urgency + Discount',
          type: 'offer' as const,
          subject: 'Last chance: [Product] selling fast + 10% OFF',
          timing: '48 hours',
          conversionRate: 12.8,
          content: `[NAME], time is running out!

Your cart expires in 6 hours, and we're almost sold out of:
[PRODUCT NAME] - Only [X] left!

But wait... I have something special for you:

Use code SAVE10 for 10% off your entire order!

[COMPLETE ORDER WITH DISCOUNT]

This offer expires tonight.

Hurry!
[STORE NAME]`
        },
        {
          name: 'Final Attempt',
          type: 'final' as const,
          subject: 'We saved [Product] for you (last email)',
          timing: '1 week',
          conversionRate: 4.1,
          content: `Hi [NAME],

This is my last email about your abandoned cart.

We've saved [PRODUCT NAME] for you, but we can't hold it much longer.

If you're not interested, no problem! 

But maybe you'd like these similar items instead:
[RECOMMENDED PRODUCTS]

Or simply reply and let us know how we can help.

Thanks for considering us!
[STORE NAME]`
        }
      ]
    }
  };

  const createSequence = () => {
    if (!newSequence.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sequence name",
        variant: "destructive",
      });
      return;
    }

    const template = sequenceTemplates[newSequence.type as keyof typeof sequenceTemplates];
    
    const sequence: EmailSequence = {
      id: Date.now().toString(),
      name: newSequence.name,
      type: newSequence.type as EmailSequence['type'],
      emails: template.emails.map((email, index) => ({
        id: `${Date.now()}-${index}`,
        ...email
      })),
      status: 'draft',
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0
      }
    };

    setSequences([...sequences, sequence]);
    setNewSequence({ name: '', type: 'universal', description: '' });
    setIsCreating(false);

    toast({
      title: "Sequence Created",
      description: `${sequence.name} has been created with ${sequence.emails.length} emails`,
    });
  };

  const toggleSequenceStatus = (sequenceId: string) => {
    setSequences(sequences.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
        : seq
    ));
  };

  const deleteSequence = (sequenceId: string) => {
    setSequences(sequences.filter(seq => seq.id !== sequenceId));
    if (selectedSequence?.id === sequenceId) {
      setSelectedSequence(null);
    }
    toast({
      title: "Sequence Deleted",
      description: "Email sequence has been removed",
    });
  };

  const updateEmailContent = (emailId: string, updates: Partial<EmailTemplate>) => {
    if (!selectedSequence) return;

    const updatedSequence = {
      ...selectedSequence,
      emails: selectedSequence.emails.map(email =>
        email.id === emailId ? { ...email, ...updates } : email
      )
    };

    setSequences(sequences.map(seq =>
      seq.id === selectedSequence.id ? updatedSequence : seq
    ));
    setSelectedSequence(updatedSequence);
    
    toast({
      title: "Email Updated",
      description: "Email content has been saved",
    });
  };

  const handleEditEmail = (email: EmailTemplate) => {
    setEditingEmail(email);
    setIsEditing(true);
  };

  const saveEmailEdits = () => {
    if (!editingEmail) return;
    
    updateEmailContent(editingEmail.id, editingEmail);
    setIsEditing(false);
    setEditingEmail(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Sequence Builder</span>
              </CardTitle>
              <CardDescription>
                Create high-converting email sequences based on proven frameworks
              </CardDescription>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sequence
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Email Sequence</DialogTitle>
                  <DialogDescription>
                    Choose a proven framework to start with
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Sequence Name</Label>
                    <Input
                      id="name"
                      value={newSequence.name}
                      onChange={(e) => setNewSequence({ ...newSequence, name: e.target.value })}
                      placeholder="Welcome Series"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Framework Type</Label>
                    <Select value={newSequence.type} onValueChange={(value) => setNewSequence({ ...newSequence, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="universal">7-Email Universal Framework</SelectItem>
                        <SelectItem value="abandoned-cart">Abandoned Cart Recovery (18.64% CR)</SelectItem>
                        <SelectItem value="lead-nurture">Lead Nurture Sequence</SelectItem>
                        <SelectItem value="re-engagement">Re-engagement Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">
                      {sequenceTemplates[newSequence.type as keyof typeof sequenceTemplates]?.name}
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      {sequenceTemplates[newSequence.type as keyof typeof sequenceTemplates]?.description}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Includes {sequenceTemplates[newSequence.type as keyof typeof sequenceTemplates]?.emails.length} pre-written emails
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={createSequence} className="flex-1">Create Sequence</Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Sequences List */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Email Sequences</h3>
            <p className="text-muted-foreground mb-4">
              Create your first high-converting email sequence using proven frameworks
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Sequence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sequences List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Sequences</h3>
            {sequences.map((sequence) => (
              <Card key={sequence.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{sequence.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{sequence.type.replace('-', ' ')} • {sequence.emails.length} emails</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={sequence.status === 'active' ? 'default' : sequence.status === 'paused' ? 'secondary' : 'outline'}>
                        {sequence.status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setSelectedSequence(sequence)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{sequence.stats.sent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{sequence.stats.opened}</p>
                      <p className="text-xs text-muted-foreground">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{sequence.stats.clicked}</p>
                      <p className="text-xs text-muted-foreground">Clicked</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{sequence.stats.converted}</p>
                      <p className="text-xs text-muted-foreground">Converted</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      size="sm" 
                      variant={sequence.status === 'active' ? 'secondary' : 'default'}
                      onClick={() => toggleSequenceStatus(sequence.id)}
                      className="flex-1"
                    >
                      {sequence.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteSequence(sequence.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sequence Editor */}
          {selectedSequence && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedSequence.name}</h3>
                <Button variant="outline" onClick={() => setSelectedSequence(null)}>
                  Close Editor
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
                  <Tabs defaultValue="emails">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="emails">Email Templates</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="emails" className="space-y-4 mt-4">
                      {selectedSequence.emails.map((email, index) => (
                        <Card key={email.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-base">Email {index + 1}: {email.name}</CardTitle>
                                <CardDescription>
                                  <Badge variant="outline" className="mr-2">{email.timing}</Badge>
                                  <Badge variant="secondary">{email.conversionRate}% CR</Badge>
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                           <CardContent className="pt-0">
                             <div className="space-y-3">
                               <div>
                                 <Label className="text-xs font-medium">Subject Line:</Label>
                                 <p className="text-sm bg-gray-50 p-2 rounded">{email.subject}</p>
                               </div>
                               <div>
                                 <Label className="text-xs font-medium">Content Preview:</Label>
                                 <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded max-h-32 overflow-hidden">
                                   {email.content.substring(0, 200)}...
                                 </p>
                               </div>
                               <Button 
                                 size="sm" 
                                 variant="outline" 
                                 onClick={() => handleEditEmail(email)}
                                 className="mt-2"
                               >
                                 <Edit className="h-3 w-3 mr-1" />
                                 Edit Content
                               </Button>
                             </div>
                           </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="performance" className="mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="text-2xl font-bold">{selectedSequence.stats.sent}</p>
                                <p className="text-sm text-muted-foreground">Total Sent</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-5 w-5 text-green-500" />
                              <div>
                                <p className="text-2xl font-bold">
                                  {selectedSequence.stats.sent > 0 
                                    ? Math.round((selectedSequence.stats.converted / selectedSequence.stats.sent) * 100)
                                    : 0}%
                                </p>
                                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Email Editor Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Email: {editingEmail?.name}</DialogTitle>
            <DialogDescription>
              Customize the email content and subject line
            </DialogDescription>
          </DialogHeader>
          {editingEmail && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editSubject">Subject Line</Label>
                <Input
                  id="editSubject"
                  value={editingEmail.subject}
                  onChange={(e) => setEditingEmail({ ...editingEmail, subject: e.target.value })}
                  placeholder="Email subject line"
                />
              </div>
              <div>
                <Label htmlFor="editContent">Email Content</Label>
                <Textarea
                  id="editContent"
                  value={editingEmail.content}
                  onChange={(e) => setEditingEmail({ ...editingEmail, content: e.target.value })}
                  placeholder="Email content..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={saveEmailEdits} className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSequenceBuilder;
