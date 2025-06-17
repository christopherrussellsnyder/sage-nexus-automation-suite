
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, ExternalLink } from 'lucide-react';
import { CompetitorAnalysisService } from '@/services/CompetitorAnalysisService';

interface ApiKeySetupProps {
  isVisible: boolean;
  onApiKeySet: () => void;
}

const ApiKeySetup = ({ isVisible, onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Perplexity API key');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Test the API key with a simple request
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            { role: 'user', content: 'Test connection' }
          ],
          max_tokens: 10
        }),
      });

      if (response.ok) {
        CompetitorAnalysisService.saveApiKey(apiKey);
        onApiKeySet();
      } else {
        setError('Invalid API key. Please check and try again.');
      }
    } catch (error) {
      setError('Failed to validate API key. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Setup Perplexity API Key</span>
          </DialogTitle>
          <DialogDescription>
            To use the competitor analysis and marketing intelligence features, you need a Perplexity API key.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Perplexity API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="pplx-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">
              <strong>How to get your API key:</strong>
            </p>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Visit the Perplexity API dashboard</li>
              <li>Create an account or sign in</li>
              <li>Generate a new API key</li>
              <li>Copy and paste it above</li>
            </ol>
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 mt-2"
              onClick={() => window.open('https://www.perplexity.ai/settings/api', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Get API Key
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveApiKey}
            disabled={isLoading || !apiKey.trim()}
            className="w-full"
          >
            {isLoading ? 'Validating...' : 'Save & Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySetup;
