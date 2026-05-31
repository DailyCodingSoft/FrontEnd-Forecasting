import { useState } from "react";
import { Box, Flex, Icon, Text, Slider } from "@chakra-ui/react";
import { LuPackage } from "react-icons/lu";
import Card from "@/components/ui/Card";

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
        <Card p={4}>
            <Flex align="center" gap={3} mb={4}>
                <Flex align="center" justify="center" bg="brand.50" borderRadius="lg" p={2}>
                    <Icon as={LuPackage} boxSize={5} color="brand.500" />
                </Flex>
                <Box>
                    <Text fontWeight="bold" fontSize="sm" color="text.primary">
                        {item.NombreProducto}
                    </Text>
                    <Text fontSize="xs" color="text.secondary">
                        Predicción: <b>{item.Prediccion}</b> unidades
                    </Text>
                </Box>
            </Flex>
            <Box>
                <Flex justify="center" mb={3}>
                    <Box
                        bg="brand.500"
                        color="text.onInverse"
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
                        <Slider.Track bg="border.default" h="6px" borderRadius="full">
                            <Slider.Range bg="brand.400" />
                        </Slider.Track>
                        <Slider.Thumb
                            index={0}
                            boxSize={4}
                            bg="surface.base"
                            borderColor="brand.400"
                            borderWidth="2px"
                            borderRadius="full"
                            boxShadow="card"
                        />
                    </Slider.Control>
                </Slider.Root>
                <Flex justify="space-between" mt={2}>
                    <Text fontSize="xs" color="text.secondary">{formatCOP(item.PrecioMinimo)}</Text>
                    <Text fontSize="xs" color="text.secondary">{formatCOP(item.PrecioMaximo)}</Text>
                </Flex>
            </Box>
        </Card>
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
