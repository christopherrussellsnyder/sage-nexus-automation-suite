
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Sparkles, Plus, Trash2, Upload, ShoppingCart, Calendar, Users, FileText } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  variations: ProductVariation[];
}

interface ProductVariation {
  id: string;
  name: string;
  value: string;
  priceModifier?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  businessHours: string;
}

interface ShippingInfo {
  shippingMethods: string[];
  freeShippingThreshold?: string;
  shippingZones: string[];
}

interface EnhancedWebsiteData {
  // Basic Business Info
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
  businessType: 'ecommerce' | 'service' | 'agency';
  
  // Contact Information
  contactInfo: ContactInfo;
  
  // Logo
  logoUrl?: string;
  logoFile?: File;
  
  // Products (for e-commerce)
  products: Product[];
  
  // Services (for service-based businesses)
  services: Service[];
  
  // Calendly Integration (for service businesses)
  calendlyLink?: string;
  
  // Shipping Information (for e-commerce)
  shippingInfo: ShippingInfo;
  
  // Payment Processing
  paymentMethods: string[];
  
  // Reviews/Testimonials
  reviews: Array<{
    id: string;
    customerName: string;
    rating: number;
    review: string;
    date?: string;
  }>;
  
  // FAQ Data
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  
  // Policy Requirements
  needsPrivacyPolicy: boolean;
  needsTermsOfService: boolean;
  needsRefundPolicy: boolean;
  needsShippingPolicy: boolean;
}

interface EnhancedWebsiteBuilderFormProps {
  onGenerate: (data: EnhancedWebsiteData) => void;
  isGenerating: boolean;
  progress: number;
}

const EnhancedWebsiteBuilderForm = ({ onGenerate, isGenerating, progress }: EnhancedWebsiteBuilderFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EnhancedWebsiteData>({
    businessName: '',
    businessDescription: '',
    industry: '',
    targetAudience: '',
    colorScheme: '',
    businessGoals: '',
    existingWebsite: '',
    businessType: 'ecommerce',
    contactInfo: {
      phone: '',
      email: '',
      address: '',
      businessHours: ''
    },
    products: [],
    services: [],
    shippingInfo: {
      shippingMethods: [],
      shippingZones: []
    },
    paymentMethods: [],
    reviews: [],
    faqs: [],
    needsPrivacyPolicy: true,
    needsTermsOfService: true,
    needsRefundPolicy: true,
    needsShippingPolicy: true
  });

  const industries = [
    'Fashion & Apparel', 'Electronics & Tech', 'Food & Beverage', 'Health & Beauty',
    'Home & Garden', 'Sports & Fitness', 'Automotive', 'Education', 'Professional Services',
    'Real Estate', 'Financial Services', 'Entertainment', 'Travel & Tourism', 'Consulting',
    'Marketing & Advertising', 'Coaching', 'Other'
  ];

  const colorSchemes = [
    'Professional Blue', 'Modern Black & White', 'Vibrant Green', 'Elegant Purple',
    'Warm Orange', 'Cool Gray', 'Bold Red', 'Calming Teal', 'Custom Colors'
  ];

  const businessGoals = [
    'Increase Online Sales', 'Generate More Leads', 'Build Brand Awareness',
    'Improve Customer Engagement', 'Showcase Portfolio', 'Provide Information',
    'Book Appointments', 'Sell Services Online'
  ];

  const paymentOptions = [
    'Stripe', 'PayPal', 'Square', 'Authorize.net', 'Apple Pay', 'Google Pay', 'Bank Transfer'
  ];

  const steps = [
    { id: 'basic', title: 'Basic Info', icon: Globe },
    { id: 'contact', title: 'Contact & Branding', icon: FileText },
    { id: 'business-specific', title: 'Business Details', icon: formData.businessType === 'ecommerce' ? ShoppingCart : formData.businessType === 'service' ? Calendar : Users },
    { id: 'content', title: 'Content & Reviews', icon: Users },
    { id: 'policies', title: 'Policies & Legal', icon: FileText }
  ];

  const updateField = (field: keyof EnhancedWebsiteData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      variations: []
    };
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (productId: string, field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    }));
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== productId)
    }));
  };

  const addProductVariation = (productId: string) => {
    const newVariation: ProductVariation = {
      id: Date.now().toString(),
      name: '',
      value: ''
    };
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId 
          ? { ...product, variations: [...product.variations, newVariation] }
          : product
      )
    }));
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      duration: ''
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (serviceId: string, field: keyof Service, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    }));
  };

  const removeService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== serviceId)
    }));
  };

  const addReview = () => {
    const newReview = {
      id: Date.now().toString(),
      customerName: '',
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0]
    };
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));
  };

  const addFAQ = () => {
    const newFAQ = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    };
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return formData.businessName && formData.businessDescription && 
               formData.industry && formData.targetAudience;
      case 1:
        return formData.contactInfo.email && formData.contactInfo.phone;
      default:
        return true;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Enhanced AI Website Builder</span>
        </CardTitle>
        <CardDescription>
          Complete business website generator with advanced customization
        </CardDescription>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Business Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => updateField('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce (Selling Products)</SelectItem>
                    <SelectItem value="service">Service-Based Business</SelectItem>
                    <SelectItem value="agency">Agency/Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description *</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Describe what your business does and what makes it unique"
                  value={formData.businessDescription}
                  onChange={(e) => updateField('businessDescription', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => updateField('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Young professionals, Small business owners"
                  value={formData.targetAudience}
                  onChange={(e) => updateField('targetAudience', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact & Branding */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information & Branding</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@yourbusiness.com"
                    value={formData.contactInfo.email}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone *</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={formData.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main St, City, State 12345"
                  value={formData.contactInfo.address}
                  onChange={(e) => updateContactInfo('address', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input
                  id="businessHours"
                  placeholder="Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
                  value={formData.contactInfo.businessHours}
                  onChange={(e) => updateContactInfo('businessHours', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload logo or provide URL</p>
                  <Input
                    placeholder="https://yourlogo.com/logo.png"
                    value={formData.logoUrl || ''}
                    onChange={(e) => updateField('logoUrl', e.target.value)}
                    className="mb-2"
                  />
                  <Button type="button" variant="outline" size="sm">
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Business-Specific Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Business-Specific Details</h3>
              
              {formData.businessType === 'ecommerce' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Products</Label>
                    <Button type="button" onClick={addProduct} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                  
                  {formData.products.map((product, index) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Product {index + 1}</Badge>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Product Name</Label>
                          <Input
                            placeholder="Product name"
                            value={product.name}
                            onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input
                            placeholder="$29.99"
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Product Description</Label>
                        <Textarea
                          placeholder="Describe your product..."
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Product Image URL</Label>
                        <Input
                          placeholder="https://example.com/product-image.jpg"
                          value={product.imageUrl}
                          onChange={(e) => updateProduct(product.id, 'imageUrl', e.target.value)}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm">Product Variations (Size, Color, etc.)</Label>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline"
                            onClick={() => addProductVariation(product.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Variation
                          </Button>
                        </div>
                        
                        {product.variations.map((variation, vIndex) => (
                          <div key={variation.id} className="grid grid-cols-2 gap-2 mb-2">
                            <Input
                              placeholder="Size, Color, Style..."
                              value={variation.name}
                              onChange={(e) => {
                                const updatedVariations = product.variations.map(v =>
                                  v.id === variation.id ? { ...v, name: e.target.value } : v
                                );
                                updateProduct(product.id, 'variations', updatedVariations);
                              }}
                            />
                            <Input
                              placeholder="Small, Red, Classic..."
                              value={variation.value}
                              onChange={(e) => {
                                const updatedVariations = product.variations.map(v =>
                                  v.id === variation.id ? { ...v, value: e.target.value } : v
                                );
                                updateProduct(product.id, 'variations', updatedVariations);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {(formData.businessType === 'service' || formData.businessType === 'agency') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calendlyLink">Calendly Booking Link</Label>
                    <Input
                      id="calendlyLink"
                      placeholder="https://calendly.com/yourbusiness/meeting"
                      value={formData.calendlyLink || ''}
                      onChange={(e) => updateField('calendlyLink', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Services Offered</Label>
                    <Button type="button" onClick={addService} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                  
                  {formData.services.map((service, index) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Service {index + 1}</Badge>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Service Name</Label>
                          <Input
                            placeholder="Consultation, Strategy Session..."
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input
                            placeholder="$199"
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Service Description</Label>
                        <Textarea
                          placeholder="Describe your service..."
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Duration</Label>
                        <Input
                          placeholder="1 hour, 30 minutes..."
                          value={service.duration || ''}
                          onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Content & Reviews */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Content & Social Proof</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Customer Reviews</Label>
                  <Button type="button" onClick={addReview} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Review
                  </Button>
                </div>
                
                {formData.reviews.map((review, index) => (
                  <Card key={review.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Customer Name</Label>
                        <Input
                          placeholder="John Smith"
                          value={review.customerName}
                          onChange={(e) => {
                            const updatedReviews = formData.reviews.map(r =>
                              r.id === review.id ? { ...r, customerName: e.target.value } : r
                            );
                            updateField('reviews', updatedReviews);
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <Select 
                          value={review.rating.toString()} 
                          onValueChange={(value) => {
                            const updatedReviews = formData.reviews.map(r =>
                              r.id === review.id ? { ...r, rating: parseInt(value) } : r
                            );
                            updateField('reviews', updatedReviews);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label>Review Text</Label>
                      <Textarea
                        placeholder="Great service and excellent results..."
                        value={review.review}
                        onChange={(e) => {
                          const updatedReviews = formData.reviews.map(r =>
                            r.id === review.id ? { ...r, review: e.target.value } : r
                          );
                          updateField('reviews', updatedReviews);
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">FAQ Section</Label>
                  <Button type="button" onClick={addFAQ} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
                
                {formData.faqs.map((faq, index) => (
                  <Card key={faq.id} className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                          placeholder="What is your return policy?"
                          value={faq.question}
                          onChange={(e) => {
                            const updatedFAQs = formData.faqs.map(f =>
                              f.id === faq.id ? { ...f, question: e.target.value } : f
                            );
                            updateField('faqs', updatedFAQs);
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                          placeholder="We offer a 30-day return policy..."
                          value={faq.answer}
                          onChange={(e) => {
                            const updatedFAQs = formData.faqs.map(f =>
                              f.id === faq.id ? { ...f, answer: e.target.value } : f
                            );
                            updateField('faqs', updatedFAQs);
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Policies & Legal */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Policies & Legal Pages</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Required Policy Pages</Label>
                  <p className="text-sm text-muted-foreground">
                    We'll automatically generate appropriate policies based on your business type
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      checked={formData.needsPrivacyPolicy}
                      onChange={(e) => updateField('needsPrivacyPolicy', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="termsOfService"
                      checked={formData.needsTermsOfService}
                      onChange={(e) => updateField('needsTermsOfService', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="termsOfService">Terms of Service</Label>
                  </div>
                  
                  {formData.businessType === 'ecommerce' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="refundPolicy"
                          checked={formData.needsRefundPolicy}
                          onChange={(e) => updateField('needsRefundPolicy', e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="refundPolicy">Refund Policy</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="shippingPolicy"
                          checked={formData.needsShippingPolicy}
                          onChange={(e) => updateField('needsShippingPolicy', e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="shippingPolicy">Shipping Policy</Label>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethods">Payment Methods</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {paymentOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={option}
                        checked={formData.paymentMethods.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateField('paymentMethods', [...formData.paymentMethods, option]);
                          } else {
                            updateField('paymentMethods', formData.paymentMethods.filter(m => m !== option));
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation and Progress */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating your enhanced website...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <div className="flex items-center justify-between pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isGenerating || !isStepValid(currentStep)}
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating Website...' : 'Generate Enhanced Website'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedWebsiteBuilderForm;
