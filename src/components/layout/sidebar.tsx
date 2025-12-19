import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MdHome, MdBarChart, MdPeople, MdSettings } from "react-icons/md";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: MdHome, label: "Dashboard", href: "/" },
  { icon: MdBarChart, label: "Analytics", href: "/analytics" },
  { icon: MdPeople, label: "Clients", href: "/clients" },
  { icon: MdSettings, label: "Settings", href: "/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const activeColor = useColorModeValue("brand.500", "white");

  const SidebarContent = () => (
    <Box h="full" bg={bgColor}>
      <Flex h="80px" alignItems="center" px="8" borderBottomWidth="1px" borderColor={borderColor}>
        <Flex alignItems="center" gap="3">
          <Box
            bg="brand.500"
            w="40px"
            h="40px"
            borderRadius="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xl" fontWeight="bold" color="white">
              C
            </Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color={activeColor}>
            Carteric Dashboard
          </Text>
        </Flex>
      </Flex>

      <VStack spacing="1" align="stretch" px="4" py="6">
        {navItems.map((item) => (
          <Flex
            key={item.href}
            align="center"
            px="4"
            py="3"
            borderRadius="15px"
            cursor="pointer"
            _hover={{ bg: hoverBg }}
            transition="all 0.2s"
          >
            <Icon as={item.icon} boxSize="5" mr="3" />
            <Text fontSize="md" fontWeight="500">
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        left="0"
        h="100vh"
        w="250px"
        borderRightWidth="1px"
        borderColor={borderColor}
      >
        <SidebarContent />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p="0">
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
