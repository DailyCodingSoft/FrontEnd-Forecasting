import { useState } from "react";
import { Box, Flex, Text, Slider } from "@chakra-ui/react";
import { LuPackage } from "react-icons/lu";

export interface ProductDiscountItem {
    identificator: string;
    NombreProducto: string;
    PrecioMinimo: number;
    PrecioMaximo: number;
    Prediccion: number;
}

interface ProductDiscountCardProps {
    item: ProductDiscountItem;
    onPriceChange?: (identificator: string, price: number) => void;
}

function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(value);
}

export function ProductDiscountCard({ item, onPriceChange }: ProductDiscountCardProps) {
    const [selectedPrice, setSelectedPrice] = useState<number>(item.PrecioMinimo);
    const range = item.PrecioMaximo - item.PrecioMinimo;
    const step = range <= 0 ? 1 : Math.max(1, Math.round(range / 100));

    const handleChange = (value: number) => {
        setSelectedPrice(value);
        onPriceChange?.(item.identificator, value);
    };

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={4}
        >
            <Flex align="center" gap={3} mb={4}>
                <Flex align="center" justify="center" bg="orange.50" borderRadius="lg" p={2}>
                    <LuPackage size={20} color="#ED8936" />
                </Flex>
                <Box>
                    <Text fontWeight="bold" fontSize="sm" color="gray.800">
                        {item.NombreProducto}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                        Predicción: <b>{item.Prediccion}</b> unidades
                    </Text>
                </Box>
            </Flex>
            <Box>
                <Flex justify="center" mb={3}>
                    <Box
                        bg="orange.500"
                        color="white"
                        borderRadius="md"
                        fontSize="xs"
                        px={3}
                        py={1}
                        fontWeight="semibold"
                    >
                        {formatCOP(selectedPrice)}
                    </Box>
                </Flex>
                <Slider.Root
                    min={item.PrecioMinimo}
                    max={item.PrecioMaximo}
                    step={step}
                    value={[selectedPrice]}
                    onValueChange={(e) => handleChange(e.value[0])}
                    width="100%"
                >
                    <Slider.Control>
                        <Slider.Track bg="gray.200" h="6px" borderRadius="full">
                            <Slider.Range bg="orange.400" />
                        </Slider.Track>
                        <Slider.Thumb
                            index={0}
                            boxSize={4}
                            bg="white"
                            borderColor="orange.400"
                            borderWidth="2px"
                            borderRadius="full"
                            boxShadow="sm"
                        />
                    </Slider.Control>
                </Slider.Root>
                <Flex justify="space-between" mt={2}>
                    <Text fontSize="xs" color="gray.500">{formatCOP(item.PrecioMinimo)}</Text>
                    <Text fontSize="xs" color="gray.500">{formatCOP(item.PrecioMaximo)}</Text>
                </Flex>
            </Box>
        </Box>
    );
}

interface ProductDiscountListProps {
    items: ProductDiscountItem[];
    onPriceChange?: (identificator: string, price: number) => void;
}

export default function ProductDiscountList({ items, onPriceChange }: ProductDiscountListProps) {
    return (
        <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
        >
            {items.map((item) => (
                <ProductDiscountCard
                    key={item.identificator}
                    item={item}
                    onPriceChange={onPriceChange}
                />
            ))}
        </Box>
    );
}
