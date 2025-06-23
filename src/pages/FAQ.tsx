
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  Brain, 
  ShoppingCart, 
  Users, 
  Phone, 
  PenTool,
  CreditCard,
  Shield,
  HelpCircle,
  Zap
} from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      id: "general",
      title: "General",
      icon: HelpCircle,
      color: "bg-blue-100 text-blue-600",
      faqs: [
        {
          question: "What is Sage.ai?",
          answer: "Sage.ai is an all-in-one AI business automation platform that combines e-commerce, marketing, sales, and copywriting automation into one powerful system. We analyze top-performing content across all industries to generate personalized, high-converting templates and strategies for your specific business needs."
        },
        {
          question: "How does Sage.ai work?",
          answer: "Sage.ai uses advanced artificial intelligence to analyze millions of data points from successful businesses across all industries. Our AI then generates personalized recommendations, content, and strategies tailored to your specific business type, goals, and challenges. Everything is automated and optimized for maximum results."
        },
        {
          question: "Who can use Sage.ai?",
          answer: "Sage.ai is designed for businesses of all sizes - from solo entrepreneurs to large enterprises. Whether you're running an e-commerce store, marketing agency, sales team, or need copywriting assistance, our platform adapts to your specific industry and business model."
        },
        {
          question: "What makes Sage.ai different from other tools?",
          answer: "Unlike other tools that focus on single functions, Sage.ai is a comprehensive platform that integrates all your business automation needs. Our AI learns from top performers across industries, ensuring you get proven strategies rather than generic templates. Plus, everything works together seamlessly in one platform."
        }
      ]
    },
    {
      id: "features",
      title: "Features & Capabilities",
      icon: Zap,
      color: "bg-green-100 text-green-600",
      faqs: [
        {
          question: "What features does the Intelligence Suite include?",
          answer: "Our Intelligence Suite provides comprehensive business analysis including competitor research, market positioning, optimization recommendations, and strategic planning. You can choose from full intelligence, copywriting-focused, marketing-focused, or competitor analysis modes."
        },
        {
          question: "How does the E-commerce automation work?",
          answer: "Our e-commerce suite includes AI-powered website building with custom templates, product research tracking 1000+ Shopify stores weekly, automated store optimization, and performance analytics. Everything is designed to maximize conversions and sales."
        },
        {
          question: "What does the Marketing Agency hub offer?",
          answer: "The Agency hub includes intelligent lead scoring, prospect research, multi-platform campaign management, automated client reporting, and lead nurturing workflows. Perfect for agencies managing multiple clients and campaigns."
        },
        {
          question: "How does the AI Copywriting work?",
          answer: "Our AI analyzes high-converting copy across industries to generate personalized content for websites, ads, emails, and social media. The AI learns your brand voice and optimizes for your specific audience and goals."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Plans",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      faqs: [
        {
          question: "What pricing plans are available?",
          answer: "We offer flexible pricing plans to suit businesses of all sizes, from starter plans for individual entrepreneurs to enterprise solutions for large organizations. All plans include core AI features with varying usage limits and advanced capabilities."
        },
        {
          question: "Is there a free trial?",
          answer: "Yes! We offer a free trial so you can experience the power of Sage.ai before committing. The trial includes access to core features with usage limits, allowing you to test the platform with your actual business needs."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments. Your data and settings remain intact when changing plans."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express) and offer annual billing discounts. Enterprise customers can also arrange for invoicing and custom payment terms."
        }
      ]
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      color: "bg-red-100 text-red-600",
      faqs: [
        {
          question: "How secure is my data?",
          answer: "Your data security is our top priority. We use enterprise-grade security including 256-bit encryption, SOC 2 compliance, regular security audits, and secure data centers. Your business information is never shared with third parties."
        },
        {
          question: "Where is my data stored?",
          answer: "All data is stored in secure, encrypted cloud servers with multiple backup locations. We use industry-leading cloud infrastructure providers with 99.9% uptime guarantees and comprehensive disaster recovery procedures."
        },
        {
          question: "Can I export my data?",
          answer: "Yes! You can export all your data at any time in standard formats. We believe in data portability and ensure you always have access to your business information, even if you decide to leave our platform."
        },
        {
          question: "Do you comply with GDPR and other privacy regulations?",
          answer: "Yes, we are fully compliant with GDPR, CCPA, and other major privacy regulations. We provide clear data processing agreements, user consent management, and data deletion capabilities as required by law."
        }
      ]
    },
    {
      id: "support",
      title: "Support & Training",
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      faqs: [
        {
          question: "What support is available?",
          answer: "We provide comprehensive support including 24/7 chat support, detailed documentation, video tutorials, and webinar training sessions. Enterprise customers also get dedicated account managers and priority support."
        },
        {
          question: "How do I get started?",
          answer: "Getting started is easy! Sign up for your account, complete the brief onboarding survey to tell us about your business, and our AI will immediately start generating personalized recommendations. Most users are seeing results within the first hour."
        },
        {
          question: "Do you offer training and onboarding?",
          answer: "Yes! We provide comprehensive onboarding including guided setup, training materials, and best practices. Enterprise customers receive personalized training sessions and ongoing success management."
        },
        {
          question: "How quickly can I see results?",
          answer: "Most users start seeing improvements within the first week of implementation. Our AI provides immediate recommendations, but the full impact typically becomes clear within 30 days as the system learns your business patterns and optimizes performance."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about Sage.ai's features, pricing, security, and more. 
            Can't find what you're looking for? Contact our support team for help.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                    <CardDescription>
                      {category.faqs.length} question{category.faqs.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${category.id}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardContent className="text-center py-12">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed with Sage.ai. Get in touch and we'll 
              respond within 24 hours with detailed answers to your specific questions.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                24/7 Support
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Quick Response
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
