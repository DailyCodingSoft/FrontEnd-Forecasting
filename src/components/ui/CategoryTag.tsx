import PillTag from "@/components/ui/PillTag";
import type { PillPalette } from "@/components/ui/PillTag";

const CATEGORY_PALETTE: Record<string, PillPalette> = {
  Cervezas: "info",
  Aguas: "success",
  Maltas: "brand",
};

const FALLBACK_PALETTE: PillPalette = "neutral";

type CategoryTagProps = {
  category: string;
};

export default function CategoryTag({ category }: CategoryTagProps) {
  const palette = CATEGORY_PALETTE[category] ?? FALLBACK_PALETTE;
  return <PillTag colorPalette={palette} label={category} />;
}
