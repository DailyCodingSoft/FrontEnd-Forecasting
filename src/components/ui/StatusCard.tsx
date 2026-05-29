import { Box, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Centered card for loading / error / empty states. */
export default function StatusCard({ children }: { children: ReactNode }) {
  return (
    <Box layerStyle="cardElevated" p={8} textAlign="center">
      <Text textStyle="body.sm" color="text.secondary">
        {children}
      </Text>
    </Box>
  );
}
