
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  ListOrdered,
  Eye,
  Save,
  X,
  Plus,
  Smartphone,
  Monitor,
  BarChart3,
  Zap,
  Copy
} from 'lucide-react';
import { EnhancedEmailTemplate } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';

interface AdvancedEmailEditorProps {
  email: EnhancedEmailTemplate;
  onSave: (email: EnhancedEmailTemplate) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const AdvancedEmailEditor = ({ email, onSave, onCancel, isOpen }: AdvancedEmailEditorProps) => {
  const [editedEmail, setEditedEmail] = useState<EnhancedEmailTemplate>(email);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedEmail(email);
  }, [email]);

  useEffect(() => {
    const analysis = EmailSequenceAIService.analyzeEmailContent(editedEmail.body);
    setEditedEmail(prev => ({
      ...prev,
      wordCount: analysis.wordCount,
      readabilityScore: analysis.readabilityScore,
      personalizations: analysis.personalizations
    }));
  }, [editedEmail.body]);

  const handleSave = () => {
    onSave(editedEmail);
  };

  const formatText = (format: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = editedEmail.body.substring(start, end);
      
      let formattedText = '';
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        case 'link':
          formattedText = `[${selectedText}](url)`;
          break;
        case 'list':
          formattedText = `\n• ${selectedText}`;
          break;
        case 'numbered':
          formattedText = `\n1. ${selectedText}`;
          break;
        default:
          formattedText = selectedText;
      }
      
      const newBody = editedEmail.body.substring(0, start) + formattedText + editedEmail.body.substring(end);
      setEditedEmail(prev => ({ ...prev, body: newBody }));
    }
  };

  const insertPersonalizationTag = (tag: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newBody = editedEmail.body.substring(0, start) + tag + editedEmail.body.substring(end);
      setEditedEmail(prev => ({ ...prev, body: newBody }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + tag.length, start + tag.length);
      }, 0);
    }
  };

  const addSubjectVariant = () => {
    const newVariant = `${editedEmail.subject} - Variant ${(editedEmail.abTestVariants?.subjectVariants.length || 0) + 1}`;
    setEditedEmail(prev => ({
      ...prev,
      abTestVariants: {
        ...prev.abTestVariants,
        subjectVariants: [...(prev.abTestVariants?.subjectVariants || []), newVariant],
        bodyVariants: prev.abTestVariants?.bodyVariants || []
      }
    }));
  };

  const removeSubjectVariant = (index: number) => {
    setEditedEmail(prev => ({
      ...prev,
      abTestVariants: {
        ...prev.abTestVariants,
        subjectVariants: prev.abTestVariants?.subjectVariants.filter((_, i) => i !== index) || [],
        bodyVariants: prev.abTestVariants?.bodyVariants || []
      }
    }));
  };

  const getWordCountColor = () => {
    if (editedEmail.wordCount < 300) return 'text-red-600';
    if (editedEmail.wordCount > 1200) return 'text-orange-600';
    return 'text-green-600';
  };

  const getReadabilityColor = () => {
    if (editedEmail.readabilityScore >= 80) return 'text-green-600';
    if (editedEmail.readabilityScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const personalizationTags = [
    '[FIRST_NAME]', '[LAST_NAME]', '[COMPANY_NAME]', '[INDUSTRY]',
    '[SENDER_NAME]', '[SENDER_TITLE]', '[PRODUCT_NAME]', '[CITY]'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Advanced Email Editor</span>
            <Badge variant="outline">{editedEmail.type}</Badge>
            <Badge variant="secondary">Day {editedEmail.sequenceDay}</Badge>
          </DialogTitle>
          <DialogDescription>
            Create compelling, high-converting email content with advanced editing tools
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[80vh]">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => formatText('bold')}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => formatText('italic')}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => formatText('underline')}>
                <Underline className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => formatText('link')}>
                <Link className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => formatText('list')}>
                <List className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => formatText('numbered')}>
                <ListOrdered className="h-4 w-4" />
              </Button>

              {/* Personalization Tags */}
              <div className="flex items-center space-x-1 ml-4 border-l pl-4">
                {personalizationTags.slice(0, 4).map(tag => (
                  <Button 
                    key={tag} 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => insertPersonalizationTag(tag)}
                    className="text-xs"
                  >
                    {tag.replace(/[\[\]]/g, '')}
                  </Button>
                ))}
                <Button size="sm" variant="outline" onClick={() => setShowAnalytics(!showAnalytics)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant={previewMode === 'desktop' ? 'default' : 'outline'} 
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant={previewMode === 'mobile' ? 'default' : 'outline'} 
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowAnalytics(!showAnalytics)}>
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Editor Panel */}
            <div className="flex-1 flex flex-col border-r">
              <Tabs defaultValue="content" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="subject">Subject & Settings</TabsTrigger>
                  <TabsTrigger value="variants">A/B Testing</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="flex-1 flex flex-col p-4">
                  <div className="flex-1">
                    <Label htmlFor="emailBody">Email Body</Label>
                    <Textarea
                      ref={textareaRef}
                      id="emailBody"
                      value={editedEmail.body}
                      onChange={(e) => setEditedEmail(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="Write your email content..."
                      className="w-full flex-1 min-h-[400px] mt-2 font-mono text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="subject" className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={editedEmail.subject}
                      onChange={(e) => setEditedEmail(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Compelling subject line..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preheader">Preheader Text</Label>
                    <Input
                      id="preheader"
                      value={editedEmail.preheader}
                      onChange={(e) => setEditedEmail(prev => ({ ...prev, preheader: e.target.value }))}
                      placeholder="Preview text that appears after subject..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cta">Call to Action</Label>
                    <Input
                      id="cta"
                      value={editedEmail.cta}
                      onChange={(e) => setEditedEmail(prev => ({ ...prev, cta: e.target.value }))}
                      placeholder="Clear action you want them to take..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timing">Send Timing</Label>
                    <Input
                      id="timing"
                      value={editedEmail.timing}
                      onChange={(e) => setEditedEmail(prev => ({ ...prev, timing: e.target.value }))}
                      placeholder="e.g., Day 3, 2 days after signup"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="variants" className="flex-1 p-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Subject Line Variants</Label>
                      <Button size="sm" onClick={addSubjectVariant}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variant
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {editedEmail.abTestVariants?.subjectVariants.map((variant, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={variant}
                            onChange={(e) => {
                              const newVariants = [...(editedEmail.abTestVariants?.subjectVariants || [])];
                              newVariants[index] = e.target.value;
                              setEditedEmail(prev => ({
                                ...prev,
                                abTestVariants: {
                                  ...prev.abTestVariants,
                                  subjectVariants: newVariants,
                                  bodyVariants: prev.abTestVariants?.bodyVariants || []
                                }
                              }));
                            }}
                            placeholder={`Subject variant ${index + 1}`}
                          />
                          <Button size="sm" variant="outline" onClick={() => removeSubjectVariant(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Email Preview</h3>
                <p className="text-sm text-muted-foreground">
                  {previewMode === 'desktop' ? 'Desktop' : 'Mobile'} view
                </p>
              </div>
              
              <div className={`flex-1 p-4 overflow-auto ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="text-sm font-medium">{editedEmail.subject}</div>
                    <div className="text-xs text-muted-foreground mt-1">{editedEmail.preheader}</div>
                  </div>
                  <div className="p-4">
                    <div className="prose max-w-none text-sm">
                      <div className="whitespace-pre-wrap">{editedEmail.body}</div>
                    </div>
                    {editedEmail.cta && (
                      <div className="mt-4">
                        <Button className="w-full">{editedEmail.cta}</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Panel (Collapsible) */}
          {showAnalytics && (
            <div className="border-t bg-gray-50 p-4">
              <div className="grid grid-cols-5 gap-4 text-sm">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getWordCountColor()}`}>
                    {editedEmail.wordCount}
                  </div>
                  <div className="text-muted-foreground">Words</div>
                  <div className="text-xs text-muted-foreground">Target: 500-800</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getReadabilityColor()}`}>
                    {editedEmail.readabilityScore}
                  </div>
                  <div className="text-muted-foreground">Readability</div>
                  <div className="text-xs text-muted-foreground">Score/100</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {editedEmail.personalizations.length}
                  </div>
                  <div className="text-muted-foreground">Tags</div>
                  <div className="text-xs text-muted-foreground">Personalization</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {editedEmail.abTestVariants?.subjectVariants.length || 0}
                  </div>
                  <div className="text-muted-foreground">Variants</div>
                  <div className="text-xs text-muted-foreground">A/B Tests</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {editedEmail.psychologicalTriggers.length}
                  </div>
                  <div className="text-muted-foreground">Triggers</div>
                  <div className="text-xs text-muted-foreground">Psychology</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Auto-saved 30 seconds ago</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedEmailEditor;
