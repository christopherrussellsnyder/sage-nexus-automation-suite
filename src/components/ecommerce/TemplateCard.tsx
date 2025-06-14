
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';
import { Template, WebsiteData } from './TemplateGenerator';

interface TemplateCardProps {
  template: Template;
  websiteData: WebsiteData;
  onPreview: (template: Template) => void;
  onDownload: (template: Template) => void;
}

const TemplateCard = ({ template, websiteData, onPreview, onDownload }: TemplateCardProps) => {
  return (
    <Card className="border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{template.name}</span>
              <Badge variant="secondary">Ready</Badge>
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Template Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Responsive design optimized for all devices</li>
              <li>• Professional styling matching your brand</li>
              <li>• Multiple pages (Home, About, Services, Contact)</li>
              <li>• Interactive elements and smooth animations</li>
              <li>• SEO-friendly structure and clean code</li>
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={() => onPreview(template)}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview Live Demo</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onDownload(template)}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Files</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
