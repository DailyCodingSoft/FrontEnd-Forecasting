import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { navSections, type NavItem, type NavSection } from "./navItems";
import clientLogo from "@/public/client_logo.png";

const STORAGE_KEY = "sidebar-collapsed";

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <ChakraLink
      asChild
      display="flex"
      alignItems="center"
      gap="3"
      px="3"
      py="2.5"
      borderRadius="md"
      borderLeftWidth="2px"
      borderLeftColor={active ? "sidebar.accentBorder" : "transparent"}
      bg={active ? "sidebar.activeBg" : "transparent"}
      color={active ? "sidebar.itemFgActive" : "sidebar.itemFg"}
      fontSize="sm"
      fontWeight={active ? "semibold" : "medium"}
      textDecoration="none"
      _hover={{ bg: "sidebar.hoverBg", color: "sidebar.hoverFg", textDecoration: "none" }}
    >
      <RouterLink to={item.to}>
        <Icon as={item.icon} size="sm" color={active ? "sidebar.itemFgActive" : "sidebar.iconMuted"} />
        <Text>{item.label}</Text>
      </RouterLink>
    </ChakraLink>
  );
}

function RailItem({ section, active }: { section: NavSection; active: boolean }) {
  return (
    <ChakraLink
      asChild
      display="flex"
      alignItems="center"
      justifyContent="center"
      py="3"
      borderRadius="md"
      bg={active ? "sidebar.activeBg" : "transparent"}
      color={active ? "sidebar.itemFgActive" : "sidebar.iconMuted"}
      textDecoration="none"
      _hover={{ bg: "sidebar.hoverBg", color: "sidebar.hoverFg", textDecoration: "none" }}
    >
      <RouterLink to={section.to} aria-label={section.label} title={section.label}>
        <Icon as={section.icon} size="md" />
      </RouterLink>
    </ChakraLink>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  return (
    <Flex
      as="nav"
      direction="column"
      flexShrink="0"
      w={collapsed ? "20" : "64"}
      h="100svh"
      overflowY="auto"
      bg="sidebar.bg"
      px={collapsed ? "2" : "3"}
      py="5"
      gap="8"
      transition="width 0.2s ease"
    >
      <Flex align="center" justify={collapsed ? "center" : "space-between"} gap="2">
        {!collapsed && (
          <Box bg="surface.base" borderRadius="lg" p="2" flex="1" overflow="hidden">
            <Image src={clientLogo} alt="Distribuidora La Bendición FB" maxH="64px" mx="auto" />
          </Box>
        )}
        <IconButton
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          title={collapsed ? "Expandir menú" : "Contraer menú"}
          onClick={() => setCollapsed((prev) => !prev)}
          variant="ghost"
          size="sm"
          color="sidebar.iconMuted"
          _hover={{ bg: "sidebar.hoverBg", color: "sidebar.hoverFg" }}
        >
          {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </IconButton>
      </Flex>

      <Flex direction="column" gap="6">
        {navSections.map((section) =>
          collapsed ? (
            <RailItem
              key={section.label}
              section={section}
              active={section.items.some((item) => item.to === pathname)}
            />
          ) : (
            <Flex key={section.label} direction="column" gap="1">
              <Text
                px="3"
                mb="1"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wider"
                textTransform="uppercase"
                color="sidebar.sectionLabel"
              >
                {section.label}
              </Text>
              {section.items.map((item) => (
                <SidebarItem key={item.to} item={item} active={item.to === pathname} />
              ))}
            </Flex>
          ),
        )}
      </Flex>
    </Flex>
  );
}
