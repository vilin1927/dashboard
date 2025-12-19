import type { Client, Campaign, KPI, CampaignSummary } from "@/types";

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Healthcare Group A",
    clinics: [
      { id: "1-1", name: "Downtown Clinic", clientId: "1" },
      { id: "1-2", name: "Uptown Clinic", clientId: "1" },
    ],
  },
  {
    id: "2",
    name: "Medical Partners B",
    clinics: [
      { id: "2-1", name: "East Side Clinic", clientId: "2" },
      { id: "2-2", name: "West Side Clinic", clientId: "2" },
    ],
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Spring Promotion 2025",
    clientId: "1",
    clinicId: "1-1",
    status: "active",
    dailyStats: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      spend: Math.random() * 500 + 200,
      leads: Math.floor(Math.random() * 20 + 5),
      clicks: Math.floor(Math.random() * 200 + 50),
      impressions: Math.floor(Math.random() * 5000 + 1000),
    })),
  },
  {
    id: "c2",
    name: "Summer Campaign",
    clientId: "1",
    clinicId: "1-2",
    status: "active",
    dailyStats: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      spend: Math.random() * 400 + 150,
      leads: Math.floor(Math.random() * 15 + 3),
      clicks: Math.floor(Math.random() * 150 + 40),
      impressions: Math.floor(Math.random() * 4000 + 800),
    })),
  },
  {
    id: "c3",
    name: "Q2 Lead Generation",
    clientId: "2",
    clinicId: "2-1",
    status: "paused",
    dailyStats: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      spend: Math.random() * 300 + 100,
      leads: Math.floor(Math.random() * 10 + 2),
      clicks: Math.floor(Math.random() * 100 + 30),
      impressions: Math.floor(Math.random() * 3000 + 600),
    })),
  },
];

export const mockKPIs: KPI = {
  spend: 25430,
  leads: 342,
  cpl: 74.36,
  ctr: 2.34,
};

export const mockCampaignSummaries: CampaignSummary[] = [
  {
    id: "c1",
    name: "Spring Promotion 2025",
    spend: 12500,
    leads: 168,
    cpl: 74.4,
    status: "active",
  },
  {
    id: "c2",
    name: "Summer Campaign",
    spend: 8200,
    leads: 112,
    cpl: 73.2,
    status: "active",
  },
  {
    id: "c3",
    name: "Q2 Lead Generation",
    spend: 4730,
    leads: 62,
    cpl: 76.3,
    status: "paused",
  },
];

export const mockSpendOverTime = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  spend: Math.random() * 1000 + 500,
}));
