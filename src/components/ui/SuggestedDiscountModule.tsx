import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    Badge,
    Skeleton,
    Slider,
} from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";
import { Tooltip } from "@/components/ui/tooltip";
import type { ProductDiscount } from "@/pages/Goals/Discount";

// ─── Utilidades ──────────────────────────────────────────────────────────────

function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Ganancia esperada: diferencia entre el precio mínimo elegido y el mínimo original.
 * Representa cuánto más por encima del piso mínimo se está vendiendo.
 */
function calcExpectedEarnings(currentMin: number, originalMin: number): number {
    return Math.max(0, currentMin - originalMin);
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

interface PriceStatProps {
    label: string;
    value: number;
    helpText?: string;
    colorScheme?: "orange" | "green" | "blue" | "gray";
}

const colorMap: Record<string, string> = {
    orange: "orange.600",
    green: "green.600",
    blue: "blue.600",
    gray: "gray.600",
};

function PriceStat({ label, value, helpText, colorScheme = "gray" }: PriceStatProps) {
    return (
        <Box
            bg="white"
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor="gray.100"
            boxShadow="sm"
            flex={1}
            minW="200px"
        >
            <Text
                color="gray.500"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={1}
            >
                {label}
            </Text>
            <Text fontSize="2xl" color={colorMap[colorScheme]} fontWeight="bold" mb={1}>
                {formatCOP(value)}
            </Text>
            {helpText && (
                <Text fontSize="xs" color="gray.400">
                    {helpText}
                </Text>
            )}
        </Box>
    );
}

function CustomAlert({
    status,
    children,
}: {
    status: "error" | "info" | "success";
    children: React.ReactNode;
}) {
    const styles = {
        error: { bg: "red.50", border: "red.200", color: "red.800" },
        info: { bg: "blue.50", border: "blue.200", color: "blue.800" },
        success: { bg: "green.50", border: "green.200", color: "green.800" },
    };
    const s = styles[status];

    return (
        <Flex
            bg={s.bg}
            border="1px solid"
            borderColor={s.border}
            borderRadius="xl"
            p={4}
            align="center"
            gap={3}
            width="100%"
        >
            <Text color={s.color} fontSize="sm" fontWeight="medium">
                {children}
            </Text>
        </Flex>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface SuggestedDiscountModuleProps {
    products: ProductDiscount[];
    selectedProductId: number | null;
    selectedProduct: ProductDiscount | null;
    onProductChange: (productId: number) => void;
    isLoading: boolean;
    error: string | null;
}

export default function SuggestedDiscountModule({
    products,
    selectedProductId,
    selectedProduct,
    onProductChange,
    isLoading,
    error,
}: SuggestedDiscountModuleProps) {
    const [currentMinPrice, setCurrentMinPrice] = useState<number>(0);

    // Reinicia el slider al precio mínimo cuando cambia el producto
    useEffect(() => {
        if (selectedProduct) {
            setCurrentMinPrice(selectedProduct.minPrice);
        }
    }, [selectedProduct]);

    const expectedEarnings = selectedProduct
        ? calcExpectedEarnings(currentMinPrice, selectedProduct.minPrice)
        : 0;

    const discountProgress =
        selectedProduct && selectedProduct.maxPrice !== selectedProduct.minPrice
            ? ((currentMinPrice - selectedProduct.minPrice) /
                (selectedProduct.maxPrice - selectedProduct.minPrice)) *
            100
            : 0;

    // ─── Loading ──────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <Box bg="gray.50" borderRadius="2xl" p={8}>
                <Skeleton height="32px" width="200px" mb={4} borderRadius="md" />
                <Skeleton height="48px" mb={6} borderRadius="md" />
                <Flex gap={4} mb={6}>
                    <Skeleton height="100px" flex={1} borderRadius="xl" />
                    <Skeleton height="100px" flex={1} borderRadius="xl" />
                    <Skeleton height="100px" flex={1} borderRadius="xl" />
                </Flex>
                <Skeleton height="80px" borderRadius="xl" />
            </Box>
        );
    }

    // ─── Error ────────────────────────────────────────────────────────────────
    if (error) {
        return <CustomAlert status="error">{error}</CustomAlert>;
    }

    // ─── Sin datos ────────────────────────────────────────────────────────────
    if (products.length === 0) {
        return (
            <CustomAlert status="info">
                No hay descuentos sugeridos disponibles para esta meta.
            </CustomAlert>
        );
    }

    // ─── Vista principal ──────────────────────────────────────────────────────
    return (
        <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="lg"
            overflow="hidden"
        >
            {/* Header */}
            <Box bg="orange.500" px={8} py={6}>
                <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">
                            Descuentos Sugeridos
                        </Text>
                        <Text color="whiteAlpha.800" fontSize="sm" mt={0.5}>
                            Rango de precios recomendado por producto
                        </Text>
                    </Box>

                    {/* Selector de producto */}
                    <Box minW="220px">
                        <Text
                            color="whiteAlpha.800"
                            fontSize="xs"
                            fontWeight="semibold"
                            mb={1}
                            textTransform="uppercase"
                            letterSpacing="wide"
                        >
                            Producto
                        </Text>
                        <select
                            value={selectedProductId ?? ""}
                            onChange={(e) => onProductChange(Number(e.target.value))}
                            style={{
                                background: "rgba(255,255,255,0.2)",
                                color: "white",
                                border: "1px solid rgba(255,255,255,0.4)",
                                borderRadius: "8px",
                                padding: "6px 12px",
                                fontSize: "14px",
                                outline: "none",
                                width: "100%",
                                cursor: "pointer",
                            }}
                        >
                            {products.map((p) => (
                                <option key={p.productId} value={p.productId} style={{ color: "#2d3748" }}>
                                    {p.productName}
                                </option>
                            ))}
                        </select>
                    </Box>
                </Flex>
            </Box>

            {/* Body */}
            {selectedProduct && (
                <Box px={8} py={7}>
                    {/* Stats */}
                    <Flex gap={4} mb={8} wrap="wrap">
                        <PriceStat
                            label="Precio Mínimo"
                            value={currentMinPrice}
                            helpText="Ajustable con el control deslizante"
                            colorScheme="orange"
                        />
                        <PriceStat
                            label="Precio Máximo"
                            value={selectedProduct.maxPrice}
                            helpText="Al alcanzar el 100% de la meta"
                            colorScheme="green"
                        />
                        <PriceStat
                            label="Ganancia Esperada"
                            value={expectedEarnings}
                            helpText="Diferencia sobre el precio mínimo base"
                            colorScheme="blue"
                        />
                    </Flex>

                    <Box borderBottom="1px solid" borderColor="gray.100" my={8} />

                    {/* Slider */}
                    <Box>
                        <Flex justify="space-between" align="center" mb={4}>
                            <Flex align="center" gap={2}>
                                <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                                    Ajustar precio mínimo
                                </Text>
                                <Tooltip
                                    content="Mueve el control para simular distintos precios mínimos y ver cómo impacta la ganancia esperada."
                                    showArrow
                                >
                                    <span>
                                        <LuInfo size={16} color="#A0AEC0" style={{ cursor: "help" }} />
                                    </span>
                                </Tooltip>
                            </Flex>
                            <Badge
                                colorPalette={
                                    discountProgress > 66
                                        ? "green"
                                        : discountProgress > 33
                                            ? "orange"
                                            : "red"
                                }
                                variant="solid"
                                borderRadius="full"
                                px={3}
                                py={1}
                                fontSize="xs"
                            >
                                {discountProgress.toFixed(0)}% del rango
                            </Badge>
                        </Flex>

                        <Box px={2} pb={6}>
                            {/* Valor actual flotante */}
                            <Flex justify="center" mb={4}>
                                <Box
                                    bg="orange.500"
                                    color="white"
                                    borderRadius="md"
                                    fontSize="xs"
                                    px={3}
                                    py={1}
                                    fontWeight="semibold"
                                    boxShadow="sm"
                                >
                                    {formatCOP(currentMinPrice)}
                                </Box>
                            </Flex>

                            <Slider.Root
                                min={selectedProduct.minPrice}
                                max={selectedProduct.maxPrice}
                                step={10}
                                value={[currentMinPrice]}
                                onValueChange={(e) => setCurrentMinPrice(e.value[0])}
                                width="100%"
                            >
                                <Slider.Control>
                                    <Slider.Track bg="gray.200" h="6px" borderRadius="full">
                                        <Slider.Range bg="orange.500" />
                                    </Slider.Track>
                                    <Slider.Thumb
                                        index={0}
                                        boxSize={5}
                                        bg="white"
                                        borderColor="orange.500"
                                        borderWidth="2px"
                                        borderRadius="full"
                                        boxShadow="md"
                                    />
                                </Slider.Control>
                            </Slider.Root>

                            {/* Etiquetas min / max */}
                            <Flex justify="space-between" mt={3}>
                                <Text fontSize="xs" color="gray.500">
                                    {formatCOP(selectedProduct.minPrice)}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    {formatCOP(selectedProduct.maxPrice)}
                                </Text>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Nota informativa */}
                    <Box
                        bg="blue.50"
                        border="1px solid"
                        borderColor="blue.100"
                        borderRadius="xl"
                        px={5}
                        py={4}
                        mt={2}
                    >
                        <Text fontSize="xs" color="blue.700" fontWeight="medium">
                            <b>{selectedProduct.discounts.length}</b> descuento
                            {selectedProduct.discounts.length !== 1 ? "s" : ""} configurado
                            {selectedProduct.discounts.length !== 1 ? "s" : ""} para{" "}
                            <b>{selectedProduct.productName}</b> en esta meta. El rango va de{" "}
                            {formatCOP(selectedProduct.minPrice)} a {formatCOP(selectedProduct.maxPrice)}.
                        </Text>
                    </Box>
                </Box>
            )}
        </Box>
    );
}