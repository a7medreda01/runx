export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'saas' | 'custom';
  categoryLabel: string;
  summary: string;
  description: string;
  imageUrl: string;
  galleryImages?: string[];
  liveUrl?: string;
  client: string;
  technologies: string[];
  featured?: boolean;
  metrics?: ProjectMetric[];
  year?: string;
  duration?: string;
  role?: string;
  keyFeatures?: string[];
  challengeSolution?: ProjectChallengeSolution[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  bootstrapIcon?: string;
  imageUrl?: string;
  description: string;
  features: string[];
  technologies: string[];
  priceStart?: string;
}

export interface EstimatorOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  icon: string;
}

export interface EstimatorFeature {
  id: string;
  title: string;
  price: number;
}
