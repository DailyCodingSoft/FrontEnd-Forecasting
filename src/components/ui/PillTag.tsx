import { Tag } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Semantic palette registered in the theme (see src/theme). */
export type PillPalette = "brand" | "success" | "danger" | "info" | "neutral";

type PillTagProps = {
  colorPalette: PillPalette;
  label: string;
  leading?: ReactNode;
};

export default function PillTag({ colorPalette, label, leading }: PillTagProps) {
  return (
    <Tag.Root
      colorPalette={colorPalette}
      bg="colorPalette.100"
      color="colorPalette.700"
      fontSize="xs"
      fontWeight="semibold"
      borderRadius="pill"
      px="2.5"
      py={1}
      borderWidth="0"
      width="fit-content"
      gap="1.5"
    >
      {leading}
      <Tag.Label>{label}</Tag.Label>
    </Tag.Root>
  );
}
