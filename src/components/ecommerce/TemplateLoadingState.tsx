
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TemplateLoadingStateProps {
  businessName: string;
}

const TemplateLoadingState = ({ businessName }: TemplateLoadingStateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generating Your Website Templates</CardTitle>
        <CardDescription>Creating 5 personalized templates for {businessName}...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">This may take a few moments...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateLoadingState;
