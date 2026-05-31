import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

type CardProps = BoxProps & {
  /** Use the elevated shadow variant. */
  elevated?: boolean;
};

/** Standard surface card: white bg, subtle border, rounded, shadowed. */
export default function Card({ elevated, ...props }: CardProps) {
  return <Box layerStyle={elevated ? "cardElevated" : "card"} {...props} />;
}
