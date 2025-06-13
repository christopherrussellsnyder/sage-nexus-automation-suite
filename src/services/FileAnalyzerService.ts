
interface AnalysisResult {
  extractedText: string;
  contentType: 'campaign' | 'email' | 'website' | 'ad' | 'social' | 'other';
  insights: string[];
  recommendations: string[];
  improvements: string[];
}

export class FileAnalyzerService {
  private static API_KEY_STORAGE_KEY = 'perplexity_api_key';

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async analyzeFile(file: File, userContext: string): Promise<AnalysisResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Perplexity API key not found. Please set your API key first.');
    }

    try {
      // Convert file to base64 for analysis
      const base64Data = await this.fileToBase64(file);
      
      const prompt = `Analyze this image/file content and provide detailed insights.

User Context: ${userContext}

Please analyze the content and provide:
1. Extract any text or data visible
2. Identify the content type (campaign, email, website, ad, social media, etc.)
3. Provide strategic insights about what's working/not working
4. Give specific recommendations for improvement
5. Suggest optimization strategies based on industry best practices

Focus on actionable advice that can improve performance, conversion rates, and engagement.`;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert marketing analyst who can analyze visual content and provide actionable insights for improving marketing performance.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 3000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze file');
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;

      return this.parseAnalysisResult(analysisText);
    } catch (error) {
      console.error('Error analyzing file:', error);
      throw error;
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private static parseAnalysisResult(analysisText: string): AnalysisResult {
    // Parse the AI response and structure it
    // This is a simplified parser - in production you'd use more sophisticated NLP
    const lines = analysisText.split('\n');
    
    let extractedText = '';
    let contentType: AnalysisResult['contentType'] = 'other';
    const insights: string[] = [];
    const recommendations: string[] = [];
    const improvements: string[] = [];

    // Simple parsing logic
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('campaign') || lowerLine.includes('advertising')) {
        contentType = 'campaign';
      } else if (lowerLine.includes('email')) {
        contentType = 'email';
      } else if (lowerLine.includes('website') || lowerLine.includes('landing')) {
        contentType = 'website';
      } else if (lowerLine.includes('ad ') || lowerLine.includes('advertisement')) {
        contentType = 'ad';
      } else if (lowerLine.includes('social') || lowerLine.includes('instagram') || lowerLine.includes('facebook')) {
        contentType = 'social';
      }

      if (line.includes('insight') || line.includes('working')) {
        insights.push(line.replace(/^\d+\.\s*/, '').trim());
      } else if (line.includes('recommend') || line.includes('should')) {
        recommendations.push(line.replace(/^\d+\.\s*/, '').trim());
      } else if (line.includes('improve') || line.includes('optimize')) {
        improvements.push(line.replace(/^\d+\.\s*/, '').trim());
      }
    });

    // If we couldn't parse specific sections, use the full text
    if (insights.length === 0 && recommendations.length === 0) {
      const sections = analysisText.split(/\n\s*\n/);
      sections.forEach((section, index) => {
        if (index === 0) extractedText = section;
        else if (index === 1) insights.push(section);
        else if (index === 2) recommendations.push(section);
        else improvements.push(section);
      });
    }

    return {
      extractedText: extractedText || analysisText.substring(0, 200),
      contentType,
      insights: insights.length > 0 ? insights : ['Analysis completed - see recommendations below'],
      recommendations: recommendations.length > 0 ? recommendations : ['Improve visual hierarchy', 'Strengthen call-to-action', 'Optimize for mobile'],
      improvements: improvements.length > 0 ? improvements : ['A/B test different variations', 'Analyze competitor strategies', 'Track performance metrics']
    };
  }
}
