
// API Structure for Sage.ai Platform
// This file defines the API endpoints and their expected structure

export interface ApiEndpoints {
  // Authentication
  auth: {
    signup: 'POST /api/auth/signup';
    signin: 'POST /api/auth/signin';
    signout: 'POST /api/auth/signout';
    refreshToken: 'POST /api/auth/refresh';
    resetPassword: 'POST /api/auth/reset-password';
  };

  // User Management
  users: {
    getProfile: 'GET /api/users/profile';
    updateProfile: 'PUT /api/users/profile';
    getUsage: 'GET /api/users/usage';
    updateSubscription: 'PUT /api/users/subscription';
  };

  // E-commerce Endpoints
  ecommerce: {
    generateWebsite: 'POST /api/ecommerce/website/generate';
    getTemplates: 'GET /api/ecommerce/website/templates';
    saveTemplate: 'POST /api/ecommerce/website/templates';
    deployWebsite: 'POST /api/ecommerce/website/deploy';
  };

  productResearch: {
    getTrendingProducts: 'GET /api/ecommerce/products/trending';
    refreshProducts: 'POST /api/ecommerce/products/refresh';
    getProductDetails: 'GET /api/ecommerce/products/:id';
    saveProductResearch: 'POST /api/ecommerce/products/research';
  };

  // Marketing Agency Endpoints
  campaigns: {
    create: 'POST /api/campaigns';
    getAll: 'GET /api/campaigns';
    getById: 'GET /api/campaigns/:id';
    update: 'PUT /api/campaigns/:id';
    delete: 'DELETE /api/campaigns/:id';
    deploy: 'POST /api/campaigns/:id/deploy';
    getPerformance: 'GET /api/campaigns/:id/performance';
  };

  leads: {
    getAll: 'GET /api/leads';
    create: 'POST /api/leads';
    update: 'PUT /api/leads/:id';
    score: 'POST /api/leads/:id/score';
    nurture: 'POST /api/leads/:id/nurture';
    getInsights: 'GET /api/leads/:id/insights';
  };

  socialMedia: {
    generateContent: 'POST /api/social/generate';
    schedulePost: 'POST /api/social/schedule';
    getAnalytics: 'GET /api/social/analytics';
    getPlatforms: 'GET /api/social/platforms';
  };

  // Sales Operations Endpoints
  prospects: {
    research: 'POST /api/sales/prospects/research';
    getAll: 'GET /api/sales/prospects';
    create: 'POST /api/sales/prospects';
    update: 'PUT /api/sales/prospects/:id';
    getInsights: 'GET /api/sales/prospects/:id/insights';
  };

  sequences: {
    create: 'POST /api/sales/sequences';
    getAll: 'GET /api/sales/sequences';
    update: 'PUT /api/sales/sequences/:id';
    deploy: 'POST /api/sales/sequences/:id/deploy';
    getPerformance: 'GET /api/sales/sequences/:id/performance';
  };

  meetings: {
    schedule: 'POST /api/sales/meetings';
    getAll: 'GET /api/sales/meetings';
    analyze: 'POST /api/sales/meetings/:id/analyze';
    getTranscript: 'GET /api/sales/meetings/:id/transcript';
  };

  // Copywriting Endpoints
  copywriting: {
    generate: 'POST /api/copy/generate';
    getTemplates: 'GET /api/copy/templates';
    saveProject: 'POST /api/copy/projects';
    getProjects: 'GET /api/copy/projects';
    updateProject: 'PUT /api/copy/projects/:id';
    analyzePerformance: 'POST /api/copy/analyze';
  };

  // Analytics and Reporting
  analytics: {
    getDashboard: 'GET /api/analytics/dashboard';
    getReports: 'GET /api/analytics/reports';
    generateReport: 'POST /api/analytics/reports/generate';
    exportData: 'POST /api/analytics/export';
  };

  // Integration Endpoints
  integrations: {
    connect: 'POST /api/integrations/:platform/connect';
    disconnect: 'DELETE /api/integrations/:platform';
    getStatus: 'GET /api/integrations/status';
    sync: 'POST /api/integrations/:platform/sync';
  };
}

// Request/Response Types
export interface WebsiteGenerationRequest {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme?: string;
  businessGoals?: string;
  existingWebsite?: string;
}

export interface CampaignCreationRequest {
  clientName: string;
  industry: string;
  objectives: string[];
  targetAudience: string;
  budget: number;
  duration: string;
  geographic?: string;
  keyMessages: string;
  competitors?: string;
}

export interface ProspectResearchRequest {
  name: string;
  company: string;
  linkedinUrl?: string;
  companyWebsite?: string;
  industry?: string;
  location?: string;
}

export interface LeadScoringRequest {
  leadId: string;
  demographic_data: {
    jobTitle: string;
    companySize: string;
    industry: string;
    location: string;
  };
  behavioral_data: {
    emailEngagement: number;
    websiteActivity: number;
    contentDownloads: number;
    socialEngagement: number;
  };
  firmographic_data: {
    revenue: string;
    employees: number;
    techStack: string[];
    growth: string;
  };
}

export interface CopyGenerationRequest {
  type: 'website' | 'ad' | 'email' | 'social';
  brandVoice: string;
  targetAudience: string;
  goals: string[];
  industry: string;
  contentLength: 'short' | 'medium' | 'long';
  tone: string;
  keywords?: string[];
  existingContent?: string;
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProspectInsights {
  qualificationScore: number;
  companyInfo: {
    size: string;
    revenue: string;
    industry: string;
    location: string;
  };
  techStack: string[];
  painPoints: string[];
  buyingSignals: string[];
  decisionMakers: string[];
  recentNews: string[];
  recommendations: string[];
}

export interface CampaignStrategy {
  recommendedPlatforms: string[];
  budgetAllocation: Record<string, number>;
  audienceSegments: string[];
  contentThemes: string[];
  keywordTargets: string[];
  creativeDirection: string[];
  timeline: string[];
}

export interface GeneratedCopy {
  type: string;
  content: string;
  variations: string[];
  keyPoints: string[];
  callToAction: string;
  estimatedPerformance: {
    conversionRate: number;
    engagement: number;
    readability: number;
  };
}
