import type { Client, Campaign, KPI, CampaignSummary } from "@/types";
import {
  mockClients,
  mockKPIs,
  mockCampaignSummaries,
  mockSpendOverTime,
} from "./mock-data";

const API_BASE = "/api";
const USE_MOCK_DATA = true;

export async function fetchClients(): Promise<Client[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockClients), 500);
    });
  }
  const response = await fetch(`${API_BASE}/clients`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const response = await fetch(`${API_BASE}/campaigns`);
  if (!response.ok) throw new Error("Failed to fetch campaigns");
  return response.json();
}

export async function fetchKPIs(
  startDate?: Date,
  endDate?: Date,
  clientId?: string | null,
  clinicId?: string | null
): Promise<KPI> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockKPIs), 500);
    });
  }
  const params = new URLSearchParams();
  if (startDate) params.append("start_date", startDate.toISOString());
  if (endDate) params.append("end_date", endDate.toISOString());
  if (clientId) params.append("client_id", clientId);
  if (clinicId) params.append("clinic_id", clinicId);

  const response = await fetch(`${API_BASE}/kpis?${params}`);
  if (!response.ok) throw new Error("Failed to fetch KPIs");
  return response.json();
}

export async function fetchCampaignSummaries(
  startDate?: Date,
  endDate?: Date,
  clientId?: string | null,
  clinicId?: string | null
): Promise<CampaignSummary[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampaignSummaries), 500);
    });
  }
  const params = new URLSearchParams();
  if (startDate) params.append("start_date", startDate.toISOString());
  if (endDate) params.append("end_date", endDate.toISOString());
  if (clientId) params.append("client_id", clientId);
  if (clinicId) params.append("clinic_id", clinicId);

  const response = await fetch(`${API_BASE}/campaign-summaries?${params}`);
  if (!response.ok) throw new Error("Failed to fetch campaign summaries");
  return response.json();
}

export async function fetchSpendOverTime(
  startDate?: Date,
  endDate?: Date,
  clientId?: string | null,
  clinicId?: string | null
): Promise<{ date: string; spend: number }[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSpendOverTime), 500);
    });
  }
  const params = new URLSearchParams();
  if (startDate) params.append("start_date", startDate.toISOString());
  if (endDate) params.append("end_date", endDate.toISOString());
  if (clientId) params.append("client_id", clientId);
  if (clinicId) params.append("clinic_id", clinicId);

  const response = await fetch(`${API_BASE}/spend-over-time?${params}`);
  if (!response.ok) throw new Error("Failed to fetch spend data");
  return response.json();
}
