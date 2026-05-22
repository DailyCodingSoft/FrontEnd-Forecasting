import { Button as ChakraButton } from "@chakra-ui/react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "danger" | "success";
};

const colorPaletteMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "blue",
  danger: "red",
  success: "green",
};

const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  return (
    <ChakraButton
      onClick={onClick}
      colorPalette={colorPaletteMap[variant]}
      borderRadius="full"
      px="6"
    >
      {label}
    </ChakraButton>
  );
};

export default Button;
