import { Box, Text } from "@chakra-ui/react";
import type { SaleRow } from "@/types/SalesTypes";
import SalesGraph from "@/components/ui/SalesGraph";

interface DiscountPredictionsProps {
    rows: SaleRow[];
}

export default function DiscountPredictions({ rows }: DiscountPredictionsProps) {
    const totalPredicted = rows
        .filter((r) => r.isPrediction)
        .reduce((sum, r) => sum + r.quantity, 0);

    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <Box
                bg="accent.warning.bg"
                border="1px solid"
                borderColor="accent.warning.border"
                borderRadius="xl"
                px={4}
                py={3}
                display="flex"
                alignItems="center"
                gap={3}
            >
                <Text fontSize="sm" color="accent.warning.fg">
                    Este gráfico es informativo. Los valores de predicción mostrados no se tienen en cuenta para el cálculo del descuento sugerido.
                </Text>
            </Box>

            <Box
                bg="surface.base"
                border="1px solid"
                borderColor="border.subtle"
                borderRadius="xl"
                px={5}
                py={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontSize="sm" color="text.secondary" fontWeight="medium">
                    Total predicción
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="text.primary">
                    {totalPredicted.toLocaleString("es-CO")}
                </Text>
            </Box>

            <SalesGraph
                rows={rows}
                simplified
                title="Predicción por producto"
            />
        </Box>
    );
}
