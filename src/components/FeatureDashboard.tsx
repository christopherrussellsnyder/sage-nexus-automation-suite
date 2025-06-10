
import { useState } from 'react';
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useTemplateManager } from "@/hooks/useTemplateManager";
import HeroSection from "./dashboard/HeroSection";
import StatsGrid from "./dashboard/StatsGrid";
import FeatureCard from "./dashboard/FeatureCard";
import ValueProposition from "./dashboard/ValueProposition";
import DashboardSidebar from "./dashboard/DashboardSidebar";
import { 
  Globe, 
  Megaphone, 
  Mail, 
  Share2
} from "lucide-react";

const FeatureDashboard = () => {
  const { usage, subscription, getRemainingUsage } = useUsageTracking();
  const { templates, getFavoriteTemplates } = useTemplateManager();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const isPremium = subscription?.subscription_type === 'premium';

  // Add debugging to see what's happening
  console.log('FeatureDashboard - Usage data:', usage);
  console.log('FeatureDashboard - Subscription data:', subscription);
  console.log('FeatureDashboard - Templates data:', templates);

  const features = [
    {
      title: 'Website Copy',
      description: 'Generate high-converting website copy with section-by-section breakdowns',
      icon: Globe,
      color: 'bg-blue-500',
      path: '/website-copy',
      remaining: getRemainingUsage('website'),
      used: usage.website || 0
    },
    {
      title: 'Ad Copy',
      description: 'Create compelling ad copy for all major social media platforms',
      icon: Megaphone,
      color: 'bg-green-500',
      path: '/ad-copy',
      remaining: getRemainingUsage('advertising'),
      used: usage.advertising || 0
    },
    {
      title: 'Email Sequences',
      description: '7 different email types optimized for maximum engagement',
      icon: Mail,
      color: 'bg-purple-500',
      path: '/email-sequences',
      remaining: getRemainingUsage('email'),
      used: usage.email || 0
    },
    {
      title: 'Social Content',
      description: 'Viral-worthy social media content with complete captions',
      icon: Share2,
      color: 'bg-orange-500',
      path: '/social-content',
      remaining: getRemainingUsage('social'),
      used: usage.social || 0
    }
  ];

  // Add debugging button to see what's happening
  const handleDebug = () => {
    const debugData = {
      usage,
      subscription,
      templates,
      isPremium,
      features: features.map(f => ({
        title: f.title,
        remaining: f.remaining,
        used: f.used
      }))
    };
    setDebugInfo(debugData);
    console.log('Debug Info:', debugData);
  };

  const favoriteTemplates = getFavoriteTemplates();

  return (
    <div className="space-y-8">
      <HeroSection 
        isPremium={isPremium} 
        debugInfo={debugInfo} 
        onDebug={handleDebug} 
      />

      <StatsGrid />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Features */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Copy Generation Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  feature={feature} 
                  isPremium={isPremium}
                />
              ))}
            </div>
          </div>

          <ValueProposition />
        </div>

        {/* Sidebar */}
        <DashboardSidebar 
          favoriteTemplates={favoriteTemplates} 
          isPremium={isPremium}
        />
      </div>
    </div>
  );
};

export default FeatureDashboard;
