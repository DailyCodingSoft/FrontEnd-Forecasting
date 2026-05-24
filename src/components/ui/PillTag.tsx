import { Tag } from "@chakra-ui/react";
import type { ReactNode } from "react";

type PillTagProps = {
  bg: string;
  color: string;
  label: string;
  leading?: ReactNode;
};

export default function PillTag({ bg, color, label, leading }: PillTagProps) {
  return (
    <Tag.Root
      bg={bg}
      color={color}
      fontSize="xs"
      fontWeight="semibold"
      borderRadius="full"
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
