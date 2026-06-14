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
  contactInfo: ContactInfo;
  socialMediaLinks: SocialMedia[];
}

// CompanyUpdateRequest uses FormData (multipart/form-data)
export interface CompanyUpdateForm {
  Name: string;
  About?: string;
  Vision?: string;
  Mission?: string;
  YearsOfExperience?: number;
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
  description: string;
  imageUrl: string | null;
  serviceCategoryId: number;
  categoryName: string;
}

// Service create/update uses FormData (multipart/form-data)
export interface ServiceForm {
  Name: string;
  Description: string;
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

// Package create/update uses FormData (multipart/form-data)
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
  executionDate: string;
  serviceCategoryId: number;
  categoryName: string;
  images: ProjectImage[];
}

// Project create/update uses FormData (multipart/form-data)
export interface ProjectForm {
  Name: string;
  Description: string;
  ExecutionDate: string;
  ServiceCategoryId: number;
  Image?: File;
}

// ─── Pagination Params ───────────────────────────────────────────────────────

export interface PaginationParams {
  PageNumber?: number;
  PageSize?: number;
}
