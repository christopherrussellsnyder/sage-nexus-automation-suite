
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const TemplateEmptyState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Templates</CardTitle>
        <CardDescription>Generate your website details first to see personalized templates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Complete the website builder form to generate your custom templates</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateEmptyState;
