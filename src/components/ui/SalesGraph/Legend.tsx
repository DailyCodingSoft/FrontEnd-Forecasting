"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";

interface LegendProps {
    activeProducts: string[];
    getColor: (product: string) => string;
    interactive: boolean;
    onToggle?: (product: string) => void;
}

export default function Legend({
    activeProducts,
    getColor,
    interactive,
    onToggle,
}: LegendProps) {
    return (
        <Flex wrap="wrap" columnGap={5} rowGap={1.5} px={1}>
            {activeProducts.map((product) => {
                const color = getColor(product);
                const swatch = (
                    <Box w={4} h="2px" borderRadius="full" bg={color} flexShrink={0} />
                );

                if (interactive) {
                    return (
                        <Button
                            key={product}
                            variant="plain"
                            size="xs"
                            color="gray.500"
                            fontWeight="normal"
                            fontSize="xs"
                            px={0}
                            h="auto"
                            gap={1.5}
                            title="Clic para ocultar"
                            onClick={() => onToggle?.(product)}
                            _hover={{ color: "gray.800" }}
                        >
                            {swatch}
                            {product}
                        </Button>
                    );
                }

                return (
                    <HStack key={product} gap={1.5}>
                        {swatch}
                        <Text fontSize="xs" color="gray.500">
                            {product}
                        </Text>
                    </HStack>
                );
            })}
        </Flex>
    );
}
