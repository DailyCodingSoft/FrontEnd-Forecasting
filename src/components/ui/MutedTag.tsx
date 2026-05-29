import { Tag } from "@chakra-ui/react";

/** Small neutral square-cornered tag (e.g. category labels inside cards). */
export default function MutedTag({ label }: { label: string }) {
  return (
    <Tag.Root
      width="fit-content"
      textStyle="metaLabel"
      letterSpacing="wide"
      bg="surface.subtle"
      color="text.muted"
      borderRadius="sm"
      px="1.5"
      py="0.5"
      borderWidth="0"
    >
      <Tag.Label>{label}</Tag.Label>
    </Tag.Root>
  );
}
