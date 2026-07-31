export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  isPopular: boolean;
}

export interface Model {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  bodyType?: string;
  brand?: Brand;
}

export interface DgtEcoLabel {
  id: string;
  code: 'CERO' | 'ECO' | 'C' | 'B' | 'SIN_ETIQUETA';
  name: string;
  description?: string;
  colorBadge: string;
}

export interface FuelType {
  id: string;
  name: string;
  code: string;
}

export interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
  isMain: boolean;
  displayOrder: number;
}

export interface Dealership {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  whatsapp?: string;
  province: string;
  city?: string;
  logoUrl?: string;
  isPartner: boolean;
}

export interface Vehicle {
  id: string;
  title: string;
  slug: string;
  vin?: string;
  brand: Brand;
  model: Model;
  fuelType: FuelType;
  dgtEcoLabel: DgtEcoLabel;
  dealership?: Dealership;
  price: number;
  originalPrice?: number;
  year: number;
  kilometers: number;
  powerHp: number;
  transmission: 'MANUAL' | 'AUTOMATIC';
  doors: number;
  seats: number;
  color?: string;
  description: string;
  equipment: string[];
  isFeatured: boolean;
  isReserved: boolean;
  isSold: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  viewCount: number;
  images: VehicleImage[];
  createdAt: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  placementId: string;
  type: 'IMAGE' | 'VIDEO' | 'CUSTOM_HTML' | 'GOOGLE_ADSENSE' | 'GOOGLE_AD_MANAGER';
  imageUrl?: string;
  targetUrl?: string;
  customHtml?: string;
  adSenseSlotId?: string;
  priority: number;
  isActive: boolean;
  impressionsCount: number;
  clicksCount: number;
  ctr?: string;
}

export interface LeadRequest {
  id: string;
  type: 'B2B_PARTNER_REQUEST' | 'VEHICLE_INQUIRY' | 'TEST_DRIVE_REQUEST';
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  province: string;
  approxVehicles?: string;
  businessType?: string;
  vehicleId?: string;
  vehicle?: { title: string; slug: string };
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_NEGOTIATION' | 'CLOSED_SUCCESS' | 'DISCARDED';
  notes?: string;
  createdAt: string;
}

export interface TrackingScriptConfig {
  id: string;
  provider: 'GA4' | 'GTM' | 'META_PIXEL' | 'META_CAPI' | 'TIKTOK_PIXEL' | 'LINKEDIN_INSIGHT' | 'MICROSOFT_CLARITY' | 'GOOGLE_SEARCH_CONSOLE';
  trackingId?: string;
  apiSecret?: string;
  isActive: boolean;
  customScriptHtml?: string;
}
