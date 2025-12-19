import { Box, Flex, Icon, Skeleton, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface KPICardProps {
  title: string;
  value: string;
  icon: IconType;
  isLoading?: boolean;
}

export function KPICard({ title, value, icon, isLoading }: KPICardProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const iconBg = useColorModeValue("brand.50", "brand.900");
  const iconColor = useColorModeValue("brand.500", "white");

  return (
    <Box
      bg={bgColor}
      p="6"
      borderRadius="20px"
      boxShadow="sm"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Stat>
          <StatLabel color="gray.500" fontSize="sm" fontWeight="500" mb="2">
            {title}
          </StatLabel>
          {isLoading ? (
            <Skeleton height="32px" width="120px" />
          ) : (
            <StatNumber fontSize="2xl" fontWeight="700">
              {value}
            </StatNumber>
          )}
        </Stat>
        <Flex
          bg={iconBg}
          w="45px"
          h="45px"
          borderRadius="12px"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} w="20px" h="20px" color={iconColor} />
        </Flex>
      </Flex>
    </Box>
  );
}
