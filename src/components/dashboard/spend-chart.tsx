import { Box, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface SpendChartProps {
  data: { date: string; spend: number }[];
  isLoading?: boolean;
}

export function SpendChart({ data, isLoading }: SpendChartProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const gridColor = useColorModeValue("#E2E8F0", "#2D3748");
  const lineColor = useColorModeValue("#4299E1", "#63B3ED");

  if (isLoading) {
    return (
      <Box bg={bgColor} p="6" borderRadius="20px" boxShadow="sm">
        <Text fontSize="lg" fontWeight="700" mb="4">
          Spend Over Time
        </Text>
        <Skeleton height="300px" />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} p="6" borderRadius="20px" boxShadow="sm">
      <Text fontSize="lg" fontWeight="700" mb="4">
        Spend Over Time
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            fontSize="12px"
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis
            fontSize="12px"
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            formatter={(value) => {
              const num = typeof value === 'number' ? value : Number(value);
              return !isNaN(num) ? formatCurrency(num) : '';
            }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Line
            type="monotone"
            dataKey="spend"
            stroke={lineColor}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
