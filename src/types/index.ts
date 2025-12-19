export interface Client {
  id: string;
  name: string;
  clinics: Clinic[];
}

export interface Clinic {
  id: string;
  name: string;
  clientId: string;
}

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  clinicId: string;
  status: 'active' | 'paused' | 'completed';
  dailyStats: DailyStat[];
}

export interface DailyStat {
  date: string;
  spend: number;
  leads: number;
  clicks: number;
  impressions: number;
}

export interface KPI {
  spend: number;
  leads: number;
  cpl: number;
  ctr: number;
}

export interface CampaignSummary {
  id: string;
  name: string;
  spend: number;
  leads: number;
  cpl: number;
  status: 'active' | 'paused' | 'completed';
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DashboardFilters {
  dateRange: DateRange;
  clientId: string | null;
  clinicId: string | null;
}
