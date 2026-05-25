import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import GoalSummaryCard from "@/components/ui/GoalSummaryCard";
import DiscountPredictions from "@/components/ui/DiscountPredictions";
import ProductDiscountList, { type ProductDiscountItem } from "@/components/ui/ProductDiscountCard";
import { generateSuggestedDiscounts, getSuggestedDiscountsByGoalName } from "@/services/suggestedPrices";
import { getGoalByName, getGoalCategories } from "@/services/goals";
import { getProducts, getSalesTableDataByFilters } from "@/services/sales";
import { getPrediction } from "@/services/predictions";
import type { SaleRow } from "@/types/SalesTypes";
import type { Goal, GoalCategory } from "@/types/goalTypes";
import type { Product } from "@/types/products";

export interface SuggestedDiscount {
    suggestedDiscountId: number;
    identificator: string;
    goalId: number;
    productName: string;
    minimumPrice: number;
    maximumPrice: number;
}

// ─── Utilidades de cálculo ────────────────────────────────────────────────────

/**
 * Distribuye las unidades de la meta entre los productos
 * de mayor a menor predicción hasta completar goal.quantity.
 */
function allocateProducts(
    items: ProductDiscountItem[],
    goalQuantity: number
): Array<ProductDiscountItem & { assignedQuantity: number }> {
    const totalPrediction = items.reduce((sum, item) => sum + item.Prediccion, 0);

    // Si la predicción total es 0 no hay nada que distribuir
    if (totalPrediction === 0) {
        return items.map((item) => ({ ...item, assignedQuantity: 0 }));
    }

    return items.map((item) => {
        // Peso proporcional del producto sobre la predicción total
        const weight = item.Prediccion / totalPrediction;
        const assigned = Math.round(goalQuantity * weight);
        return { ...item, assignedQuantity: assigned };
    });
}

/**
 * Calcula las tres ganancias a partir de las asignaciones y el bono.
 * - maxEarnings:    precio máximo de cada producto * cantidad asignada + bono
 * - minEarnings:    precio mínimo de cada producto * cantidad asignada + bono
 * - sliderEarnings: precio seleccionado en slider   * cantidad asignada + bono
 */
function calculateEarnings(
    allocations: Array<ProductDiscountItem & { assignedQuantity: number }>,
    bonus: number,
    selectedPrices: Record<string, number>
) {
    let maxEarnings = bonus;
    let minEarnings = bonus;
    let sliderEarnings = bonus;

    for (const a of allocations) {
        if (a.assignedQuantity === 0) continue;
        maxEarnings    += a.PrecioMaximo * a.assignedQuantity;
        minEarnings    += a.PrecioMinimo * a.assignedQuantity;
        sliderEarnings += (selectedPrices[a.identificator] ?? a.PrecioMinimo) * a.assignedQuantity;
    }

    return { maxEarnings, minEarnings, sliderEarnings };
}

function buildSliderLog(
    productos: ProductDiscountItem[],
    prices: Record<string, number>
) {
    return productos.map((p) => ({
        identificator: p.identificator,
        prediccion: p.Prediccion,
        precioSeleccionado: prices[p.identificator] ?? p.PrecioMinimo,
    }));
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function Discount() {
    const { goalName } = useParams<{ goalName: string }>();
    const [goal, setGoal] = useState<Goal | null>(null);
    const [productos, setProductos] = useState<ProductDiscountItem[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [discountError, setDiscountError] = useState<string | null>(null);
    const [predictionRows, setPredictionRows] = useState<SaleRow[]>([]);

    useEffect(() => {
        if (!goalName) return;

        async function loadPageData(name: string) {
            setIsLoading(true);
            setDiscountError(null);
            try {
                const [goalData, categories] = await Promise.all([
                    getGoalByName(name),
                    getGoalCategories(),
                ]);
                setGoal(goalData);
                console.log("[Discount] Goal:", goalData);

                const categoryCode = categories.find(
                    (c: GoalCategory) => c.name === goalData.category
                )?.code;

                if (!categoryCode) {
                    setProductos([]);
                    setPredictionRows([]);
                    return;
                }

                const categoryProducts: Product[] = await getProducts(categoryCode);

                const productResults = await Promise.all(
                    categoryProducts.map(async (product) => {
                        const [predictionRes, historicalRes] = await Promise.all([
                            getPrediction(product.identificator),
                            getSalesTableDataByFilters(null, null, product.identificator),
                        ]);

                        const prediction = predictionRes.data;

                        if (!prediction) {
                            return { rows: [] as SaleRow[], identificator: null as string | null, prediction: null as number | null };
                        }

                        const historicalRows: SaleRow[] = historicalRes.rows;
                        const hasRealSales = historicalRows.some((r) => r.quantity > 0);
                        if (!hasRealSales) {
                            console.warn("[Discount] Sin ventas históricas, se omite:", product.identificator);
                            return { rows: [] as SaleRow[], identificator: null as string | null, prediction: null as number | null };
                        }

                        const forecastRow: SaleRow = {
                            productName: product.productName,
                            identificator: prediction.product_identifier,
                            week: parseInt(prediction.week),
                            date: format(Date.now(), "yyyy-MM-dd"),
                            quantity: prediction.sales,
                            isPrediction: true,
                        };

                        return {
                            rows: historicalRows.concat(forecastRow),
                            identificator: prediction.product_identifier as string,
                            prediction: prediction.sales as number,
                        };
                    })
                );

                const inPredictions = new Set(
                    productResults
                        .map((r) => r.identificator)
                        .filter((id): id is string => id !== null)
                );

                setPredictionRows(productResults.flatMap((r) => r.rows));

                await generateSuggestedDiscounts(name);
                const raw: SuggestedDiscount[] = await getSuggestedDiscountsByGoalName(name);

                const seen = new Set<string>();
                const filtered: SuggestedDiscount[] = [];
                for (const d of raw) {
                    if (!d.identificator || !inPredictions.has(d.identificator) || seen.has(d.identificator)) continue;
                    seen.add(d.identificator);
                    filtered.push(d);
                }

                const prediccionPorId = new Map(
                    productResults
                        .filter((r): r is typeof r & { identificator: string; prediction: number } =>
                            r.identificator !== null && r.prediction !== null
                        )
                        .map((r) => [r.identificator, r.prediction])
                );

                const list: ProductDiscountItem[] = filtered.map((d) => ({
                    identificator: d.identificator,
                    NombreProducto: d.productName,
                    PrecioMinimo: d.minimumPrice,
                    PrecioMaximo: d.maximumPrice,
                    Prediccion: prediccionPorId.get(d.identificator) ?? 0,
                }));

                console.log("[Discount] Listado productos:", list);
                setProductos(list);
                setSelectedPrices({});
            } catch (error) {
                console.error("Error loading discount page:", error);
                setDiscountError("No se pudieron cargar los descuentos sugeridos.");
            } finally {
                setIsLoading(false);
            }
        }

        loadPageData(goalName);
    }, [goalName]);

    // ─── Cálculo de ganancias ─────────────────────────────────────────────────

    const earnings = useMemo(() => {
        if (!goal || productos.length === 0) return null;

        const allocations = allocateProducts(productos, goal.quantity);

        console.log("[Earnings] Distribución de unidades:", allocations.map((a) => ({
            identificator: a.identificator,
            NombreProducto: a.NombreProducto,
            Prediccion: a.Prediccion,
            assignedQuantity: a.assignedQuantity,
        })));

        const result = calculateEarnings(allocations, goal.bonus, selectedPrices);

        console.log("[Earnings] Ganancia mínima:", result.minEarnings);
        console.log("[Earnings] Ganancia máxima:", result.maxEarnings);
        console.log("[Earnings] Ganancia slider:", result.sliderEarnings);

        return result;
    }, [goal, productos, selectedPrices]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <Flex direction="column" gap={6} p={6}>
            {goal && <GoalSummaryCard goal={goal} />}

            {isLoading ? (
                <Box display="flex" justifyContent="center" py={10}>
                    <Spinner />
                </Box>
            ) : discountError ? (
                <Box bg="red.50" border="1px solid" borderColor="red.200" borderRadius="xl" px={4} py={3}>
                    <Box fontSize="sm" color="red.700">{discountError}</Box>
                </Box>
            ) : (
                <>
                    <DiscountPredictions rows={predictionRows} />

                    {/* Ganancias */}
                    {earnings && (
                        <Flex gap={4} wrap="wrap">
                            <Box flex={1} minW="180px" bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={4}>
                                <Box fontSize="xs" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide" mb={1}>
                                    Ganancia Mínima
                                </Box>
                                <Box fontSize="xl" fontWeight="bold" color="orange.500">
                                    {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(earnings.minEarnings)}
                                </Box>
                                <Box fontSize="xs" color="gray.400" mt={1}>Precio mínimo por producto</Box>
                            </Box>
                            <Box flex={1} minW="180px" bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={4}>
                                <Box fontSize="xs" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide" mb={1}>
                                    Ganancia Máxima
                                </Box>
                                <Box fontSize="xl" fontWeight="bold" color="green.500">
                                    {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(earnings.maxEarnings)}
                                </Box>
                                <Box fontSize="xs" color="gray.400" mt={1}>Precio máximo por producto</Box>
                            </Box>
                            <Box flex={1} minW="180px" bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={4}>
                                <Box fontSize="xs" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide" mb={1}>
                                    Ganancia Seleccionada
                                </Box>
                                <Box fontSize="xl" fontWeight="bold" color="blue.500">
                                    {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(earnings.sliderEarnings)}
                                </Box>
                                <Box fontSize="xs" color="gray.400" mt={1}>Según precios elegidos en sliders</Box>
                            </Box>
                        </Flex>
                    )}

                    <ProductDiscountList
                        items={productos}
                        onPriceChange={(identificator, price) => {
                            setSelectedPrices((prev) => {
                                const next = { ...prev, [identificator]: price };
                                console.log("[Discount] Slider:", buildSliderLog(productos, next));
                                return next;
                            });
                        }}
                    />
                </>
            )}
        </Flex>
    );
}