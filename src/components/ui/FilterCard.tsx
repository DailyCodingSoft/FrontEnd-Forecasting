import { Box, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FilterCardProps = {
  title: string;
  children: ReactNode;
};

const FilterCard = ({ title, children }: FilterCardProps) => (
  <Box
    className="flex flex-col items-center gap-4 w-fit"
    p={6}
    layerStyle="cardElevated"
  >
    <Heading
      as="h2"
      fontSize="sm"
      fontWeight="semibold"
      letterSpacing="widest"
      textTransform="uppercase"
      color="text.secondary"
    >
      {title}
    </Heading>
    {children}
  </Box>
);

export default FilterCard;
