"use client";

import {
    Box,
    Button,
    HStack,
    Menu,
    Portal,
    Text,
} from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import { useChartTokens } from "@/theme/useChartTokens";

interface ProductMenuProps {
    allProducts: string[];
    selected: Set<string>;
    onToggle: (product: string) => void;
    onSelectAll: () => void;
    onClearAll: () => void;
}

export default function ProductMenu({
    allProducts,
    selected,
    onToggle,
    onSelectAll,
    onClearAll,
}: ProductMenuProps) {
    const { getChartColor, swatchInactiveColor } = useChartTokens();
    const selectedCount = selected.size;
    const totalCount = allProducts.length;

    const label =
        selectedCount === totalCount
            ? "Todos"
            : `${selectedCount} producto${selectedCount !== 1 ? "s" : ""}`;

    return (
        <Menu.Root closeOnSelect={false} positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    bg="white"
                    color="gray.700"
                    borderColor="gray.200"
                    fontWeight="medium"
                    _hover={{ borderColor: "gray.300" }}
                >
                    {label}
                    <LuChevronDown />
                </Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content minW="15rem" py={0}>
                        <HStack
                            justify="space-between"
                            bg="gray.50"
                            borderBottom="1px solid"
                            borderColor="gray.100"
                            px={3}
                            py={2}
                        >
                            <Text
                                fontSize="xs"
                                fontWeight="semibold"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Filtrar productos
                            </Text>
                            <HStack gap={2}>
                                <Button
                                    size="xs"
                                    variant="plain"
                                    color="info.600"
                                    fontWeight="semibold"
                                    onClick={onSelectAll}
                                    px={0}
                                    h="auto"
                                >
                                    Todos
                                </Button>
                                <Text color="gray.300">|</Text>
                                <Button
                                    size="xs"
                                    variant="plain"
                                    color="gray.400"
                                    fontWeight="semibold"
                                    onClick={onClearAll}
                                    px={0}
                                    h="auto"
                                >
                                    Limpiar
                                </Button>
                            </HStack>
                        </HStack>

                        <Box maxH="15rem" overflowY="auto" py={1}>
                            {allProducts.map((product, idx) => {
                                const active = selected.has(product);
                                const color = getChartColor(idx);
                                return (
                                    <Menu.CheckboxItem
                                        key={product}
                                        value={product}
                                        checked={active}
                                        onCheckedChange={() => onToggle(product)}
                                        closeOnSelect={false}
                                        gap={3}
                                    >
                                        <Box
                                            flexShrink={0}
                                            w="2.5"
                                            h="2.5"
                                            borderRadius="sm"
                                            bg={active ? color : swatchInactiveColor}
                                        />
                                        <Menu.ItemText
                                            flex="1"
                                            truncate
                                            color={active ? "gray.800" : "gray.400"}
                                            fontWeight={active ? "medium" : "normal"}
                                        >
                                            {product}
                                        </Menu.ItemText>
                                        <Menu.ItemIndicator color={color} />
                                    </Menu.CheckboxItem>
                                );
                            })}
                        </Box>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}
