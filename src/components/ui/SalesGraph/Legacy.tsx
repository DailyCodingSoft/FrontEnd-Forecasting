"use client";

import { useChartTokens } from "@/theme/useChartTokens";
import type { SalesChartProps } from "./types";
import { useProductSelection } from "./hooks/useProductSelection";
import { useTimeRange } from "./hooks/useTimeRange";
import { useChartData } from "./hooks/useChartData";
import ChartCanvas from "./ChartCanvas";
import TimeRangeBar from "./TimeRangeBar";
import ProductMenu from "./ProductMenu";

export default function SalesChart({
    rows,
    title = "Total de Ventas",
    simplified = false,
}: SalesChartProps) {
    const {
        getChartColor,
        predictionColor: PREDICTION_COLOR,
        predictionBorderColor: PREDICTION_BORDER_COLOR,
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
        predictionColor: PREDICTION_COLOR,
        predictionBorderColor: PREDICTION_BORDER_COLOR,
    });

    const selectedCount = selectedProducts.size;
    const totalCount = allProducts.length;

    return (
        <div
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            className="w-full max-w-3xl mx-auto"
        >
            {/* Header + dropdown */}
            <div className="flex items-start justify-between mb-3 px-1 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {selectedCount} de {totalCount} productos · {weeks.length} semanas
                    </p>
                </div>

                {!simplified && (
                    <ProductMenu
                        allProducts={allProducts}
                        selected={selectedProducts}
                        onToggle={toggleProduct}
                        onSelectAll={selectAll}
                        onClearAll={clearAll}
                    />
                )}
            </div>

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

            {/* Leyenda compacta — solo productos activos, como líneas */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 px-1">
                {allProducts
                    .filter((p) => selectedProducts.has(p))
                    .map((product) => {
                        const color = getChartColor(allProducts.indexOf(product));
                        return simplified ? (
                            <span
                                key={product}
                                className="flex items-center gap-1.5 text-xs text-gray-500"
                            >
                                <span
                                    className="inline-block w-4 rounded-full flex-shrink-0"
                                    style={{ height: "2px", backgroundColor: color }}
                                />
                                {product}
                            </span>
                        ) : (
                            <button
                                key={product}
                                onClick={() => toggleProduct(product)}
                                title="Clic para ocultar"
                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                            >
                                <span
                                    className="inline-block w-4 rounded-full flex-shrink-0"
                                    style={{ height: "2px", backgroundColor: color }}
                                />
                                {product}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}