import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { DashboardFilters as Filters, Client } from "@/types";

interface FiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  clients: Client[];
  onExport: (format: "pdf" | "csv") => void;
}

export function DashboardFilters({
  filters,
  onFiltersChange,
  clients,
  onExport,
}: FiltersProps) {
  const selectedClient = clients.find((c) => c.id === filters.clientId);
  const clinics = selectedClient?.clinics || [];

  const clientOptions = [
    { value: "", label: "All Clients" },
    ...clients.map((c) => ({ value: c.id, label: c.name })),
  ];

  const clinicOptions = [
    { value: "", label: "All Clinics" },
    ...clinics.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DatePicker
        dateRange={filters.dateRange}
        onDateRangeChange={(dateRange) =>
          onFiltersChange({ ...filters, dateRange })
        }
      />

      <Select
        options={clientOptions}
        value={filters.clientId || ""}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            clientId: e.target.value || null,
            clinicId: null,
          })
        }
      />

      <Select
        options={clinicOptions}
        value={filters.clinicId || ""}
        onChange={(e) =>
          onFiltersChange({ ...filters, clinicId: e.target.value || null })
        }
        disabled={!filters.clientId}
      />

      <div className="ml-auto flex gap-2">
        <Button variant="outline" onClick={() => onExport("csv")}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => onExport("pdf")}>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
