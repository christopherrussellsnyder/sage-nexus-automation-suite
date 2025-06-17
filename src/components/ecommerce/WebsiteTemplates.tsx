
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateLovableStyleTemplates, Template, WebsiteData } from './TemplateGenerator';
import TemplateEmptyState from './TemplateEmptyState';
import TemplateLoadingState from './TemplateLoadingState';
import TemplateCard from './TemplateCard';

interface WebsiteTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
  websiteData: WebsiteData | null;
  isGenerated: boolean;
}

const WebsiteTemplates = ({ 
  templates, 
  onSelectTemplate, 
  onPreviewTemplate, 
  websiteData, 
  isGenerated 
}: WebsiteTemplatesProps) => {
  const [generatedTemplates, setGeneratedTemplates] = useState<Template[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate templates when websiteData is available
  useEffect(() => {
    if (websiteData && isGenerated && generatedTemplates.length === 0) {
      setIsGenerating(true);
      setTimeout(() => {
        const newTemplates = generateLovableStyleTemplates(websiteData);
        setGeneratedTemplates(newTemplates);
        setIsGenerating(false);
      }, 1000);
    }
  }, [websiteData, isGenerated, generatedTemplates.length]);

  const handlePreview = (template: Template) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(template.preview);
      newWindow.document.close();
    }
  };

  const handleDownload = (template: Template) => {
    // Create a zip-like structure by downloading individual files
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${websiteData?.businessName || 'website'}-${template.name.toLowerCase().replace(/\s+/g, '-')}-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  if (!websiteData) {
    return <TemplateEmptyState />;
  }

  if (isGenerating) {
    return <TemplateLoadingState businessName={websiteData.businessName} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Website Templates</CardTitle>
        <CardDescription>5 professional templates customized for {websiteData.businessName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {generatedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              websiteData={websiteData}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteTemplates;
