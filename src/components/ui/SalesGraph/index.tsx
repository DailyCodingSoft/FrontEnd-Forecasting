"use client";

import { Box } from "@chakra-ui/react";
import { useChartTokens } from "@/theme/useChartTokens";
import type { SalesChartProps } from "./types";
import { useProductSelection } from "./hooks/useProductSelection";
import { useTimeRange } from "./hooks/useTimeRange";
import { useChartData } from "./hooks/useChartData";
import ChartCanvas from "./ChartCanvas";
import TimeRangeBar from "./TimeRangeBar";
import ProductMenu from "./ProductMenu";
import Header from "./Header";
import Legend from "./Legend";

export type { SalesChartProps, TimeRange } from "./types";

export default function SalesGraph({
    rows,
    title = "Total de Ventas",
    simplified = false,
}: SalesChartProps) {
    const {
        getChartColor,
        predictionColor,
        predictionBorderColor,
    } = useChartTokens();

    const allProducts = [...new Set(rows.map((r) => r.productName))].sort();

    const {
        selected: selectedProducts,
        toggle: toggleProduct,
        selectAll,
        clearAll,
    } = useProductSelection(allProducts);

    const {
        range: timeRange,
        setRange: setTimeRange,
        filteredRows,
        weeks,
        allWeekNumbers,
    } = useTimeRange(rows, simplified);

    const { xLabels, tickStep, datasets } = useChartData({
        filteredRows,
        weeks,
        allProducts,
        selectedProducts,
        getChartColor,
        predictionColor,
        predictionBorderColor,
    });

    const activeProducts = allProducts.filter((p) => selectedProducts.has(p));
    const colorByProduct = (product: string) =>
        getChartColor(allProducts.indexOf(product));
    const subtitle = `${selectedProducts.size} de ${allProducts.length} productos · ${weeks.length} semanas`;

    return (
        <Box w="full" maxW="3xl" mx="auto">
            <Header title={title} subtitle={subtitle}>
                {!simplified && (
                    <ProductMenu
                        allProducts={allProducts}
                        selected={selectedProducts}
                        onToggle={toggleProduct}
                        onSelectAll={selectAll}
                        onClearAll={clearAll}
                    />
                )}
            </Header>

            {!simplified && (
                <TimeRangeBar
                    range={timeRange}
                    onChange={setTimeRange}
                    weeks={weeks}
                    allWeekNumbers={allWeekNumbers}
                />
            )}

            <ChartCanvas
                xLabels={xLabels}
                datasets={datasets}
                weeks={weeks}
                tickStep={tickStep}
            />

            <Legend
                activeProducts={activeProducts}
                getColor={colorByProduct}
                interactive={!simplified}
                onToggle={toggleProduct}
            />
        </Box>
    );
}
