
-- Users and Authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  business_type VARCHAR(50),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Profiles
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  company_name VARCHAR(255),
  industry VARCHAR(100),
  business_goals TEXT[],
  target_audience TEXT,
  monthly_budget INTEGER,
  team_size VARCHAR(50),
  current_tools TEXT[],
  pain_points TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Client Management
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  industry VARCHAR(100),
  website VARCHAR(255),
  contact_info JSONB,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaign Management
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'ecommerce', 'agency', 'sales', 'copywriting'
  platforms JSONB, -- ['facebook', 'google', 'linkedin', etc.]
  budget DECIMAL(10,2),
  duration VARCHAR(50),
  objectives TEXT[],
  target_audience TEXT,
  key_messages TEXT,
  competitors TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  performance_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lead Management
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  company VARCHAR(255),
  job_title VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  score INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'qualified', 'contacted', 'nurturing', 'closed'
  source VARCHAR(100),
  nurturing_stage VARCHAR(50),
  engagement_level INTEGER DEFAULT 0,
  last_activity TIMESTAMP,
  notes TEXT,
  custom_fields JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Research
CREATE TABLE trending_products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2),
  store_url VARCHAR(500),
  store_name VARCHAR(255),
  image_urls JSONB,
  conversion_indicators JSONB,
  trending_score INTEGER,
  sales_velocity VARCHAR(50),
  rating DECIMAL(3,2),
  week_discovered DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Website Templates
CREATE TABLE website_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  industry VARCHAR(100),
  features TEXT[],
  preview_description TEXT,
  template_data JSONB, -- Contains the actual template structure
  is_popular BOOLEAN DEFAULT FALSE,
  is_mobile_optimized BOOLEAN DEFAULT TRUE,
  has_ecommerce BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sales Sequences
CREATE TABLE sales_sequences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  steps JSONB, -- Array of sequence steps
  is_active BOOLEAN DEFAULT FALSE,
  total_steps INTEGER,
  avg_response_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Prospect Research
CREATE TABLE prospect_research (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  prospect_name VARCHAR(255),
  company_name VARCHAR(255),
  linkedin_url VARCHAR(500),
  company_website VARCHAR(500),
  industry VARCHAR(100),
  location VARCHAR(255),
  research_data JSONB, -- Contains all the AI-generated insights
  qualification_score INTEGER,
  research_date TIMESTAMP DEFAULT NOW()
);

-- Copywriting Projects
CREATE TABLE copywriting_projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'website', 'ad', 'email', 'social'
  brand_voice TEXT,
  target_audience TEXT,
  goals TEXT[],
  generated_content JSONB,
  performance_metrics JSONB,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usage Tracking
CREATE TABLE usage_tracking (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  feature_type VARCHAR(100), -- 'website_generation', 'product_research', 'copy_generation', etc.
  usage_count INTEGER DEFAULT 1,
  usage_date DATE DEFAULT CURRENT_DATE,
  metadata JSONB,
  UNIQUE(user_id, feature_type, usage_date)
);

-- Subscription Plans
CREATE TABLE subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  billing_cycle VARCHAR(50), -- 'monthly', 'yearly'
  features JSONB,
  limits JSONB, -- Usage limits for different features
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES subscription_plans(id),
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'past_due'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_trending_products_score ON trending_products(trending_score DESC);
CREATE INDEX idx_usage_tracking_user_date ON usage_tracking(user_id, usage_date);
