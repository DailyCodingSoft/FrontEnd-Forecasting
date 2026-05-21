import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { format } from "date-fns";

import SuggestedDiscountModule from "@/components/ui/SuggestedDiscountModule";
import DiscountPredictions from "@/components/ui/DiscountPredictions";

import { generateSuggestedDiscounts, getSuggestedDiscountsByGoalName } from "@/services/suggestedPrices";
import { getGoalByName, getGoalCategories } from "@/services/goals";
import { getProducts, getSalesTableDataByFilters } from "@/services/sales";
import { getPrediction } from "@/services/predictions";

import type { SaleRow } from "@/types/SalesTypes";
import type { GoalCategory } from "@/types/goalTypes";
import type { Product } from "@/types/products";

export interface SuggestedDiscount {
    suggestedDiscountId: number;
    productId: number;
    goalId: number;
    productName: string;
    minimumPrice: number;
    maximumPrice: number;
}

export interface ProductDiscount {
    productId: number;
    productName: string;
    discounts: SuggestedDiscount[];
    minPrice: number;
    maxPrice: number;
}

export default function Discount() {
    const { goalName } = useParams<{ goalName: string }>();

    // ─── Descuentos sugeridos ───────────────────────────────────────────────
    const [discounts, setDiscounts] = useState<SuggestedDiscount[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isLoadingDiscounts, setIsLoadingDiscounts] = useState(true);
    const [discountError, setDiscountError] = useState<string | null>(null);

    useEffect(() => {
        if (!goalName) return;

        async function loadDiscounts(name: string) {
            setIsLoadingDiscounts(true);
            setDiscountError(null);
            try {
                await generateSuggestedDiscounts(name);
                const data: SuggestedDiscount[] = await getSuggestedDiscountsByGoalName(name);
                setDiscounts(data);
                if (data.length > 0) {
                    setSelectedProductId(data[0].productId);
                }
            } catch (error) {
                console.error("Error loading suggested discounts:", error);
                setDiscountError("No se pudieron cargar los descuentos sugeridos.");
            } finally {
                setIsLoadingDiscounts(false);
            }
        }

        loadDiscounts(goalName);
    }, [goalName]);

    // Agrupa los descuentos por producto
    const products: ProductDiscount[] = useMemo(() => {
        const map = new Map<number, ProductDiscount>();
        for (const d of discounts) {
            const existing = map.get(d.productId);
            if (!existing) {
                map.set(d.productId, {
                    productId: d.productId,
                    productName: d.productName,
                    discounts: [d],
                    minPrice: d.minimumPrice,
                    maxPrice: d.maximumPrice,
                });
            } else {
                existing.discounts.push(d);
                existing.minPrice = Math.min(existing.minPrice, d.minimumPrice);
                existing.maxPrice = Math.max(existing.maxPrice, d.maximumPrice);
            }
        }
        return Array.from(map.values());
    }, [discounts]);

    const selectedProduct = useMemo(
        () => products.find((p) => p.productId === selectedProductId) ?? null,
        [products, selectedProductId]
    );

    // ─── Predicciones de ventas ─────────────────────────────────────────────
    const [predictionRows, setPredictionRows] = useState<SaleRow[]>([]);
    const [isLoadingPredictions, setIsLoadingPredictions] = useState(true);

    useEffect(() => {
        if (!goalName) return;

        async function loadPredictions(name: string) {
            try {
                const [goal, categories] = await Promise.all([
                    getGoalByName(name),
                    getGoalCategories(),
                ]);

                const categoryCode = categories.find(
                    (c: GoalCategory) => c.name === goal.category
                )?.code;

                if (!categoryCode) return;

                const products: Product[] = await getProducts(categoryCode);

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
            } catch (error) {
                console.error("Error loading predictions:", error);
            } finally {
                setIsLoadingPredictions(false);
            }
        }

        loadPredictions(goalName);
    }, [goalName]);

    // ─── Render ─────────────────────────────────────────────────────────────
    return (
        <Flex direction="column" gap={8} p={6}>
            {/* Módulo principal — Descuentos sugeridos */}
            <SuggestedDiscountModule
                products={products}
                selectedProductId={selectedProductId}
                selectedProduct={selectedProduct}
                onProductChange={setSelectedProductId}
                isLoading={isLoadingDiscounts}
                error={discountError}
            />

            {/* Módulo secundario — Predicciones */}
            {isLoadingPredictions ? (
                <Box display="flex" justifyContent="center" py={10}>
                    <Spinner />
                </Box>
            ) : (
                <DiscountPredictions rows={predictionRows} />
            )}
        </Flex>
    );
}