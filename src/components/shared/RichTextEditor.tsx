
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  ListOrdered,
  Quote,
  Code,
  Type,
  Eye,
  Save,
  X,
  Plus
} from 'lucide-react';
import { EmailSequenceService } from '@/services/EmailSequenceService';
import { PersonalizationTag } from '@/types/emailSequence';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  type?: 'agency' | 'sales';
  showPersonalizationTags?: boolean;
}

const RichTextEditor = ({ 
  content, 
  onChange, 
  onSave, 
  onCancel, 
  placeholder = "Write your email content...",
  type = 'sales',
  showPersonalizationTags = true
}: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [personalizationTags] = useState<PersonalizationTag[]>(
    EmailSequenceService.getPersonalizationTags(type)
  );

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    setCharCount(content.length);
  }, [content]);

  const insertTag = (tag: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + tag + content.substring(end);
      onChange(newContent);
      
      // Reset cursor position after tag insertion
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + tag.length, start + tag.length);
      }, 0);
    }
  };

  const formatText = (format: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      
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
        case 'quote':
          formattedText = `\n> ${selectedText}`;
          break;
        default:
          formattedText = selectedText;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      onChange(newContent);
    }
  };

  const getReadabilityScore = () => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = wordCount;
    const avgWordsPerSentence = words / sentences || 0;
    
    if (avgWordsPerSentence < 15) return { score: 'Easy', color: 'text-green-600' };
    if (avgWordsPerSentence < 20) return { score: 'Medium', color: 'text-yellow-600' };
    return { score: 'Hard', color: 'text-red-600' };
  };

  const readability = getReadabilityScore();

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
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
          <Button size="sm" variant="outline" onClick={() => formatText('quote')}>
            <Quote className="h-4 w-4" />
          </Button>
          
          {showPersonalizationTags && (
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Tags
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Personalization Tags</h4>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {personalizationTags.map((tag) => (
                      <div key={tag.tag} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <Badge variant="outline" className="text-xs">{tag.tag}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{tag.description}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => insertTag(tag.tag)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant={isPreview ? 'default' : 'outline'} 
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          {onSave && (
            <Button size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          )}
          {onCancel && (
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {isPreview ? (
          <div className="min-h-[400px] prose max-w-none">
            <div className="whitespace-pre-wrap">{content}</div>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-0 border-none resize-none focus:outline-none focus:ring-0"
            style={{ fontFamily: 'inherit' }}
          />
        )}
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between p-3 border-t bg-gray-50 text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span className={readability.color}>
            Readability: {readability.score}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={wordCount >= 300 && wordCount <= 800 ? 'text-green-600' : 'text-orange-600'}>
            Target: 300-800 words
          </span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
