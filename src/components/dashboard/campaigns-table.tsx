import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { CampaignSummary } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface CampaignsTableProps {
  campaigns: CampaignSummary[];
  isLoading?: boolean;
}

export function CampaignsTable({ campaigns, isLoading }: CampaignsTableProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.50", "gray.700");

  if (isLoading) {
    return (
      <Box bg={bgColor} p="6" borderRadius="20px" boxShadow="sm">
        <Text fontSize="lg" fontWeight="700" mb="4">
          Campaigns
        </Text>
        <Skeleton height="400px" />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} p="6" borderRadius="20px" boxShadow="sm" overflowX="auto">
      <Text fontSize="lg" fontWeight="700" mb="4">
        Campaigns
      </Text>
      <Table variant="simple">
        <Thead bg={headerBg}>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Spend</Th>
            <Th isNumeric>Leads</Th>
            <Th isNumeric>CPL</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map((campaign) => (
            <Tr key={campaign.id}>
              <Td fontWeight="500">{campaign.name}</Td>
              <Td isNumeric>{formatCurrency(campaign.spend)}</Td>
              <Td isNumeric>{formatNumber(campaign.leads)}</Td>
              <Td isNumeric>{formatCurrency(campaign.cpl)}</Td>
              <Td>
                <Badge
                  colorScheme={
                    campaign.status === "active"
                      ? "green"
                      : campaign.status === "paused"
                      ? "yellow"
                      : "gray"
                  }
                  borderRadius="8px"
                  px="3"
                  py="1"
                >
                  {campaign.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
