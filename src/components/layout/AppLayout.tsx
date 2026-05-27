import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <Flex h="100svh" w="full">
      <Sidebar />
      <Box as="main" flex="1" minW="0" overflowY="auto">
        <Box maxW="1126px" mx="auto" w="full">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
