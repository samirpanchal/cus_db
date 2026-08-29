import { HubLocation, TradeRoute, ExpertiseSlideData } from '../types';

export const LOGO_URL = "/logo.png";

export const EXPERTISE_SLIDES: ExpertiseSlideData[] = [
  {
    id: 'strategic-logistics',
    iconName: 'zap',
    tag: 'Core Competency',
    title: 'Strategic Logistics',
    description: 'End-to-end planning and execution of complex freight movements, ensuring minimal downtime and maximum efficiency across borders.',
    details: {
      keyBenefits: [
        'Real-time IoT vessel tracking and condition monitoring',
        'Dynamic demurrage & detention risk mitigation',
        'Consolidated dry bulk & containerized intermodal chartering'
      ],
      typicalLeadTime: '24-48h dispatch confirmation',
      esgRating: 'Tier 1 Clean Fleet Compliant',
      supportedMaterials: ['Ferrous Scrap', 'Non-Ferrous Alloys', 'Industrial Polymers', 'Agricultural Byproducts']
    },
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 'global-networking',
    iconName: 'globe',
    tag: 'Connectivity',
    title: 'Global Networking',
    description: 'Leveraging our established partnerships across key international ports and trade hubs to provide seamless connectivity.',
    details: {
      keyBenefits: [
        'Direct berthing agreements across 38 deepwater ports',
        'Customs bonded warehousing in Mumbai, Singapore, Rotterdam & Houston',
        'Multilingual on-the-ground port liaisons'
      ],
      typicalLeadTime: 'Instant port clearance prep',
      esgRating: 'LEED Certified Hub Nodes',
      supportedMaterials: ['Heavy Metals', 'Bulk Grain', 'Recycled Plastics', 'Specialty Chemicals']
    },
    accentColor: 'text-teal-600',
    bgColor: 'bg-teal-100'
  },
  {
    id: 'supply-chain-optimization',
    iconName: 'refresh',
    tag: 'Intelligence',
    title: 'Supply Chain Optimization',
    description: 'Data-driven analysis and restructuring of your supply chain to reduce costs, improve speed, and enhance resilience.',
    details: {
      keyBenefits: [
        'Predictive route re-routing during seasonal choke-points',
        'Inventory buffer optimization through bonded stockholding',
        'Automated trade documentation and tariff classification'
      ],
      typicalLeadTime: 'Continuous AI telemetry',
      esgRating: 'Scope 3 Emission Optimization',
      supportedMaterials: ['Recycled Aluminium Ingot', 'Copper Cathodes', 'HDPE/PET Flakes', 'Cardboard Bales']
    },
    accentColor: 'text-slate-900',
    bgColor: 'bg-slate-100'
  },
  {
    id: 'market-penetration',
    iconName: 'trending-up',
    tag: 'Growth',
    title: 'Market Penetration',
    description: 'Strategic guidance and logistical support for businesses looking to expand their operations into new international territories.',
    details: {
      keyBenefits: [
        'In-depth bilateral trade compliance & duty drawback structuring',
        'Local buyer verification and letter of credit (LC) validation',
        'Foreign currency hedging integration for raw material contracts'
      ],
      typicalLeadTime: 'Tailored market roadmap in 5 days',
      esgRating: 'Fair Trade & Ethical Supply Verified',
      supportedMaterials: ['Recycled Steel Billets', 'Biofuels', 'Paper Pulp']
    },
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'sustainable-growth',
    iconName: 'leaf',
    tag: 'Sustainability',
    title: 'Sustainable Growth',
    description: 'Implementing eco-friendly logistical practices and carbon-offset strategies to ensure your growth doesn’t cost the earth.',
    details: {
      keyBenefits: [
        '100% verified recycled content traceability certificates',
        'Green corridor slow-steaming carbon reduction credits',
        'Closed-loop circular economy supply network partnerships'
      ],
      typicalLeadTime: 'Monthly verified carbon reporting',
      esgRating: 'ISO 14001 & ISCC PLUS Certified',
      supportedMaterials: ['Post-Consumer Recycled Resins', 'Green Steel', 'Recycled Lithium Battery Black Mass']
    },
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  }
];

export const GLOBAL_HUBS: HubLocation[] = [
  {
    id: 'hub-mumbai',
    name: 'Mumbai (JNPT & BKC HQ)',
    country: 'India',
    region: 'Asia Pacific',
    lat: 18.948,
    lng: 72.951,
    type: 'Maritime Port',
    activeVessels: 28,
    avgTurnaroundHours: 19.4,
    monthlyTonnage: '420,000 MT',
    specialization: 'Recycled Metals & Polymer Imports, Trade Finance'
  },
  {
    id: 'hub-singapore',
    name: 'Port of Singapore (PSA)',
    country: 'Singapore',
    region: 'Asia Pacific',
    lat: 1.290,
    lng: 103.851,
    type: 'Maritime Port',
    activeVessels: 46,
    avgTurnaroundHours: 14.2,
    monthlyTonnage: '850,000 MT',
    specialization: 'Transshipment Hub, Marine Bunkering, Green Corridors'
  },
  {
    id: 'hub-rotterdam',
    name: 'Port of Rotterdam',
    country: 'Netherlands',
    region: 'Europe',
    lat: 51.924,
    lng: 4.477,
    type: 'Maritime Port',
    activeVessels: 34,
    avgTurnaroundHours: 18.0,
    monthlyTonnage: '620,000 MT',
    specialization: 'EU Circular Economy Gate, Scrap Processing & Biofuels'
  },
  {
    id: 'hub-dubai',
    name: 'Jebel Ali Port (Dubai)',
    country: 'United Arab Emirates',
    region: 'Middle East',
    lat: 25.011,
    lng: 55.061,
    type: 'Maritime Port',
    activeVessels: 22,
    avgTurnaroundHours: 16.5,
    monthlyTonnage: '380,000 MT',
    specialization: 'GCC Raw Material Transit & Cross-Trade Financing'
  },
  {
    id: 'hub-houston',
    name: 'Port of Houston',
    country: 'United States',
    region: 'Americas',
    lat: 29.760,
    lng: -95.369,
    type: 'Maritime Port',
    activeVessels: 19,
    avgTurnaroundHours: 22.1,
    monthlyTonnage: '310,000 MT',
    specialization: 'Chemical Feedstocks, Industrial Steel & Scrap Exports'
  },
  {
    id: 'hub-shanghai',
    name: 'Port of Shanghai',
    country: 'China',
    region: 'Asia Pacific',
    lat: 31.230,
    lng: 121.473,
    type: 'Maritime Port',
    activeVessels: 52,
    avgTurnaroundHours: 17.8,
    monthlyTonnage: '1,100,000 MT',
    specialization: 'High-Volume Containerized Feedstocks & Smelting Inbound'
  },
  {
    id: 'hub-antwerp',
    name: 'Port of Antwerp-Bruges',
    country: 'Belgium',
    region: 'Europe',
    lat: 51.219,
    lng: 4.402,
    type: 'Maritime Port',
    activeVessels: 21,
    avgTurnaroundHours: 20.3,
    monthlyTonnage: '290,000 MT',
    specialization: 'Polymer Pellets, Hazardous Goods & Intermodal Rail'
  },
  {
    id: 'hub-santos',
    name: 'Port of Santos (São Paulo)',
    country: 'Brazil',
    region: 'Americas',
    lat: -23.961,
    lng: -46.332,
    type: 'Maritime Port',
    activeVessels: 15,
    avgTurnaroundHours: 24.5,
    monthlyTonnage: '240,000 MT',
    specialization: 'Agricultural Feedstocks, Cellulose & Metal Concentrates'
  }
];

export const ACTIVE_TRADE_ROUTES: TradeRoute[] = [
  {
    id: 'route-1',
    origin: 'Port of Rotterdam',
    destination: 'Mumbai (JNPT & BKC HQ)',
    transitDays: 18,
    carbonReduction: '-24% via Slow Steaming',
    mode: 'Ocean Freight',
    primaryCargo: 'Recycled Ferrous Scrap & Engineered Polymers'
  },
  {
    id: 'route-2',
    origin: 'Port of Houston',
    destination: 'Jebel Ali Port (Dubai)',
    transitDays: 24,
    carbonReduction: '-19% via Smart Routing',
    mode: 'Ocean Freight',
    primaryCargo: 'Synthetic Resins & High-Grade Copper Scrap'
  },
  {
    id: 'route-3',
    origin: 'Port of Singapore (PSA)',
    destination: 'Mumbai (JNPT & BKC HQ)',
    transitDays: 6,
    carbonReduction: '-32% via Eco-Fuel Feeder',
    mode: 'Ocean Freight',
    primaryCargo: 'Non-Ferrous Ingots & Bio-circular Resins'
  },
  {
    id: 'route-4',
    origin: 'Port of Shanghai',
    destination: 'Port of Antwerp-Bruges',
    transitDays: 28,
    carbonReduction: '-22% via Optimized Hull Chartering',
    mode: 'Ocean Freight',
    primaryCargo: 'Battery Precursors & Solar Silicon Byproducts'
  }
];

export const COMPANY_STATS = [
  { value: '150+', label: 'Countries Served', desc: 'An expansive global footprint reaching every major economic hub.' },
  { value: '99.8%', label: 'Delivery Success', desc: 'Unwavering reliability in critical shipments and operations.' },
  { value: '24/7', label: 'Strategic Support', desc: 'Round-the-clock monitoring and dedicated account management.' },
  { value: '$4.2B+', label: 'Cargo Managed', desc: 'Cumulative value of traded sustainable materials and freight.' }
];

export const COMPANY_VALUES = [
  {
    title: 'Integrity in Commodity Trade',
    description: 'Direct sample assays, independent lab verification, and transparent grading standards on every single consignment.'
  },
  {
    title: 'Closed-Loop Circularity',
    description: 'Dedicated to repurposing industrial scrap, recycled metals, and engineering polymers to lower global carbon footprints.'
  },
  {
    title: 'Resilient Infrastructure',
    description: 'Backed by robust credit lines, marine cargo insurance underwriting, and dedicated deep-sea vessel charters.'
  }
];
