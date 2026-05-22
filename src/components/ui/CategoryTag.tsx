import PillTag from "@/components/ui/PillTag";

// Pending: move to the Chakra theme as a semantic palette once the design-system task lands.
const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Cervezas: { bg: "info.100",    color: "info.800" },
  Aguas:    { bg: "success.100", color: "success.800" },
  Maltas:   { bg: "brand.100",   color: "brand.800" },
};

const FALLBACK = { bg: "gray.100", color: "gray.700" };

type CategoryTagProps = {
  category: string;
};

export default function CategoryTag({ category }: CategoryTagProps) {
  const palette = CATEGORY_COLORS[category] ?? FALLBACK;
  return <PillTag bg={palette.bg} color={palette.color} label={category} />;
}
