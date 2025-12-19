import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { MdMenu, MdDarkMode, MdLightMode } from "react-icons/md";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="10"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Flex h="80px" alignItems="center" justifyContent="space-between" px="6">
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onMenuClick}
          variant="ghost"
          aria-label="Open menu"
          icon={<MdMenu size="24px" />}
        />

        <Box flex="1" />

        <Flex alignItems="center" gap="3">
          <IconButton
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <MdDarkMode size="20px" /> : <MdLightMode size="20px" />}
            borderRadius="12px"
          />

          <Menu>
            <MenuButton>
              <Avatar size="sm" name="User" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
