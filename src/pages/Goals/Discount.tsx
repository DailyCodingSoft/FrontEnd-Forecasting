import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import DiscountPredictions from "@/components/ui/DiscountPredictions";
import { getSuggestedDiscount } from "@/services/predictions";
import type { SaleRow } from "@/types/SalesTypes";

export default function Discount() {
    const [predictionRows, setPredictionRows] = useState<SaleRow[]>([]);

    useEffect(() => {
        // TODO: replace hardcoded goalName with actual value once the primary module is implemented
        getSuggestedDiscount("").then((res) => {
            // TODO: adjust mapping once backend response shape is confirmed
            setPredictionRows(res.data);
        });
    }, []);

    return (
        <Box p={6} display="flex" flexDirection="column" gap={8}>
            {/* Primer módulo — implementación pendiente */}
            <h1>Módulo principal</h1>

            <DiscountPredictions rows={predictionRows} />
        </Box>
    );
}
