# Sage.AI Complete Application Blueprint for Akasaka Replication

**Project: Build "Akasaka" - Complete AI Copywriting Platform Based on Sage.AI**

## OVERVIEW
Create a comprehensive AI-powered copywriting and business automation platform named "Akasaka" that replicates every aspect of the Sage.AI application, including all pages, features, intelligence systems, and design elements.

---

## 1. COMPLETE PAGE STRUCTURE & ROUTING

### Main Application Routes:
```typescript
// Complete routing structure based on App.tsx
Routes:
- "/" (Index/Homepage)
- "/login" (Sign In)
- "/signup" (Start My Transformation)
- "/survey" (Onboarding Survey)
- "/dashboard" (Main Dashboard)
- "/ad-copy" (Ad Copy Generation)
- "/email-sequences" (Email Sequences)
- "/social-content" (Social Content)
- "/website-copy" (Website Copy)
- "/admin" (Admin Panel)
- "/about" (About Us)
- "/privacy" (Privacy Policy)
- "/terms" (Terms of Service)
- "/faq" (FAQ)
- "/pricing" (Pricing)
```

### Header Navigation Structure:
```typescript
// From Header.tsx
Navigation Elements:
- Brand: Brain icon + "Sage.ai" (change to "Akasaka")
- Main Navigation (Home page): Overview, Pricing, "Start My Transformation"
- Logged-in Navigation: Overview, Pricing, Intelligence, E-commerce Domination, Agency Scale System, Sales Acceleration Hub
- Copywriting Tools Dropdown: Website Copy, Ad Copy, Email Sequences, Social Content
- User Account Dropdown: Dashboard, Admin Panel, Sign Out
```

### Footer Structure:
```typescript
// From Footer.tsx
Footer Content:
- Brand section with Brain icon + description
- Company links: About, Pricing, FAQ, Contact, Privacy Policy, Terms of Service
- Copyright notice
```

---

## 2. PAGE-BY-PAGE DETAILED SPECIFICATIONS

### A. INDEX/HOMEPAGE (src/pages/Index.tsx)
**Purpose**: Main landing page with platform overview and feature selection
**Components**:
- Header with navigation
- Dashboard component with section switching (overview/intelligence/ecommerce/agency/sales)
- Footer

**Key Features**:
- Section navigation: overview (default), intelligence, ecommerce, agency, sales, copywriting
- Dynamic content switching based on active section
- Integration with copy settings hook

### B. ABOUT PAGE (src/pages/About.tsx)
**Comprehensive About Page Structure**:

**Hero Section**:
- Large Brain icon with gradient text "Sage.ai" (change to "Akasaka")
- Title: "Revolutionizing Business Automation"
- Subtitle paragraph about AI business automation platform
- Security badges: Enterprise Security, Global Reach, Proven Results

**Stats Section** (4 cards):
- "10,000+" Businesses Automated
- "$2M+" Revenue Generated  
- "400%" Average ROI
- "40+" Hours Saved Weekly

**Platform Features** (4 main hubs):
1. **E-commerce Automation**: AI website builder, product research, store optimization
2. **Marketing Agency Tools**: Campaign orchestration, lead scoring, social media factory
3. **Sales Operations**: Prospect research, sales sequences, meeting intelligence
4. **AI Copywriting Suite**: High-converting copy for websites, ads, emails, social media

**Our Story Section**:
- Detailed narrative about company founding and mission
- Problem identification and solution development
- Current impact and user base

**Our Values** (4 values):
1. **AI-First Approach**: Advanced AI learning from top performers
2. **All-in-One Platform**: Integrated solution eliminating multiple tools
3. **Industry Expertise**: Data analysis from thousands of successful businesses
4. **Continuous Innovation**: Constant updates based on trends and feedback

**Technology Section**:
- Description of advanced AI technology
- 3 technology pillars: Machine Learning, Predictive Analytics, Automation Engine

**Security & Trust**:
- Enterprise-grade security measures
- Compliance badges: SOC 2 Compliant, 256-bit Encryption, 99.9% Uptime

### C. PRICING PAGE (src/pages/Pricing.tsx)
**Complete Pricing Structure**:

**Header Section**:
- Navigation with back to home button
- Title: "Transform Your Business with AI"
- Feature badges: AI-Powered, All-in-One, Fully Automated

**Pricing Cards**:
- Free tier and Premium tier cards
- Dynamic subscription status checking
- Integration with Supabase subscription system

**Value Proposition** (4 sections):
1. **E-commerce Hub**: AI website builder, product research, trending analysis, store optimization
2. **Marketing Tools**: Campaign automation, lead scoring, social content factory, performance tracking
3. **Sales Operations**: Prospect research AI, sales sequences, meeting intelligence, deal tracking
4. **AI Copywriting**: Website copy, ad copy, email sequences, social content

**FAQ Section**:
- Common pricing questions with detailed answers
- Topics: free trial, cancellation, Premium features, support

**Final CTA**:
- Primary CTA card with call-to-action
- Start Free Trial and Learn More buttons

### D. FAQ PAGE (src/pages/FAQ.tsx)
**Complete FAQ System**:

**Search Functionality**:
- Search bar to filter FAQs
- Real-time filtering by question and answer content

**FAQ Categories** (5 main categories):
1. **General** (HelpCircle icon, blue): What is Sage.ai, how it works, who can use it, what makes it different
2. **Features & Capabilities** (Zap icon, green): Intelligence Suite, E-commerce automation, Marketing Agency hub, AI Copywriting
3. **Pricing & Plans** (CreditCard icon, purple): Available plans, free trial, upgrades, payment methods
4. **Security & Privacy** (Shield icon, red): Data security, storage location, data export, GDPR compliance
5. **Support & Training** (Users icon, orange): Available support, getting started, training, results timeline

**Contact Section**:
- "Still have questions?" section
- Support badges: 24/7 Support, Quick Response

### E. CONTACT PAGE (src/pages/Contact.tsx)
**Simple Contact Structure**:
- Basic contact page template
- Minimal content (placeholder for expansion)

### F. PRIVACY POLICY (src/pages/Privacy.tsx)
**Comprehensive Privacy Policy** (11 sections):
1. **Information We Collect**: Personal, Business, Technical information categories
2. **How We Use Your Information**: Service provision, improvement, communication
3. **Information Sharing and Disclosure**: Service providers, legal requirements, business transfers
4. **Data Security**: Encryption, access controls, audits, compliance, monitoring, backup
5. **Your Rights and Choices**: Access/control, GDPR rights, CCPA rights
6. **Cookies and Tracking**: Essential, analytics, preference, marketing cookies
7. **Data Retention**: Retention periods for different data types
8. **International Data Transfers**: Global operations and safeguards
9. **Children's Privacy**: Under-16 restrictions
10. **Changes to This Policy**: Update procedures
11. **Contact Us**: Privacy contact information

### G. TERMS OF SERVICE (src/pages/Terms.tsx)
**Comprehensive Terms Structure** (14 sections):
1. **Acceptance of Terms**
2. **Description of Services**: Complete service list
3. **User Accounts and Registration**: Account creation and responsibility
4. **Acceptable Use Policy**: Permitted and prohibited uses
5. **Content and Intellectual Property**: User content, our IP, AI-generated content
6. **Payment Terms**: Subscription plans, price changes, refunds
7. **Privacy and Data Protection**: Data security measures
8. **Service Availability and Support**: Service level, technical requirements
9. **Termination**: User and company termination rights
10. **Disclaimers and Limitation of Liability**
11. **Indemnification**
12. **Dispute Resolution**: Governing law, resolution process
13. **General Provisions**: Entire agreement, severability, assignment, updates
14. **Contact Information**

---

## 3. COMPREHENSIVE DASHBOARD SYSTEM

### Main Dashboard Component (src/components/Dashboard.tsx)
**Complete Dashboard Structure**:

**Hero Section**:
- Large Brain icon with gradient title
- Hero title, subtitle, and description from copy settings
- Feature badges: AI-Powered, All-in-One, Industry-Proven

**Quick Stats Grid** (4 stats):
- Revenue Generated, Conversion Rate, Active Users, Performance Score
- Dynamic values from copy settings
- Icons: DollarSign, TrendingUp, Users, BarChart3

**Platform Features** (4 main sections):
1. **E-commerce Hub** (ShoppingCart icon, primary color)
2. **Agency Scale System** (Users icon, accent color)  
3. **Sales Acceleration Hub** (Phone icon, primary color)
4. **AI Copywriting Suite** (PenTool icon, accent color)

Each feature card includes:
- Color-coded top border
- Icon and title/description
- 4 feature bullet points
- 2 performance stats
- "Explore" button with arrow

**Value Proposition Section**:
- 3 value pillars with icons and descriptions
- AI-First Approach, Unified Platform, Industry Expertise

**Company Story**:
- Detailed narrative about platform development
- Problem identification and solution creation

**What Drives Us** (4 values):
- AI-First Approach, Unified Platform, Industry Expertise, Continuous Innovation

**Advanced AI Technology**:
- Technology description
- 3 tech pillars: Machine Learning, Predictive Analytics, Automation Engine

**Security & Trust**:
- Security measures description
- Trust badges and certifications

---

## 4. INTELLIGENCE SYSTEM ARCHITECTURE

### A. Intelligence Dashboard (src/components/IntelligenceDashboard.tsx)
**Complete Intelligence Structure**:

**State Management**:
- Active section: overview/wizard/results
- Intelligence data storage
- Business type selection: ecommerce/agency/sales/copywriting
- Intelligence mode: full/copywriting/marketing/competitor

**Navigation System**:
- Overview button (Brain icon)
- Intelligence Wizard button (Target icon)
- Intelligence Mode Selector (dropdown)
- Results button (BarChart3 icon)

**Section Rendering**:
- Business Type Selector + Intelligence Overview (overview)
- Unified Intelligence Wizard (wizard)
- Intelligence Results (results)

### B. AI Intelligence Service (src/services/AIIntelligenceService.ts)
**Comprehensive Intelligence API**:

**Core Configuration**:
- Max retries: 3
- Retry delay: 1000ms
- Timeout: 30 seconds
- Cache TTL: 5 minutes

**Data Structures**:
- BusinessFormData interface (19 fields)
- IntelligenceRequest interface
- AIGeneratedContent interface with all sections

**Key Methods**:
- `generateIntelligence()`: Main intelligence generation
- `generateCopywritingIntelligence()`: Copywriting-focused
- Request validation and sanitization
- Response validation and caching
- Enhanced error handling with retries

**Generated Sections**:
- Budget Strategy
- Platform Recommendations  
- Monthly Plan
- Metric Optimization
- Competitor Insights
- Copywriting Recommendations
- Industry Insights
- Action Plans

### C. Marketing Intelligence Service (src/services/MarketingIntelligenceService.ts)
**Marketing Solution Architecture**:

**Business Data Interface**:
- 13 core business fields
- Marketing type: organic/paid
- Campaign goals and metrics

**Generated Solution Components**:
- Platform Recommendations (4 platforms with priority, reasoning, expected metrics)
- 30-Day Marketing Plan (daily content with hooks, body, CTA, visuals)
- Industry Emotions (trigger-based)
- Optimization Tips (metric-specific improvements)
- Competitor Insights (strategy analysis)

**Content Generation System**:
- Dynamic hook generation (7 templates)
- Body content tailored to business
- CTA rotation (6 variations)
- Visual suggestions for each platform
- Platform-specific metrics

---

## 5. COPYWRITING FEATURES SYSTEM

### Copywriting Tools Structure:
1. **Website Copy Generator** (Globe icon)
2. **Ad Copy Generator** (Megaphone icon)
3. **Email Sequences** (Mail icon)
4. **Social Content** (Share2 icon)

### Individual Copywriting Pages:
- `/website-copy`: Website copywriting tools
- `/ad-copy`: Advertisement copy generation
- `/email-sequences`: Email sequence builder
- `/social-content`: Social media content creator

---

## 6. COMPLETE DESIGN SYSTEM & STYLING

### A. Color System (from index.css and tailwind.config.ts)
**Dark Theme with Green Accents**:

```css
:root {
  --background: 222.2 84% 4.9%;          /* Dark background */
  --foreground: 210 40% 98%;             /* Light text */
  --card: 222.2 84% 4.9%;                /* Card background */
  --card-foreground: 210 40% 98%;        /* Card text */
  --popover: 222.2 84% 4.9%;             /* Popover background */
  --popover-foreground: 210 40% 98%;     /* Popover text */
  --primary: 142 76% 36%;                /* Green primary */
  --primary-foreground: 355.7 100% 97.3%; /* Primary text */
  --secondary: 217.2 32.6% 17.5%;        /* Dark secondary */
  --secondary-foreground: 210 40% 98%;   /* Secondary text */
  --muted: 217.2 32.6% 17.5%;           /* Muted background */
  --muted-foreground: 215 20.2% 65.1%;  /* Muted text */
  --accent: 142 76% 36%;                 /* Green accent */
  --accent-foreground: 355.7 100% 97.3%; /* Accent text */
  --destructive: 0 62.8% 30.6%;         /* Red destructive */
  --destructive-foreground: 210 40% 98%; /* Destructive text */
  --border: 217.2 32.6% 17.5%;          /* Border color */
  --input: 217.2 32.6% 17.5%;           /* Input background */
  --ring: 142 76% 36%;                  /* Focus ring */
  --radius: 0.5rem;                     /* Border radius */
}
```

### B. Background Effects System:
**Premium Background with Neural Network**:
- Grid pattern overlay
- Neural network dot effects
- Particle glow animations
- Atmospheric flow effects

### C. Interactive Components:
**Card Hover Effects**:
- Glassmorphism with backdrop blur
- Smooth transitions and scaling
- Border glow effects

**Button Glow System**:
- Hover glow effects
- Smooth color transitions
- Interactive feedback

**Text Gradient**:
- Animated gradient text effects
- Breathing animations for emphasis

### D. Animation System:
**Comprehensive Animations**:
- Accordion animations (up/down)
- Fade animations (in/out)
- Scale animations (in/out)
- Slide animations (right)
- Shimmer effects
- Pulse glow effects

---

## 7. TECHNOLOGY STACK SPECIFICATIONS

### A. Frontend Technologies:
```json
{
  "framework": "React 18.3.1",
  "buildTool": "Vite",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "router": "React Router DOM 6.26.2",
  "stateManagement": "React Hooks + Zustand (if needed)",
  "forms": "React Hook Form 7.53.0 + Zod 3.23.8",
  "queries": "@tanstack/react-query 5.56.2",
  "ui": "Radix UI + Shadcn/ui components",
  "icons": "Lucide React 0.462.0",
  "animations": "Tailwind CSS Animate",
  "toasts": "Sonner 1.5.0",
  "charts": "Recharts 2.12.7"
}
```

### B. Backend Technologies:
```json
{
  "platform": "Supabase",
  "database": "PostgreSQL",
  "auth": "Supabase Auth",
  "edgeFunctions": "Supabase Edge Functions (Deno)",
  "storage": "Supabase Storage",
  "realtime": "Supabase Realtime"
}
```

### C. Key Dependencies:
```json
{
  "@hookform/resolvers": "^3.9.0",
  "@radix-ui/react-*": "Latest versions",
  "@supabase/supabase-js": "^2.50.0",
  "class-variance-authority": "^0.7.1",
  "tailwind-merge": "^2.5.2",
  "react-beautiful-dnd": "^13.1.1"
}
```

---

## 8. SUPABASE BACKEND ARCHITECTURE

### A. Authentication System:
- Email/password authentication
- User registration and login flows
- Session management
- Password reset functionality

### B. Database Schema Requirements:
**Core Tables Needed**:
```sql
-- Users/Profiles
profiles (id, user_id, display_name, avatar_url, business_info, created_at, updated_at)

-- Intelligence Data
intelligence_reports (id, user_id, business_type, intelligence_mode, report_data, created_at)

-- Copywriting Projects
copywriting_projects (id, user_id, project_type, content_data, created_at, updated_at)

-- Usage Tracking
usage_tracking (id, user_id, feature_type, usage_count, reset_date, created_at)

-- Subscriptions
subscriptions (id, user_id, subscription_type, status, created_at, expires_at)
```

### C. Edge Functions:
**Required Functions**:
1. `generate-intelligence`: Main AI intelligence generation
2. `check-subscription`: Subscription status checking
3. `create-checkout`: Stripe checkout creation
4. `customer-portal`: Customer portal access
5. `send-welcome-email`: Welcome email automation

### D. Row Level Security (RLS):
- All tables must have RLS enabled
- User-specific access policies
- Secure data isolation

---

## 9. COPYWRITING INTELLIGENCE FEATURES

### A. Intelligence Modes:
1. **Full Intelligence**: Complete business analysis
2. **Copywriting Only**: Focused on copy optimization
3. **Marketing Only**: Marketing strategy focus
4. **Competitor Analysis**: Competitive intelligence

### B. Business Types Supported:
1. **E-commerce**: Product-focused strategies
2. **Agency**: Client management and lead generation
3. **Sales**: Sales process optimization
4. **Copywriting**: Content creation focus

### C. Generated Intelligence Components:
**Budget Strategy**:
- Recommended budget allocation
- Platform-specific spending
- Expected ROAS calculations
- Target CPM recommendations

**Platform Recommendations**:
- Priority ranking (Facebook, Instagram, Google, TikTok)
- Expected metrics for each platform
- Reasoning for recommendations
- Budget allocation suggestions

**Monthly Content Plan**:
- 30-day content calendar
- Daily content suggestions
- Hook, body, CTA for each piece
- Visual suggestions
- Platform-specific optimization

**Copywriting Recommendations**:
- Copy type optimization
- Before/after examples
- Emotional trigger analysis
- Performance improvement strategies

**Competitor Analysis**:
- Competitor strengths/weaknesses
- Opportunity identification
- Strategic recommendations
- Market positioning advice

---

## 10. USER EXPERIENCE FLOW

### A. User Registration Flow:
1. User visits homepage
2. Clicks "Start My Transformation"
3. Creates account (signup page)
4. Completes onboarding survey
5. Accesses main dashboard

### B. Intelligence Generation Flow:
1. User selects business type
2. Chooses intelligence mode
3. Completes intelligence wizard forms
4. AI generates comprehensive report
5. User reviews results and exports

### C. Copywriting Flow:
1. User accesses copywriting tools
2. Selects copy type (website/ad/email/social)
3. Inputs business information
4. AI generates copy variations
5. User edits and exports copy

---

## 11. PREMIUM FEATURES & MONETIZATION

### A. Free Tier Limitations:
- 5 generations per feature
- Basic intelligence reports
- Limited copy variations
- Standard support

### B. Premium Tier ($30/month):
- Unlimited generations
- Full intelligence access
- Advanced copy variations
- Priority support
- Export capabilities
- Advanced analytics

### C. Subscription Management:
- Stripe integration
- Usage tracking
- Automatic renewal
- Customer portal access
- Cancellation handling

---

## 12. DEPLOYMENT & INFRASTRUCTURE

### A. Hosting:
- Lovable.dev platform
- Custom domain support
- SSL certificates
- CDN integration

### B. Environment Variables:
```bash
SUPABASE_URL=https://qtckfvprvpxbbteinxve.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### C. Production Readiness:
- Error monitoring
- Performance optimization
- Security headers
- Database backups
- Monitoring dashboards

---

## 13. SPECIFIC IMPLEMENTATION NOTES

### A. Copy Settings Hook:
- Centralized copy management
- Dynamic text updates
- Brand customization
- Multi-language support potential

### B. Component Architecture:
- Modular component design
- Reusable UI components
- Proper TypeScript typing
- Performance optimization

### C. State Management:
- React hooks for local state
- React Query for server state
- Context for global state
- Proper error boundaries

---

## 14. QUALITY ASSURANCE

### A. Testing Requirements:
- Component testing
- Integration testing
- E2E testing
- Performance testing

### B. Code Quality:
- ESLint configuration
- TypeScript strict mode
- Code formatting (Prettier)
- Git hooks for quality

### C. Accessibility:
- WCAG compliance
- Keyboard navigation
- Screen reader support
- Color contrast validation

---

## IMPLEMENTATION COMMAND FOR LOVABLE:

```
Please create "Akasaka" - a complete AI copywriting platform that replicates every aspect of Sage.AI including:

1. All 15 pages with exact routing, content, and functionality
2. Complete dashboard system with intelligence generation
3. Full copywriting tools suite (website, ads, emails, social)
4. Dark theme with green accents and premium background effects
5. Supabase backend with authentication, database, and edge functions
6. Comprehensive intelligence system with 4 business types and 4 modes
7. Subscription system with free/premium tiers
8. All UI components, animations, and interactive elements
9. Complete business intelligence generation with OpenAI integration
10. Privacy policy, terms, FAQ, and legal pages

Use the exact color scheme (dark with green accents), component structure, and feature set described above. Implement all intelligence features, copywriting tools, and business automation capabilities. Create a production-ready application with proper error handling, security, and performance optimization.

The final result should be an identical copy of Sage.AI but branded as "Akasaka" with the same functionality, design, and user experience.
```

---

**This blueprint contains every detail needed to recreate the complete Sage.AI application as "Akasaka" including pages, features, design system, backend architecture, and business logic.**