import { Span } from "@chakra-ui/react";

type SkuPillProps = {
  sku: string;
};

export default function SkuPill({ sku }: SkuPillProps) {
  return (
    <Span
      display="inline-block"
      bg="gray.800"
      color="white"
      fontSize="xs"
      fontFamily="mono"
      fontWeight="bold"
      px="2.5"
      py={1}
      borderRadius="full"
      letterSpacing="widest"
    >
      {sku}
    </Span>
  );
}
