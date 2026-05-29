import { Box } from "@chakra-ui/react";
import PillTag from "@/components/ui/PillTag";
import type { PillPalette } from "@/components/ui/PillTag";

type WeekStatus = "current" | "finalized";

type WeekStatusTagProps = {
  status: WeekStatus;
};

const VARIANTS: Record<
  WeekStatus,
  { palette: PillPalette; dot?: boolean; label: string }
> = {
  current:   { palette: "brand",   dot: true, label: "Semana actual" },
  finalized: { palette: "neutral", label: "Finalizada" },
};

export default function WeekStatusTag({ status }: WeekStatusTagProps) {
  const v = VARIANTS[status];
  const leading = v.dot ? (
    <Box boxSize="2" borderRadius="full" bg="colorPalette.500" />
  ) : null;
  return <PillTag colorPalette={v.palette} label={v.label} leading={leading} />;
}
