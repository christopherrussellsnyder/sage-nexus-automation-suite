# Akasaka Copywriting Intelligence Feature - Complete Implementation Prompt

## COPY AND PASTE THIS ENTIRE PROMPT TO BUILD THE COPYWRITING INTELLIGENCE FEATURE IN AKASAKA

---

## **MAIN REQUEST:**
Build a complete AI Copywriting Intelligence system for Akasaka that includes:
1. **Intelligence Dashboard** with overview, wizard, and results sections
2. **Multi-step Setup Wizard** with progress tracking
3. **AI Response Generation** via Supabase Edge Functions
4. **Comprehensive Results Display** with actionable copywriting recommendations

---

## **1. INTELLIGENCE DASHBOARD ARCHITECTURE**

### **Main Dashboard Component Structure:**
```typescript
// Create IntelligenceDashboard.tsx with these exact state management patterns:
const [activeSection, setActiveSection] = useState<'overview' | 'wizard' | 'results'>('overview');
const [intelligenceData, setIntelligenceData] = useState(null);
const [businessType, setBusinessType] = useState<'copywriting' | null>(null);
const [intelligenceMode, setIntelligenceMode] = useState<'full'>('full');
```

### **Navigation System:**
- **Overview Button**: Shows business type selector and feature overview
- **Intelligence Wizard Button**: Multi-step form collection (only shows after business type selected)
- **Results Button**: Displays generated intelligence (only shows after data generated)
- Each button uses variant styling: `variant={activeSection === 'section' ? 'default' : 'outline'}`

### **Section Rendering Logic:**
```typescript
{activeSection === 'overview' && (
  <div className="space-y-6">
    <BusinessTypeSelector onSelect={handleBusinessTypeSelect} />
    <IntelligenceOverview />
  </div>
)}

{activeSection === 'wizard' && businessType && (
  <UnifiedIntelligenceWizard 
    businessType={businessType}
    onIntelligenceGenerated={handleIntelligenceGenerated}
    intelligenceMode={intelligenceMode}
  />
)}

{activeSection === 'results' && intelligenceData && (
  <IntelligenceResults 
    data={intelligenceData}
    businessType={businessType}
    onBack={() => setActiveSection('wizard')}
  />
)}
```

---

## **2. WIZARD SETUP PROGRESS SYSTEM**

### **Step Definition Structure:**
```typescript
interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}
```

### **Progress Tracking Component (WizardSteps.tsx):**
- **Visual Progress Indicators**: CheckCircle for completed, Circle for current/upcoming
- **Color Coding**: Green for completed, blue for current, gray for upcoming
- **Current Step Badge**: Shows "Current" badge on active step
- **Card Layout**: Uses Card/CardHeader/CardContent structure

### **Step Status Logic:**
```typescript
{step.status === 'completed' ? (
  <CheckCircle className="h-5 w-5 text-green-500" />
) : (
  <Circle className={`h-5 w-5 ${step.status === 'current' ? 'text-blue-500' : 'text-gray-300'}`} />
)}
```

---

## **3. UNIFIED INTELLIGENCE WIZARD FLOW**

### **Form Data Collection Structure:**
```typescript
interface FormData {
  // Business Information
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueSellingProposition: string;
  
  // Current Metrics
  currentRevenue: string;
  marketingBudget: string;
  currentChallenges: string[];
  
  // Goals & Objectives  
  primaryGoals: string[];
  timeframe: string;
  successMetrics: string[];
  
  // Competitor Analysis
  mainCompetitors: string[];
  competitorStrengths: string;
  marketDifferentiators: string;
}
```

### **Step Navigation System:**
```typescript
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState<FormData>({});

const handleNext = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    generateIntelligence();
  }
};

const handlePrevious = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};
```

### **Step Generation for Copywriting:**
```typescript
const getStepsForBusinessType = () => {
  return [
    { id: 1, title: "Business Information", description: "Tell us about your business and target audience" },
    { id: 2, title: "Current Metrics", description: "Share your current performance and challenges" },
    { id: 3, title: "Goals & Objectives", description: "Define your copywriting and marketing goals" },
    { id: 4, title: "Competitor Analysis", description: "Analyze your competitive landscape" }
  ].map((step, index) => ({
    ...step,
    status: index < currentStep ? 'completed' : index === currentStep ? 'current' : 'upcoming'
  }));
};
```

### **Form Component Rendering:**
```typescript
const renderCurrentStep = () => {
  switch (currentStep) {
    case 0:
      return <BusinessInformationForm data={formData} onChange={handleFieldChange} />;
    case 1:
      return <CurrentMetricsForm data={formData} onChange={handleFieldChange} />;
    case 2:
      return <GoalsObjectivesForm data={formData} onChange={handleFieldChange} />;
    case 3:
      return <CompetitorAnalysisForm data={formData} onChange={handleFieldChange} />;
    default:
      return null;
  }
};
```

---

## **4. INTELLIGENCE LOADING SYSTEM**

### **Loading Component with Progress Animation:**
```typescript
// IntelligenceLoading.tsx with animated progress
const [progress, setProgress] = useState(0);
const [currentStep, setCurrentStep] = useState(0);

// Simulate progress with intervals
useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) return 100;
      const newProgress = prev + Math.random() * 3;
      return Math.min(newProgress, 100);
    });
    
    setCurrentStep(prev => {
      if (progress > 25 && prev < 1) return 1;
      if (progress > 50 && prev < 2) return 2;
      if (progress > 75 && prev < 3) return 3;
      return prev;
    });
  }, 200);

  return () => clearInterval(interval);
}, [progress]);
```

### **Loading Steps Display:**
```typescript
const steps = [
  { icon: Brain, text: "Analyzing your business profile..." },
  { icon: Target, text: "Researching your target audience..." },
  { icon: Lightbulb, text: "Generating copywriting strategies..." },
  { icon: BarChart3, text: "Creating performance recommendations..." }
];
```

---

## **5. AI INTELLIGENCE GENERATION (SUPABASE EDGE FUNCTION)**

### **Edge Function Structure (supabase/functions/generate-intelligence/index.ts):**
```typescript
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, businessType, intelligenceMode } = await req.json();
    
    // Generate comprehensive copywriting intelligence
    const prompt = `Generate comprehensive copywriting intelligence for:
    Business: ${formData.businessName}
    Industry: ${formData.industry}
    Target Audience: ${formData.targetAudience}
    
    Include:
    1. Copywriting Strategy Recommendations
    2. Audience-Specific Messaging
    3. Content Calendar Suggestions
    4. Performance Optimization Tips
    5. Competitive Positioning
    6. ROI Improvement Strategies`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert copywriting strategist.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const intelligenceResult = data.choices[0].message.content;

    return new Response(JSON.stringify({
      intelligenceData: intelligenceResult,
      intelligenceMode,
      generatedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating intelligence:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

---

## **6. INTELLIGENCE RESULTS DISPLAY SYSTEM**

### **Results Component Structure:**
```typescript
const IntelligenceResults = ({ data, businessType, onBack }) => {
  const { intelligenceData, intelligenceMode } = data;
  
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akasaka-intelligence-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
};
```

### **Action Buttons Layout:**
```typescript
<div className="flex space-x-4">
  <Button onClick={onBack} variant="outline">
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Wizard
  </Button>
  <Button onClick={handleRegenerate} variant="outline">
    <RefreshCw className="h-4 w-4 mr-2" />
    Regenerate Report
  </Button>
  <Button onClick={handleExport}>
    <Download className="h-4 w-4 mr-2" />
    Export Report
  </Button>
</div>
```

### **Results Section Rendering:**
```typescript
{shouldShowSection('copywritingRecommendations') && (
  <CopywritingRecommendations 
    data={intelligenceData} 
    businessType={businessType} 
  />
)}
{shouldShowSection('contentCalendar') && (
  <ContentCalendar 
    data={intelligenceData} 
    businessType={businessType} 
  />
)}
{shouldShowSection('competitorInsights') && (
  <CompetitorInsights 
    data={intelligenceData} 
    businessType={businessType} 
  />
)}
```

---

## **7. COPYWRITING RECOMMENDATIONS COMPONENT**

### **Recommendation Card Structure:**
```typescript
const EnhancedCopyRecommendationCard = ({ recommendation }) => (
  <Card className="mb-4">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{recommendation.type}</CardTitle>
        <Badge variant={recommendation.priority === 'High' ? 'destructive' : 'secondary'}>
          {recommendation.priority}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold">Headline:</h4>
        <p className="text-muted-foreground">{recommendation.headline}</p>
      </div>
      
      <div>
        <h4 className="font-semibold">Content:</h4>
        <p className="text-muted-foreground">{recommendation.content}</p>
      </div>
      
      <div>
        <h4 className="font-semibold">Call-to-Action:</h4>
        <p className="text-muted-foreground">{recommendation.cta}</p>
      </div>
      
      <div>
        <h4 className="font-semibold">Recommended Platform:</h4>
        <Badge variant="outline">{recommendation.platform}</Badge>
      </div>
      
      <div>
        <h4 className="font-semibold">Strategic Reasoning:</h4>
        <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
      </div>
      
      <div>
        <h4 className="font-semibold">Emotional Triggers:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {recommendation.emotionalTriggers?.map((trigger, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {trigger}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
```

---

## **8. REQUIRED TECHNOLOGIES & DEPENDENCIES**

### **Core Technologies:**
- **React 18.3.1** with TypeScript
- **Tailwind CSS** with semantic design tokens
- **Radix UI Components** (@radix-ui/react-*)
- **Lucide React Icons** (^0.462.0)
- **Supabase** (@supabase/supabase-js@2.50.0)
- **React Router DOM** (^6.26.2)
- **React Hook Form** (^7.53.0) with Zod validation

### **UI Components Used:**
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
```

### **Icons Required:**
```typescript
import { 
  Brain, Target, BarChart3, Zap, Lightbulb, TrendingUp,
  MessageSquare, Globe, Megaphone, Mail, Share2, ShoppingCart,
  CheckCircle, Circle, ArrowLeft, RefreshCw, Download
} from 'lucide-react';
```

---

## **9. SUPABASE INTEGRATION REQUIREMENTS**

### **Required Secrets:**
- **OPENAI_API_KEY**: For AI intelligence generation
- **SUPABASE_URL**: Project URL
- **SUPABASE_ANON_KEY**: Anonymous access key

### **Edge Function Deployment:**
- Create `supabase/functions/generate-intelligence/index.ts`
- Configure CORS headers for web app access
- Implement proper error handling and logging

### **Client Integration:**
```typescript
import { supabase } from "@/integrations/supabase/client";

const generateIntelligence = async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase.functions.invoke('generate-intelligence', {
      body: {
        formData,
        businessType,
        intelligenceMode
      }
    });

    if (error) throw error;
    
    onIntelligenceGenerated(data);
    toast.success("Intelligence report generated successfully!");
  } catch (error) {
    console.error('Intelligence generation failed:', error);
    toast.error("Failed to generate intelligence report. Please try again.");
  } finally {
    setLoading(false);
  }
};
```

---

## **10. EXACT IMPLEMENTATION STEPS**

### **Step 1: Create Dashboard Structure**
1. Create `IntelligenceDashboard.tsx` with three-section navigation
2. Implement state management for activeSection, intelligenceData, businessType
3. Add navigation buttons with proper variant styling

### **Step 2: Build Wizard System**
1. Create `UnifiedIntelligenceWizard.tsx` with multi-step form
2. Implement `WizardSteps.tsx` for progress tracking
3. Create individual form components for each step
4. Add navigation and validation logic

### **Step 3: Implement Loading System**
1. Create `IntelligenceLoading.tsx` with animated progress
2. Add step indicators and progress bar
3. Implement realistic progress simulation

### **Step 4: Setup AI Generation**
1. Create Supabase Edge Function for intelligence generation
2. Configure OpenAI API integration
3. Implement proper error handling and CORS

### **Step 5: Build Results Display**
1. Create `IntelligenceResults.tsx` with export functionality
2. Implement `CopywritingRecommendations.tsx` component
3. Add action buttons for regenerate and export
4. Create recommendation card layouts

### **Step 6: Integration & Testing**
1. Connect all components through proper data flow
2. Test wizard navigation and data persistence
3. Verify AI generation and results display
4. Implement error states and loading feedback

---

## **FINAL RESULT:**
A complete copywriting intelligence system with:
- ✅ Multi-step wizard with progress tracking
- ✅ AI-powered recommendation generation
- ✅ Comprehensive results display with export functionality
- ✅ Professional UI with consistent design tokens
- ✅ Proper error handling and loading states
- ✅ Supabase backend integration

**Copy this entire prompt and paste it into your Akasaka project to build the complete copywriting intelligence feature.**