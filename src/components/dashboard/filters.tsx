import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCalendarToday, MdFileDownload, MdExpandMore } from "react-icons/md";
import { format } from "date-fns";
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
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const selectedClient = clients.find((c) => c.id === filters.clientId);
  const clinics = selectedClient?.clinics || [];

  const handlePreset = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    onFiltersChange({ ...filters, dateRange: { from, to } });
  };

  return (
    <Flex gap="4" flexWrap="wrap" alignItems="center">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<MdExpandMore />}
          leftIcon={<MdCalendarToday />}
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="15px"
          fontWeight="500"
          _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
        >
          {filters.dateRange.from && filters.dateRange.to
            ? `${format(filters.dateRange.from, "MMM dd, yyyy")} - ${format(
                filters.dateRange.to,
                "MMM dd, yyyy"
              )}`
            : "Select Date Range"}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handlePreset(7)}>Last 7 days</MenuItem>
          <MenuItem onClick={() => handlePreset(30)}>Last 30 days</MenuItem>
          <MenuItem onClick={() => handlePreset(90)}>Last 90 days</MenuItem>
        </MenuList>
      </Menu>

      <Select
        value={filters.clientId || ""}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            clientId: e.target.value || null,
            clinicId: null,
          })
        }
        bg={bgColor}
        borderColor={borderColor}
        borderRadius="15px"
        w="200px"
        fontWeight="500"
      >
        <option value="">All Clients</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </Select>

      <Select
        value={filters.clinicId || ""}
        onChange={(e) =>
          onFiltersChange({ ...filters, clinicId: e.target.value || null })
        }
        bg={bgColor}
        borderColor={borderColor}
        borderRadius="15px"
        w="200px"
        fontWeight="500"
        isDisabled={!filters.clientId}
      >
        <option value="">All Clinics</option>
        {clinics.map((clinic) => (
          <option key={clinic.id} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </Select>

      <Box ml="auto" display="flex" gap="2">
        <Button
          leftIcon={<MdFileDownload />}
          variant="outline"
          borderRadius="15px"
          onClick={() => onExport("csv")}
        >
          CSV
        </Button>
        <Button
          leftIcon={<MdFileDownload />}
          variant="outline"
          borderRadius="15px"
          onClick={() => onExport("pdf")}
        >
          PDF
        </Button>
      </Box>
    </Flex>
  );
}
