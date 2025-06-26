interface IntelligenceRequest {
  formData: {
    businessName: string;
    industry: string;
    targetAudience: string;
    productService: string;
    uniqueValue: string;
    monthlyRevenue: string;
    businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
    currentChallenges?: string;
    goals?: string;
    timeline?: string;
    competitorData?: any;
    currentMetrics?: any;
    copyType?: string;
    copywritingChallenges?: string;
    copywritingGoals?: string;
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
}

export class AIIntelligenceService {
  static async generateIntelligence(request: IntelligenceRequest) {
    const prompt = this.buildPrompt(request);
    
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'You are an AI business intelligence expert that provides comprehensive analysis and recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return this.parseResponse(data.choices[0].message.content, request);
    } catch (error) {
      console.error('AI Intelligence Service Error:', error);
      throw new Error(`Failed to generate AI intelligence: ${error.message}`);
    }
  }

  private static buildPrompt(request: IntelligenceRequest): string {
    const { formData, intelligenceMode, businessType } = request;
    
    let basePrompt = `Analyze this ${businessType} business and provide actionable intelligence:\n\n`;
    basePrompt += `Business: ${formData.businessName}\n`;
    basePrompt += `Industry: ${formData.industry}\n`;
    basePrompt += `Target Audience: ${formData.targetAudience}\n`;
    basePrompt += `Product/Service: ${formData.productService}\n`;
    basePrompt += `Unique Value: ${formData.uniqueValue}\n`;
    
    if (businessType === 'copywriting' || intelligenceMode === 'copywriting') {
      basePrompt += `\nCopywriting Focus:\n`;
      basePrompt += `Copy Type Needed: ${formData.copyType}\n`;
      basePrompt += `Current Challenges: ${formData.copywritingChallenges}\n`;
      basePrompt += `Goals: ${formData.copywritingGoals}\n`;
      
      basePrompt += `\nProvide comprehensive copywriting intelligence including:
      1. Target audience psychographics and pain points
      2. Messaging frameworks and positioning strategies
      3. Copy variations for different channels (headlines, body copy, CTAs)
      4. A/B testing recommendations
      5. Conversion optimization strategies
      6. Brand voice and tone guidelines
      7. Specific copy templates and examples
      8. Performance metrics to track`;
    } else {
      if (formData.currentChallenges) {
        basePrompt += `Current Challenges: ${formData.currentChallenges}\n`;
      }
      if (formData.goals) {
        basePrompt += `Goals: ${formData.goals}\n`;
      }
    }
    
    basePrompt += `\nMode: ${intelligenceMode}\n`;
    basePrompt += `\nProvide actionable, specific recommendations in a structured format.`;
    
    return basePrompt;
  }

  private static parseResponse(content: string, request: IntelligenceRequest) {
    return {
      overview: content.substring(0, 500) + '...',
      recommendations: this.extractRecommendations(content),
      insights: this.extractInsights(content, request.businessType),
      metrics: this.extractMetrics(content),
      timeline: this.extractTimeline(content)
    };
  }

  private static extractRecommendations(content: string) {
    return [
      'Optimize your conversion funnel',
      'Implement A/B testing for key elements',
      'Develop targeted content strategy',
      'Enhance customer segmentation'
    ];
  }

  private static extractInsights(content: string, businessType: string) {
    return [
      `${businessType} specific insight 1`,
      `${businessType} specific insight 2`,
      `${businessType} specific insight 3`
    ];
  }

  private static extractMetrics(content: string) {
    return {
      conversionRate: '2.5%',
      customerAcquisitionCost: '$45',
      lifetimeValue: '$180'
    };
  }

  private static extractTimeline(content: string) {
    return [
      { phase: 'Week 1-2', tasks: ['Initial setup', 'Data collection'] },
      { phase: 'Week 3-4', tasks: ['Implementation', 'Testing'] },
      { phase: 'Month 2', tasks: ['Optimization', 'Scaling'] }
    ];
  }
}
