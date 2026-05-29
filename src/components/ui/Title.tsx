// components/ui/Title.tsx
import { Heading } from "@chakra-ui/react";

type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return (
    <Heading as="h1" textStyle="heading.page" mb={6}>
      {text}
    </Heading>
  );
};

export default Title;
