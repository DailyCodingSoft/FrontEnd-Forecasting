import { Box, Flex } from "@chakra-ui/react";
import MetaLabel from "@/components/ui/MetaLabel";

type SectionDividerProps = {
  label: string;
};

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <Flex align="center" gap={3} my={2}>
      <Box flex="1" h="1px" bg="gray.200" />
      <MetaLabel color="gray.400">{label}</MetaLabel>
      <Box flex="1" h="1px" bg="gray.200" />
    </Flex>
  );
}
