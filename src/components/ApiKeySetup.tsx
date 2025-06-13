
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';
import { CompetitiveIntelligenceService } from '@/services/CompetitiveIntelligenceService';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
  isVisible: boolean;
}

const ApiKeySetup = ({ onApiKeySet, isVisible }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  if (!isVisible) return null;

  const testApiKey = async () => {
    if (!apiKey.trim()) return;
    
    setIsTestingKey(true);
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
          messages: [{ role: 'user', content: 'Test' }],
          max_tokens: 10
        }),
      });

      if (response.ok) {
        setKeyStatus('valid');
        CompetitiveIntelligenceService.saveApiKey(apiKey);
        setTimeout(() => {
          onApiKeySet();
        }, 1000);
      } else {
        setKeyStatus('invalid');
      }
    } catch (error) {
      setKeyStatus('invalid');
    } finally {
      setIsTestingKey(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Setup Competitive Intelligence</span>
          </CardTitle>
          <CardDescription>
            To provide you with data-driven insights from top performers in your industry, 
            we need access to real-time web data. Please provide your Perplexity API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Perplexity API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="pplx-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && testApiKey()}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://www.perplexity.ai/settings/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                perplexity.ai/settings/api
              </a>
            </p>
          </div>

          {keyStatus === 'valid' && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">API key validated successfully!</span>
            </div>
          )}

          {keyStatus === 'invalid' && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Invalid API key. Please check and try again.</span>
            </div>
          )}

          <Button 
            onClick={testApiKey}
            disabled={!apiKey.trim() || isTestingKey}
            className="w-full"
          >
            {isTestingKey ? 'Testing API Key...' : 'Validate & Continue'}
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Why we need this:</strong></p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Analyze your top competitors in real-time</li>
              <li>Extract winning ad copy and strategies</li>
              <li>Identify market gaps and opportunities</li>
              <li>Generate data-driven recommendations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeySetup;
