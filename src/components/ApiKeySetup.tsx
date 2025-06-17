
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Key, CheckCircle, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MarketingIntelligenceService } from '@/services/MarketingIntelligenceService';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
  existingApiKey?: string | null;
  isVisible?: boolean;
}

const ApiKeySetup = ({ onApiKeySet, existingApiKey, isVisible = false }: ApiKeySetupProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(existingApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    if (!isValidApiKey) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key (starts with 'sk-')",
        variant: "destructive"
      });
      return;
    }
    
    setIsValidating(true);
    try {
      // Save the API key
      MarketingIntelligenceService.saveApiKey(apiKey.trim());
      
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully",
      });
      
      onApiKeySet();
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error Saving API Key",
        description: "There was an error saving your API key. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const isValidApiKey = apiKey.trim().startsWith('sk-') && apiKey.trim().length > 20;

  const content = (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-primary" />
          <CardTitle>OpenAI API Configuration</CardTitle>
          {existingApiKey && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>Configured</span>
            </Badge>
          )}
        </div>
        <CardDescription>
          Set up your OpenAI API key to enable AI-powered competitor analysis and marketing strategy generation.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Your API key is stored locally in your browser and is only used to make requests to OpenAI's API.
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 ml-2 text-primary hover:underline"
            >
              <span>Get your API key here</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            OpenAI API Key
          </label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {apiKey && !isValidApiKey && (
            <p className="text-sm text-destructive">
              Please enter a valid OpenAI API key (starts with 'sk-')
            </p>
          )}
        </div>

        <Button 
          onClick={handleSaveApiKey}
          disabled={!isValidApiKey || isValidating}
          className="w-full"
        >
          {isValidating ? 'Saving...' : existingApiKey ? 'Update API Key' : 'Save API Key'}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Your API key is stored securely in your browser's local storage</p>
          <p>• We recommend using a dedicated API key with usage limits</p>
          <p>• API costs are typically $0.01-0.05 per analysis depending on complexity</p>
        </div>
      </CardContent>
    </Card>
  );

  if (isVisible) {
    return (
      <Dialog open={isVisible} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>API Key Setup Required</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
};

export default ApiKeySetup;
