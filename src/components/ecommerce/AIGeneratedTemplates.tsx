
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Download, 
  RefreshCw, 
  Palette, 
  Type, 
  Wand2, 
  Monitor, 
  Tablet, 
  Smartphone,
  Copy,
  Edit3
} from 'lucide-react';

interface AITemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  colorPalette: string;
  fontStyle: string;
  layoutStyle: string;
  preview: string;
  files: {
    [filename: string]: string;
  };
  responsive: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  features: string[];
}

interface AIGeneratedTemplatesProps {
  templates: AITemplate[];
  onPreview: (template: AITemplate) => void;
  onDownload: (template: AITemplate) => void;
  onRegenerate: (templateId: string) => void;
  onCustomizeStyle: (templateId: string, styleType: 'color' | 'font' | 'layout') => void;
  onEditContent: (templateId: string, section: string) => void;
}

const AIGeneratedTemplates = ({
  templates,
  onPreview,
  onDownload,
  onRegenerate,
  onCustomizeStyle,
  onEditContent
}: AIGeneratedTemplatesProps) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  if (templates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5" />
            <span>AI Generated Templates</span>
          </CardTitle>
          <CardDescription>
            Your AI-generated templates will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <Wand2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Ready for AI Magic</h3>
            <p className="text-muted-foreground mb-4">
              Use the AI Template Generator to create your first design
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center space-x-2">
                  <span>{template.name}</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    AI Generated
                  </Badge>
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
                
                {/* Template Metadata */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Palette className="h-3 w-3 mr-1" />
                    {template.colorPalette}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Type className="h-3 w-3 mr-1" />
                    {template.fontStyle}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.layoutStyle}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Original Prompt */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <Label className="text-xs font-medium text-muted-foreground">ORIGINAL PROMPT</Label>
              <p className="text-sm mt-1 italic">"{template.prompt}"</p>
            </div>

            {/* Responsive Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Responsive Preview</Label>
                <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
                  <Button
                    size="sm"
                    variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
                    onClick={() => setActiveDevice('desktop')}
                    className="h-8 px-2"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
                    onClick={() => setActiveDevice('tablet')}
                    className="h-8 px-2"
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
                    onClick={() => setActiveDevice('mobile')}
                    className="h-8 px-2"
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[200px] relative">
                <div className="absolute inset-4 bg-white rounded border shadow-sm overflow-hidden">
                  <div className="p-4 text-center text-muted-foreground">
                    <div className="text-sm mb-2">Preview for {activeDevice}</div>
                    <div className="text-xs">Interactive preview would load here</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Features */}
            <div className="space-y-2">
              <Label className="font-medium">AI-Generated Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => onPreview(template)}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Live Preview</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onDownload(template)}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onRegenerate(template.id)}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onCustomizeStyle(template.id, 'color')}
                className="flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span>Shuffle Colors</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onCustomizeStyle(template.id, 'font')}
                className="flex items-center space-x-2"
              >
                <Type className="h-4 w-4" />
                <span>Change Fonts</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onEditContent(template.id, 'headline')}
                className="flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Content</span>
              </Button>
            </div>

            {/* Quick Actions for Sections */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">Quick Customization</h5>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  ✨ Regenerate Hero Section
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  🎨 Change Color Scheme
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  📝 Rewrite Copy with AI
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  🌍 Translate to Another Language
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AIGeneratedTemplates;
