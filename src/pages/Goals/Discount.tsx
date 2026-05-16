import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import DiscountPredictions from "@/components/ui/DiscountPredictions";
import { generateSuggestedDiscounts, getGoalByName, getGoalCategories } from "@/services/goals";
import { getProducts, getSalesTableDataByFilters } from "@/services/sales";
import { getPrediction } from "@/services/predictions";
import type { SaleRow } from "@/types/SalesTypes";
import type { GoalCategory } from "@/types/goalTypes";
import type { Product } from "@/types/products";

export default function Discount() {
    const { goalName } = useParams<{ goalName: string }>();
    const [predictionRows, setPredictionRows] = useState<SaleRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!goalName) return;

        async function loadData(name: string) {
            generateSuggestedDiscounts(name);

            const [goal, categories] = await Promise.all([
                getGoalByName(name),
                getGoalCategories(),
            ]);

            const categoryCode = categories.find(
                (c: GoalCategory) => c.name === goal.category
            )?.code;
            if (!categoryCode) {
                setIsLoading(false);
                return;
            }

            const products: Product[] = await getProducts(categoryCode);
            console.log(categoryCode, products)

            const productResults = await Promise.all(
                products.map(async (product) => {
                    const [predictionRes, historicalRes] = await Promise.all([
                        getPrediction(product.identificator),
                        getSalesTableDataByFilters(null, null, product.identificator),
                    ]);

                    const prediction = predictionRes.data;
                    const forecastRow: SaleRow = {
                        productName: product.productName,
                        identificator: prediction.product_identifier,
                        week: parseInt(prediction.week),
                        date: format(Date.now(), "yyyy-dd-MM"),
                        quantity: prediction.sales,
                        isPrediction: true,
                    };

                    return historicalRes.rows.concat(forecastRow);
                })
            );

            setPredictionRows(productResults.flat());
            setIsLoading(false);
        }

        loadData(goalName);
    }, [goalName]);

    return (
        <Box p={6} display="flex" flexDirection="column" gap={8}>
            {/* Primer módulo — implementación pendiente */}
            <h1>Módulo principal</h1>

            {isLoading ? (
                <Box display="flex" justifyContent="center" py={10}>
                    <Spinner />
                </Box>
            ) : (
                <DiscountPredictions rows={predictionRows} />
            )}
        </Box>
    );
}
