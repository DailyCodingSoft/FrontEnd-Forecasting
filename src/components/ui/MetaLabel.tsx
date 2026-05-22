import { Text } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";

export default function MetaLabel(props: TextProps) {
  return (
    <Text
      fontSize="xs"
      color="gray.500"
      textTransform="uppercase"
      letterSpacing="widest"
      fontWeight="semibold"
      {...props}
    />
  );
}
