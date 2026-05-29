import { chakra } from "@chakra-ui/react";

const PillSelect = chakra("select", {
  base: {
    bg: "info.100",
    color: "info.800",
    fontWeight: "medium",
    fontSize: "sm",
    borderRadius: "full",
    px: 4,
    py: 2,
    borderWidth: "1px",
    borderColor: "info.300",
    cursor: "pointer",
    transitionProperty: "colors",
    transitionDuration: "150ms",
    _hover: { bg: "info.200" },
    _focus: {
      outline: "none",
      boxShadow: "focusRingInfo",
    },
  },
});

export default PillSelect;
