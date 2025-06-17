
// Core types for the website builder
export interface Block {
  id: string;
  type: string;
  content: any;
  settings: BlockSettings;
}

export interface BlockSettings {
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  visibility?: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

export interface Section {
  id: string;
  type: SectionType;
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
  blocks: Block[];
  settings: SectionSettings;
}

export interface SectionSettings {
  backgroundColor?: string;
  backgroundImage?: string;
  padding?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  margin?: {
    top: number;
    bottom: number;
  };
  fullWidth?: boolean;
  containerWidth?: 'fluid' | 'contained';
}

export type SectionType = 
  // Header Sections
  | 'announcement-bar'
  | 'header'
  | 'mega-menu'
  // Content Sections
  | 'hero'
  | 'rich-text'
  | 'image-with-text'
  | 'video'
  | 'slideshow'
  | 'multicolumn'
  | 'collage'
  | 'newsletter'
  | 'contact-form'
  | 'custom-liquid'
  | 'testimonials'
  | 'faq'
  // Product Sections
  | 'featured-collection'
  | 'featured-product'
  | 'product-info'
  | 'product-media'
  | 'product-form'
  | 'product-recommendations'
  | 'related-products'
  | 'recently-viewed'
  // Footer Sections
  | 'footer'
  | 'email-signup'
  | 'social-media'
  // Page Types
  | 'product-page'
  | 'collection-page'
  | 'blog-page'
  | 'blog-article'
  | 'cart-page'
  | 'search-results'
  | '404-page';

export type BlockType =
  // Text Blocks
  | 'heading'
  | 'text'
  | 'rich-text-block'
  | 'custom-html'
  // Media Blocks
  | 'image'
  | 'video-block'
  | 'image-gallery'
  | 'image-with-text-block'
  // Interactive Blocks
  | 'button'
  | 'link'
  | 'social-icons'
  | 'contact-info'
  // Product Blocks
  | 'product-title'
  | 'product-price'
  | 'product-description'
  | 'product-vendor'
  | 'product-rating'
  | 'buy-button'
  | 'variant-picker'
  | 'quantity-selector'
  // Dynamic Blocks
  | 'collection-list'
  | 'product-list'
  | 'blog-posts'
  | 'testimonials'
  | 'faq-collapsible';

export interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    buttonFont: string;
    headingFontWeight: string;
    bodyFontWeight: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };
  layout: {
    containerWidth: string;
    sectionSpacing: number;
    gridGap: number;
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  responsive: {
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
}

export interface PageTemplate {
  id: string;
  name: string;
  type: 'home' | 'product' | 'collection' | 'blog' | 'blog-article' | 'cart' | 'search' | '404' | 'page';
  sections: Section[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl?: string;
  };
  settings: {
    showInNavigation: boolean;
    requiresAuth: boolean;
    template: string;
  };
}

export interface WebsiteProject {
  id: string;
  name: string;
  pages: PageTemplate[];
  theme: ThemeSettings;
  navigation: NavigationItem[];
  settings: ProjectSettings;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  type: 'page' | 'collection' | 'product' | 'blog' | 'external';
  children?: NavigationItem[];
  icon?: string;
  target?: '_self' | '_blank';
}

export interface ProjectSettings {
  favicon: string;
  logo: string;
  siteName: string;
  siteDescription: string;
  language: string;
  currency: string;
  timezone: string;
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
    hotjar?: string;
  };
  seo: {
    enableSitemap: boolean;
    enableRobots: boolean;
    defaultTitle: string;
    titleSeparator: string;
    socialImage: string;
  };
  ecommerce: {
    enableCart: boolean;
    enableWishlist: boolean;
    enableCompare: boolean;
    taxSettings: any;
    shippingSettings: any;
    paymentMethods: string[];
  };
}
