import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Users, TrendingDown, MousePointer } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { KPICard } from "./kpi-card";
import { SpendChart } from "./spend-chart";
import { CampaignsTable } from "./campaigns-table";
import { DashboardFilters } from "./filters";
import { useTheme } from "@/hooks/use-theme";
import type { DashboardFilters as Filters } from "@/types";
import {
  fetchClients,
  fetchKPIs,
  fetchCampaignSummaries,
  fetchSpendOverTime,
} from "@/api";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import jsPDF from "jspdf";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
    clientId: null,
    clinicId: null,
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: [
      "kpis",
      filters.dateRange.from,
      filters.dateRange.to,
      filters.clientId,
      filters.clinicId,
    ],
    queryFn: () =>
      fetchKPIs(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.clientId,
        filters.clinicId
      ),
  });

  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: [
      "campaign-summaries",
      filters.dateRange.from,
      filters.dateRange.to,
      filters.clientId,
      filters.clinicId,
    ],
    queryFn: () =>
      fetchCampaignSummaries(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.clientId,
        filters.clinicId
      ),
  });

  const { data: spendData = [], isLoading: spendLoading } = useQuery({
    queryKey: [
      "spend-over-time",
      filters.dateRange.from,
      filters.dateRange.to,
      filters.clientId,
      filters.clinicId,
    ],
    queryFn: () =>
      fetchSpendOverTime(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.clientId,
        filters.clinicId
      ),
  });

  const handleExport = (format: "pdf" | "csv") => {
    if (format === "csv") {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Spend", "Leads", "CPL", "Status"];
    const rows = campaigns.map((c) => [
      c.name,
      c.spend.toString(),
      c.leads.toString(),
      c.cpl.toString(),
      c.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaigns.csv";
    a.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Campaign Report", 20, 20);

    let y = 40;
    campaigns.forEach((campaign) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(
        `${campaign.name}: ${formatCurrency(campaign.spend)} | ${campaign.leads} leads`,
        20,
        y
      );
      y += 10;
    });

    doc.save("campaigns.pdf");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Track your campaign performance
            </p>
          </div>

          <div className="mb-6">
            <DashboardFilters
              filters={filters}
              onFiltersChange={setFilters}
              clients={clients}
              onExport={handleExport}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <KPICard
              title="Total Spend"
              value={formatCurrency(kpis?.spend || 0)}
              icon={DollarSign}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Total Leads"
              value={formatNumber(kpis?.leads || 0)}
              icon={Users}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Cost Per Lead"
              value={formatCurrency(kpis?.cpl || 0)}
              icon={TrendingDown}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Click-Through Rate"
              value={formatPercentage(kpis?.ctr || 0)}
              icon={MousePointer}
              isLoading={kpisLoading}
            />
          </div>

          <div className="mb-6">
            <SpendChart data={spendData} isLoading={spendLoading} />
          </div>

          <CampaignsTable campaigns={campaigns} isLoading={campaignsLoading} />
        </main>
      </div>
    </div>
  );
}
