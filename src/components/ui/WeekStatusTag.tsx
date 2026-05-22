import { Box } from "@chakra-ui/react";
import PillTag from "@/components/ui/PillTag";

type WeekStatus = "current" | "finalized";

type WeekStatusTagProps = {
  status: WeekStatus;
};

// Pending: move to the Chakra theme as a semantic status palette once the design-system task lands.
const VARIANTS: Record<
  WeekStatus,
  { bg: string; color: string; dotColor?: string; label: string }
> = {
  current:   { bg: "brand.100", color: "brand.700", dotColor: "brand.500", label: "Semana actual" },
  finalized: { bg: "gray.200",  color: "gray.600",  label: "Finalizada" },
};

export default function WeekStatusTag({ status }: WeekStatusTagProps) {
  const v = VARIANTS[status];
  const leading = v.dotColor ? (
    <Box boxSize="2" borderRadius="full" bg={v.dotColor} />
  ) : null;
  return <PillTag bg={v.bg} color={v.color} label={v.label} leading={leading} />;
}
