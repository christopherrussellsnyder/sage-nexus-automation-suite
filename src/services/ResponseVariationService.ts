export class ResponseVariationService {
  private static responsePatterns = {
    adCopy: [
      {
        hook: "Stop scrolling if you're tired of {problem}",
        bodyStart: "I get it. You've tried everything to {solve}, but nothing seems to work.",
        framework: "Problem-Agitation-Solution"
      },
      {
        hook: "The {industry} secret that changed everything",
        bodyStart: "What if I told you there's a method that {outcome} in just {timeframe}?",
        framework: "Secret-Reveal-Benefit"
      },
      {
        hook: "WARNING: Don't {action} until you read this",
        bodyStart: "Most {targetAudience} make this critical mistake that costs them {consequence}.",
        framework: "Warning-Mistake-Solution"
      },
      {
        hook: "How {businessName} helped {clientType} achieve {result}",
        bodyStart: "Meet Sarah. 6 months ago, she was struggling with {problem}.",
        framework: "Story-Transformation-Proof"
      },
      {
        hook: "This might sound crazy, but {claim}",
        bodyStart: "I know it sounds too good to be true, but here's the proof:",
        framework: "Curiosity-Proof-Credibility"
      }
    ],
    emailSequences: [
      {
        subject: "Your {industry} breakthrough starts here",
        opening: "I wanted to personally reach out because I noticed you're serious about {goal}.",
        framework: "Personal-Recognition-Value"
      },
      {
        subject: "The mistake that's costing you {consequence}",
        opening: "There's something I need to tell you about {topic} that most experts won't.",
        framework: "Urgency-Secret-Authority"
      },
      {
        subject: "Behind the scenes: How we {achievement}",
        opening: "I'm pulling back the curtain to show you exactly how {process}.",
        framework: "Transparency-Process-Trust"
      }
    ],
    websiteCopy: [
      {
        headline: "Finally, {solution} that actually works for {targetAudience}",
        subheadline: "Discover the proven system that {outcome} without {commonProblem}",
        approach: "Direct-Promise-Differentiation"
      },
      {
        headline: "Transform your {area} in {timeframe} or get your money back",
        subheadline: "Join {number}+ {targetAudience} who've achieved {result} with our guarantee",
        approach: "Guarantee-Social-Proof-Risk-Reversal"
      },
      {
        headline: "The {adjective} way to {outcome} (even if you've tried everything)",
        subheadline: "Our breakthrough method works when others fail - here's why",
        approach: "Contrarian-Hope-Curiosity"
      }
    ]
  };

  private static emotionalTriggers = [
    { name: "urgency", phrases: ["limited time", "don't wait", "before it's too late", "act now"] },
    { name: "curiosity", phrases: ["secret method", "insider technique", "hidden strategy", "what if"] },
    { name: "social proof", phrases: ["join thousands", "trusted by", "industry leaders choose", "proven by"] },
    { name: "fear of missing out", phrases: ["while spots last", "exclusive access", "invitation only", "don't miss out"] },
    { name: "transformation", phrases: ["breakthrough results", "life-changing", "revolutionary", "transform your"] },
    { name: "authority", phrases: ["expert-approved", "scientifically proven", "industry-leading", "award-winning"] }
  ];

  private static callToActions = [
    "Get instant access",
    "Start your transformation",
    "Claim your spot",
    "Unlock the system",
    "Join the elite group",
    "Secure your future",
    "Take the next step",
    "Begin your journey",
    "Access the vault",
    "Get exclusive entry"
  ];

  static generateVariedResponse(type: 'adCopy' | 'emailSequences' | 'websiteCopy', data: any, previousResponses: string[] = []): any {
    const patterns = this.responsePatterns[type];
    const availablePatterns = patterns.filter(pattern => 
      !previousResponses.some(prev => prev.includes(pattern.framework))
    );
    
    const selectedPattern = availablePatterns.length > 0 
      ? availablePatterns[Math.floor(Math.random() * availablePatterns.length)]
      : patterns[Math.floor(Math.random() * patterns.length)];

    const randomTrigger = this.emotionalTriggers[Math.floor(Math.random() * this.emotionalTriggers.length)];
    const randomCTA = this.callToActions[Math.floor(Math.random() * this.callToActions.length)];

    switch (type) {
      case 'adCopy':
        return {
          ...selectedPattern,
          hook: this.populateTemplate(selectedPattern.hook, data),
          body: this.populateTemplate(selectedPattern.bodyStart, data),
          cta: randomCTA,
          emotionalTrigger: randomTrigger.name,
          triggerPhrases: randomTrigger.phrases
        };
      
      case 'emailSequences':
        return {
          ...selectedPattern,
          subject: this.populateTemplate(selectedPattern.subject, data),
          opening: this.populateTemplate(selectedPattern.opening, data),
          cta: randomCTA,
          emotionalTrigger: randomTrigger.name
        };
      
      case 'websiteCopy':
        return {
          ...selectedPattern,
          headline: this.populateTemplate(selectedPattern.headline, data),
          subheadline: this.populateTemplate(selectedPattern.subheadline, data),
          cta: randomCTA,
          emotionalTrigger: randomTrigger.name
        };
      
      default:
        return selectedPattern;
    }
  }

  private static populateTemplate(template: string, data: any): string {
    let populated = template;
    const placeholders = template.match(/\{([^}]+)\}/g);
    
    if (placeholders) {
      placeholders.forEach(placeholder => {
        const key = placeholder.replace(/[{}]/g, '');
        const value = data[key] || this.getDefaultValue(key);
        populated = populated.replace(placeholder, value);
      });
    }
    
    return populated;
  }

  private static getDefaultValue(key: string): string {
    const defaults: Record<string, string> = {
      problem: "ineffective solutions",
      solve: "grow your business",
      industry: "business",
      outcome: "double your results",
      timeframe: "30 days",
      targetAudience: "business owners",
      consequence: "thousands in lost revenue",
      action: "invest in another solution",
      businessName: "our system",
      clientType: "entrepreneurs",
      result: "6-figure growth",
      claim: "you can achieve this too",
      goal: "scaling your business",
      topic: "business growth",
      achievement: "generated $1M+ for clients",
      process: "our proven method works",
      solution: "a business system",
      commonProblem: "the usual headaches",
      area: "business operations",
      number: "10,000",
      adjective: "simple"
    };
    
    return defaults[key] || key;
  }

  static trackResponse(type: string, response: string, userId?: string): void {
    // In a real implementation, this would store responses to prevent repetition
    const timestamp = new Date().toISOString();
    const responseRecord = {
      type,
      response: response.substring(0, 100), // Store first 100 chars as identifier
      timestamp,
      userId: userId || 'anonymous'
    };
    
    // Store in localStorage for demo purposes
    const existingResponses = JSON.parse(localStorage.getItem('generatedResponses') || '[]');
    existingResponses.push(responseRecord);
    
    // Keep only last 50 responses to prevent storage bloat
    if (existingResponses.length > 50) {
      existingResponses.splice(0, existingResponses.length - 50);
    }
    
    localStorage.setItem('generatedResponses', JSON.stringify(existingResponses));
  }

  static getPreviousResponses(type: string, userId?: string): string[] {
    const existingResponses = JSON.parse(localStorage.getItem('generatedResponses') || '[]');
    return existingResponses
      .filter((record: any) => record.type === type && record.userId === (userId || 'anonymous'))
      .map((record: any) => record.response);
  }
}
