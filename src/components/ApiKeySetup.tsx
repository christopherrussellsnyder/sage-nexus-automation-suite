
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, ExternalLink, Shield, Zap } from 'lucide-react';
import { AIIntelligenceService } from '@/services/AIIntelligenceService';
import { useToast } from '@/components/ui/use-toast';

interface ApiKeySetupProps {
  isVisible: boolean;
  onApiKeySet: () => void;
}

const ApiKeySetup = ({ isVisible, onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Invalid API Key Format",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Validate the API key by making a simple request
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid API key');
      }

      // Save the API key
      AIIntelligenceService.saveApiKey(apiKey);
      
      toast({
        title: "API Key Saved Successfully",
        description: "You can now generate AI-powered intelligence reports",
      });
      
      onApiKeySet();
    } catch (error) {
      toast({
        title: "Invalid API Key",
        description: "Please check your OpenAI API key and try again",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSkip = () => {
    onApiKeySet();
  };

  return (
    <Dialog open={isVisible} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>OpenAI API Key Setup</span>
          </DialogTitle>
          <DialogDescription>
            Connect your OpenAI API key to unlock AI-powered, personalized intelligence reports
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>AI-Enhanced Intelligence</span>
              </CardTitle>
              <CardDescription>
                Upgrade from template-based to AI-generated personalized content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">✓ With AI Integration:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Fully personalized content for your business</li>
                    <li>• Industry-specific insights and strategies</li>
                    <li>• Dynamic competitor analysis</li>
                    <li>• Contextual optimization recommendations</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-600">⚠ Without AI (Template Mode):</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Generic template-based content</li>
                    <li>• Limited personalization</li>
                    <li>• Basic placeholder insights</li>
                    <li>• Standard recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Key Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>OpenAI API Key</span>
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <ExternalLink className="h-4 w-4" />
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Get your OpenAI API key here
              </a>
            </div>
          </div>

          {/* Cost Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="text-sm">
                <h4 className="font-semibold text-blue-800 mb-2">Estimated API Costs:</h4>
                <div className="space-y-1 text-blue-700">
                  <p>• Full Intelligence Report: ~$0.05-0.08 per generation</p>
                  <p>• Copywriting Report: ~$0.02-0.03 per generation</p>
                  <p>• Marketing Report: ~$0.03-0.04 per generation</p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Costs are charged directly to your OpenAI account
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={handleSaveApiKey} 
              disabled={isValidating}
              className="flex-1"
            >
              {isValidating ? 'Validating...' : 'Save API Key & Enable AI'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
            >
              Continue with Templates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySetup;
