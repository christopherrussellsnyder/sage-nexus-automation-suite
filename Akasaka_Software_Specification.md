# Akasaka - AI Copywriting Software Application Specification

## Application Overview
Create a comprehensive AI-powered copywriting platform called "Akasaka" designed specifically for business owners to generate high-converting copy across all marketing channels and business needs.

## Core Application Features

### 1. Email Marketing Copywriting Generator
- **Welcome Email Sequences**: Onboarding new subscribers with brand introduction and value delivery
- **Newsletter Content**: Regular engagement emails with valuable content and soft promotions
- **Promotional Campaigns**: Sales-focused emails for product launches, discounts, and special offers
- **Abandoned Cart Sequences**: Re-engagement emails to recover lost sales
- **Win-Back Campaigns**: Reactivate dormant subscribers and customers
- **Nurture Sequences**: Educational content to move prospects through the sales funnel
- **Event Promotion**: Webinar, workshop, and event invitation emails

### 2. Advertising Campaign Copywriting
- **Facebook/Instagram Ad Copy**: Headlines, primary text, and call-to-action variations
- **Google Ads Copy**: Search ads, display ads, and YouTube ad scripts
- **LinkedIn Advertising**: B2B-focused professional ad copy
- **TikTok/Social Video Scripts**: Short-form video content scripts
- **Print Advertising**: Magazine, newspaper, and direct mail copy
- **Radio/Podcast Ad Scripts**: Audio advertising content

### 3. Website Copywriting Generator
**Homepage Copy**:
- Hero headlines and subheadlines
- Value propositions and unique selling points
- Main messaging architecture
- Navigation and menu copy

**About Us/Company Pages**:
- Brand story and mission statements
- Company values and culture descriptions
- Team bios and leadership profiles
- Company history and milestone narratives

**Product/Service Pages**:
- Detailed feature and benefit descriptions
- Technical specifications in accessible language
- Value proposition statements
- Pricing justifications and comparisons

**Landing Pages**:
- Campaign-specific targeted messaging
- Conversion-focused headlines and copy
- Lead magnet descriptions
- Promotional page content

### 4. E-commerce and Sales Copy
- **Category Page Copy**: Product category introductions and navigation guidance
- **Shopping Cart Copy**: Checkout process messaging and abandoned cart recovery
- **Product Comparison Pages**: Side-by-side feature and benefit comparisons
- **Pricing Pages**: Value-based pricing explanations and objection handling
- **Upsell/Cross-sell Copy**: Additional product recommendations and bundle offers

### 5. Trust and Social Proof Content
- **Testimonial Formatting**: Customer feedback optimization for maximum impact
- **Case Study Development**: Complete success story narratives
- **FAQ Content**: Comprehensive question and answer sections
- **Review Response Templates**: Professional responses to customer feedback
- **Guarantee and Warranty Copy**: Trust-building policy explanations

### 6. Engagement and Support Copy
- **Blog Post Content**: SEO-optimized articles and thought leadership pieces
- **Newsletter Templates**: Regular communication formats and content ideas
- **Contact Page Copy**: Professional contact information and communication expectations
- **Help Center Content**: Customer support articles and troubleshooting guides
- **Onboarding Documentation**: User guide and tutorial content

### 7. Marketing and Promotional Copy
- **Sales Page Copy**: Long-form conversion-focused landing pages
- **Pop-up and Banner Copy**: Attention-grabbing promotional messages
- **Call-to-Action Optimization**: Button text and surrounding persuasive copy
- **Thank You Page Copy**: Post-conversion messaging and next step guidance
- **Lead Magnet Copy**: Downloadable content descriptions and opt-in forms

### 8. Sales Script Generator
- **Cold Calling Scripts**: Industry-specific phone prospecting scripts
- **Discovery Call Frameworks**: Qualification question sequences
- **Presentation Scripts**: Product demonstration and pitch templates
- **Objection Handling Scripts**: Common objection responses and rebuttals
- **Closing Scripts**: Various closing technique templates
- **Follow-up Sequences**: Multi-touch follow-up communication scripts

## API Integration Specification

### Copywriting Generation API
Create a Supabase Edge Function called "generate-copywriting" that utilizes advanced copywriting methodologies and psychological frameworks:

**Enhanced Marketing Intelligence Criteria Integration**:

**E-Commerce Intelligence Module**:
- Conversion rate benchmarks by industry (Fashion: 2.8-4.2%, Electronics: 2.1-3.8%, Health/Beauty: 3.2-5.1%, Home/Garden: 2.5-4.0%, Food/Beverage: 3.8-6.2%)
- Amazon psychological triggers (social proof stacking, urgency psychology, cognitive load reduction, trust signals)
- Shopify Plus success patterns (69.57% cart abandonment recovery, post-purchase upsells convert at 10-30%, mobile optimization for 79% mobile usage)
- Performance targets (15-25% AOV increases through bundles, 3:1 CLV to CAC ratio minimum, 25-30% email revenue attribution)

**Agency Mastery Module**:
- Lead conversion benchmarks (B2B Services: 15-25% lead-to-meeting rate, SaaS: 5-15% trial-to-paid conversion, Professional Services: 20-35% proposal-to-close rate)
- HubSpot inbound methodology (70% of buyers consume 3+ pieces before engaging sales, multi-touch attribution increases close rates by 208%)
- Advanced lead qualification frameworks (BANT 2.0 enhanced scoring system)
- Challenger sale methodology for 74% higher win rates through insight-led conversations

**Copywriting Excellence Module**:
- Gary Halbert psychology principles (market sophistication awareness with 5 levels, emotional state management, curiosity gap creation drives 78% higher click rates)
- Eugene Schwartz breakthrough advertising framework (mass desire identification, awareness stage matching, functional vs emotional benefits)
- Russell Brunson perfect webinar psychology (origin story creates 234% higher connection, value stacking increases perceived worth by 400-800%)
- Email performance benchmarks (B2B open rates: 21.33%, retail: 18.39%, top performers generate $40+ per email)

**Sales Psychology & Conversion Module**:
- Salesforce excellence model (consultative selling increases close rates by 56%, pipeline management improves accuracy by 89%)
- Neuro-linguistic programming techniques (mirroring builds rapport within 4-7 minutes, language patterns guide thinking)
- Robert Cialdini's influence principles (reciprocity creates 2.7x higher conversion, social proof increases trust by 89%, authority improves close rates by 43%)
- Performance benchmarks (<5 minutes response time increases conversion by 900%, 80% of sales require 5+ follow-ups)

**Advanced Psychological Frameworks**:
- Cognitive Biases & Behavioral Economics (loss aversion drives 65% faster decisions, anchoring bias influences price perception, social proof influences 92% of decisions)
- Decoy effect increases premium sales by 84%, endowment effect through free trials increases conversion by 67%
- Paradox of choice optimization (3 options optimal vs overwhelming with 10+)

**Advertisement Generation Principles**:
- Value-first selling without direct product pushing
- Compelling testimonials showing real solutions and transformations
- No-brainer offers with clear value propositions and risk reversal
- E-commerce specific strategies: order bundles, quantity discounts, product page bumps
- Winning angle research based on business type, niche, and market sophistication

**Email Sequence Optimization**:
- Solution-focused selling vs product features emphasis
- Problem-solving and transformation stories that create emotional connection
- Trust-building through value-first messaging and educational content
- Behavioral trigger integration and personalization strategies

## Website Structure & User Flow

### Navigation & Page Hierarchy
**Header Navigation**:
- Home
- Pricing
- About Us
- Contact
- FAQ

**Footer Navigation**:
- All header navigation items
- Terms of Service (footer only)
- Privacy Policy (footer only)

### User Journey Flow
1. **Landing Page** → User visits main homepage with clear value proposition
2. **Registration** → User signs up and creates account with email verification
3. **Onboarding Survey** → 3-question survey to tailor user experience:
   - Business type/industry
   - Primary copywriting needs
   - Current marketing challenges
4. **Free Trial Access** → Limited feature access upon registration (5 generations per feature type)
5. **Dashboard** → Main interface with all available copywriting features organized by category
6. **Premium Upgrade** → Optional subscription for unlimited feature access and advanced templates

## Technical Implementation Requirements

### Frontend Technology Stack
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling with custom design system
- React Router DOM for navigation
- Shadcn/ui components for consistent UI
- React Hook Form with Zod validation
- Supabase client integration

### Backend Infrastructure
- Supabase for database and authentication
- PostgreSQL database with proper RLS policies
- Edge Functions for AI copywriting generation
- OpenAI API integration for content generation
- Stripe integration for subscription management

### Database Schema Requirements
- Users and profiles tables
- Copywriting templates and generated content storage
- Usage tracking and subscription management
- User preferences and business information storage

### Key Features Implementation
- Real-time copywriting generation with streaming responses
- Template saving and organization system
- Copy history and version management
- Export functionality (PDF, DOCX, TXT formats)
- A/B testing suggestions and performance tracking
- Industry-specific template libraries
- Collaborative features for team accounts

### Design System Requirements
- Professional, modern interface design
- Responsive layout for all devices
- Dark/light mode support
- Accessibility compliance (WCAG 2.1 AA)
- Fast loading times and optimized performance
- Intuitive user experience with clear information hierarchy

## Success Metrics and Performance Targets
- User engagement: Average session duration >10 minutes
- Feature adoption: 80%+ of users try multiple copy types within first week
- Conversion optimization: Generated copy should target industry-standard conversion benchmarks
- User satisfaction: Net Promoter Score >50
- Technical performance: Page load times <2 seconds, API response times <3 seconds

This comprehensive specification provides the foundation for building Akasaka as a professional, AI-powered copywriting platform that serves business owners across all industries and marketing needs.