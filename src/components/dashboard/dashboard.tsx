import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, Grid, Heading, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { MdAttachMoney, MdPeople, MdTrendingDown, MdMouse } from "react-icons/md";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { KPICard } from "./kpi-card";
import { SpendChart } from "./spend-chart";
import { CampaignsTable } from "./campaigns-table";
import { DashboardFilters } from "./filters";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.50", "gray.900");

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
    <Flex h="100vh" overflow="hidden">
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Box
        flex="1"
        ml={{ base: 0, md: "250px" }}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Header onMenuClick={onOpen} />

        <Box flex="1" overflow="auto" bg={bgColor} p="6">
          <Box mb="6">
            <Heading size="lg" mb="2">
              Carteric Dashboard
            </Heading>
            <Text color="gray.500">Track your campaign performance</Text>
          </Box>

          <Box mb="6">
            <DashboardFilters
              filters={filters}
              onFiltersChange={setFilters}
              clients={clients}
              onExport={handleExport}
            />
          </Box>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap="6"
            mb="6"
          >
            <KPICard
              title="Total Spend"
              value={formatCurrency(kpis?.spend || 0)}
              icon={MdAttachMoney}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Total Leads"
              value={formatNumber(kpis?.leads || 0)}
              icon={MdPeople}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Cost Per Lead"
              value={formatCurrency(kpis?.cpl || 0)}
              icon={MdTrendingDown}
              isLoading={kpisLoading}
            />
            <KPICard
              title="Click-Through Rate"
              value={formatPercentage(kpis?.ctr || 0)}
              icon={MdMouse}
              isLoading={kpisLoading}
            />
          </Grid>

          <Box mb="6">
            <SpendChart data={spendData} isLoading={spendLoading} />
          </Box>

          <CampaignsTable campaigns={campaigns} isLoading={campaignsLoading} />
        </Box>
      </Box>
    </Flex>
  );
}
