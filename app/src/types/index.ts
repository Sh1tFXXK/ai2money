export interface MonetizationMethod {
  id: string;
  name: string;
  slug: string;
  definition: string;
  short_description: string;
  chain_level: string;
  chain_level_label: string;
  target_audience: string[];
  target_audience_labels: string[];
  billing_unit: string[];
  billing_unit_labels: string[];
  price_anchor_min?: number;
  price_anchor_max?: number;
  price_currency: string;
  price_unit: string;
  cost_structure?: Record<string, number>;
  gross_margin_level: string;
  margin_sensitivity: string[];
  scalability_level: string;
  data_dependency_level: string;
  compute_cost_sensitivity: string;
  sales_model: string[];
  advantages: string[];
  disadvantages: string[];
  applicable_scenarios: string[];
  common_combinations: string[];
  risk_points: string[];
  view_count: number;
  like_count: number;
  case_count: number;
  status: string;
  is_featured: boolean;
  updated_at: string;
}

export interface CasePricingDetails {
  [key: string]: string | number;
  currency: string;
  unit: string;
}

export interface EvidenceLink {
  title: string;
  url: string;
  type: string;
}

export interface CaseMonetization {
  method_id: string;
  name: string;
  is_primary: boolean;
  pricing_details: CasePricingDetails;
  evidence_links: EvidenceLink[];
}

export interface GrowthStage {
  stage: string;
  period: string;
  description: string;
  monetization: string;
}

export interface Competitor {
  id: string;
  name: string;
  comparison: string;
}

export interface Case {
  id: string;
  name: string;
  slug: string;
  company_name: string;
  logo_url?: string;
  description: string;
  short_description: string;
  chain_level: string;
  chain_level_label: string;
  chain_subcategory: string;
  company_type: string;
  company_type_label: string;
  founded_year: number;
  headquarters: string;
  employee_count_range: string;
  valuation_amount?: number;
  valuation_currency?: string;
  valuation_date?: string;
  annual_revenue?: number;
  revenue_currency?: string;
  revenue_year?: number;
  user_count: string;
  monetization_methods: CaseMonetization[];
  growth_path: GrowthStage[];
  competitors: Competitor[];
  view_count: number;
  like_count: number;
  status: string;
  is_featured: boolean;
  updated_at: string;
}

export type ChainLevel = 'all' | 'compute' | 'model' | 'toolchain' | 'application' | 'data' | 'service';
export type TargetAudience = 'all' | 'tob' | 'toc' | 'tod';
export type BillingUnit = 'all' | 'token' | 'seat' | 'gpu_hour' | 'project' | 'commission' | 'subscription' | 'usage' | 'license' | 'performance';

export interface FilterState {
  chainLevel: ChainLevel;
  targetAudience: TargetAudience;
  billingUnit: BillingUnit;
  searchQuery: string;
}

export interface CanvasInput {
  productType: string;
  targetCustomer: string;
  valuePropositions: string[];
  costStructure: string[];
  description: string;
}

export interface CanvasRecommendation {
  rank: number;
  confidence: number;
  name: string;
  reasoning: string;
  pricing_anchor: {
    min: number;
    max: number;
    unit: string;
    currency: string;
  };
  referenced_cases: {
    id: string;
    name: string;
    relevance: string;
  }[];
  mvp_path: string[];
  validation_checklist: string[];
  risk_warnings: string[];
}
