import { Flex, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { navSections, type NavItem } from "./navItems";

function SidebarItem({ item }: { item: NavItem }) {
  const { pathname } = useLocation();
  const active = pathname === item.to;

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
      borderLeftColor={active ? "brand.400" : "transparent"}
      bg={active ? "whiteAlpha.200" : "transparent"}
      color={active ? "brand.300" : "gray.300"}
      fontSize="sm"
      fontWeight={active ? "semibold" : "medium"}
      textDecoration="none"
      _hover={{ bg: "whiteAlpha.100", color: "white", textDecoration: "none" }}
    >
      <RouterLink to={item.to}>
        <Icon as={item.icon} size="sm" color={active ? "brand.300" : "gray.400"} />
        <Text>{item.label}</Text>
      </RouterLink>
    </ChakraLink>
  );
}

export default function Sidebar() {
  return (
    <Flex
      as="nav"
      direction="column"
      flexShrink="0"
      w="64"
      h="100svh"
      overflowY="auto"
      bg="gray.900"
      px="3"
      py="5"
      gap="8"
    >
      <Flex align="center" gap="2.5" px="2">
        <Icon size="lg" color="brand.400">
          <LuChartNoAxesCombined />
        </Icon>
        <Text color="white" fontWeight="bold" fontSize="lg">
          Forecasting
        </Text>
      </Flex>

      <Flex direction="column" gap="6">
        {navSections.map((section) => (
          <Flex key={section.label} direction="column" gap="1">
            <Text
              px="3"
              mb="1"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wider"
              textTransform="uppercase"
              color="gray.500"
            >
              {section.label}
            </Text>
            {section.items.map((item) => (
              <SidebarItem key={item.to} item={item} />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
