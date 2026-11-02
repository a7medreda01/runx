// ─── Generic API Response Wrappers ───────────────────────────────────────────

export interface ApiResponse<T> {
  succeeded: boolean;
  message: string | null;
  data: T;
  errors: string[] | null;
}

export interface PagedData<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// ─── SiteSetting ─────────────────────────────────────────────────────────────

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
}

export interface SiteSettingRequest {
  id: number;
  key: string;
  value: string;
}

// ─── SocialMedia ─────────────────────────────────────────────────────────────

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  companyId: number;
}

export interface SocialMediaRequest {
  id: number;
  platform: string;
  url: string;
  companyId: number;
}

// ─── ContactInfo ─────────────────────────────────────────────────────────────

export interface ContactInfo {
  id: number;
  phone: string;
  whatsApp: string;
  email: string;
  address: string;
  googleMapUrl: string;
  companyId: number;
}

export interface ContactInfoRequest {
  id: number;
  phone: string;
  whatsApp: string;
  email: string;
  address: string;
  googleMapUrl: string;
  companyId: number;
}

// ─── Company ─────────────────────────────────────────────────────────────────

export interface Company {
  id: number;
  name: string;
  logo: string | null;
  coverImage: string | null;
  about: string;
  vision: string;
  mission: string;
  yearsOfExperience: number;
  completedProjects: number;
  satisfiedClients: number;
  uptimeGuarantee: string;
  contactInfo: ContactInfo;
  socialMediaLinks: SocialMedia[];
}

export interface CompanyUpdateForm {
  Name: string;
  About?: string;
  Vision?: string;
  Mission?: string;
  YearsOfExperience?: number;
  CompletedProjects?: number;
  SatisfiedClients?: number;
  UptimeGuarantee?: string;
  Logo?: File;
  CoverImage?: File;
}

// ─── ServiceCategory ─────────────────────────────────────────────────────────

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
}

export interface ServiceCategoryRequest {
  id: number;
  name: string;
  description: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface Service {
  id: number;
  name: string;
  subtitle?: string;
  description: string;
  imageUrl: string | null;
  bootstrapIcon?: string;
  priceStart?: string;
  featuresJson?: string;
  technologiesJson?: string;
  serviceCategoryId: number;
  categoryName: string;
}

export interface ServiceForm {
  Name: string;
  Subtitle?: string;
  Description: string;
  BootstrapIcon?: string;
  PriceStart?: string;
  FeaturesJson?: string;
  TechnologiesJson?: string;
  ServiceCategoryId: number;
  Image?: File;
}

// ─── PackageFeature ──────────────────────────────────────────────────────────

export interface PackageFeature {
  id: number;
  title: string;
  packageId: number;
}

export interface PackageFeatureRequest {
  title: string;
  packageId: number;
}

// ─── Package ─────────────────────────────────────────────────────────────────

export interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string | null;
  features: PackageFeature[];
}

export interface PackageForm {
  Name: string;
  Price: number;
  Description?: string;
  Features?: string[];
  Image?: File;
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface ProjectImage {
  id: number;
  imageUrl: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  coverImage: string | null;
  client?: string;
  duration?: string;
  role?: string;
  liveUrl?: string;
  featured?: boolean;
  executionDate: string;
  technologiesJson?: string;
  keyFeaturesJson?: string;
  metricsJson?: string;
  challengeSolutionsJson?: string;
  serviceCategoryId: number;
  categoryName: string;
  images: ProjectImage[];
}

export interface ProjectForm {
  Name: string;
  Description: string;
  Client?: string;
  Duration?: string;
  Role?: string;
  LiveUrl?: string;
  Featured?: boolean;
  ExecutionDate: string;
  TechnologiesJson?: string;
  KeyFeaturesJson?: string;
  MetricsJson?: string;
  ChallengeSolutionsJson?: string;
  ServiceCategoryId: number;
  Image?: File;
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  referenceId: string;
  createdAt: string;
  status: string;
}

export interface EstimateSubmission {
  id: number;
  projectType: string;
  addonsJson: string;
  timeline: string;
  estimatedPrice: number;
  estimatedDays: number;
  clientName?: string;
  clientContact?: string;
  referenceId: string;
  createdAt: string;
  status: string;
}

// ─── Pagination Params ───────────────────────────────────────────────────────

export interface PaginationParams {
  PageNumber?: number;
  PageSize?: number;
}
