// components/ui/Modal.tsx
import { Box, Heading, Text } from "@chakra-ui/react";
import Button from "@/components/ui/Button";

type ModalProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

const Modal = ({ open, title, description, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <Box
      className="fixed inset-0 flex items-center justify-center"
      bg="blackAlpha.500"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        w="400px"
        textAlign="center"
      >
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text mb={4}>{description}</Text>

        <Button label="Continuar" variant="success" onClick={onClose} />
      </Box>
    </Box>
  );
};

export default Modal;
