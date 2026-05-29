import { Span } from "@chakra-ui/react";

type SkuPillProps = {
  sku: string;
};

export default function SkuPill({ sku }: SkuPillProps) {
  return (
    <Span
      display="inline-block"
      bg="surface.inverse"
      color="text.onInverse"
      textStyle="monoPill"
      px="2.5"
      py={1}
      borderRadius="pill"
    >
      {sku}
    </Span>
  );
}
