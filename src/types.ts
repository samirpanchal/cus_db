export interface HubLocation {
  id: string;
  name: string;
  country: string;
  region: 'Asia Pacific' | 'Europe' | 'Middle East' | 'Americas' | 'Africa';
  lat: number;
  lng: number;
  type: 'Maritime Port' | 'Inland Logistics Hub' | 'Air Cargo Terminal' | 'Recycling Facility';
  activeVessels: number;
  avgTurnaroundHours: number;
  monthlyTonnage: string;
  specialization: string;
}

export interface TradeRoute {
  id: string;
  origin: string;
  destination: string;
  transitDays: number;
  carbonReduction: string;
  mode: 'Ocean Freight' | 'Multimodal Rail' | 'Air Express';
  primaryCargo: string;
}

export interface ExpertiseSlideData {
  id: string;
  iconName: 'zap' | 'globe' | 'refresh' | 'trending-up' | 'leaf' | 'shield-check' | 'anchor';
  tag: string;
  title: string;
  description: string;
  details: {
    keyBenefits: string[];
    typicalLeadTime: string;
    esgRating: string;
    supportedMaterials: string[];
  };
  accentColor: string;
  bgColor: string;
}

export interface QuoteRequestData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  originPort: string;
  destinationPort: string;
  cargoType: string;
  estimatedTonnage: number;
  targetTimeline: string;
  specialRequirements: string;
}
