"use client";

import { useEffect, useRef, useState } from "react";
import { useChartTokens } from "@/theme/useChartTokens";
import type { SalesChartProps } from "./types";
import { WEEKS_BY_RANGE, TIME_RANGES } from "./constants";
import { useProductSelection } from "./hooks/useProductSelection";
import { useTimeRange } from "./hooks/useTimeRange";
import { useChartData } from "./hooks/useChartData";

export default function SalesChart({
    rows,
    title = "Total de Ventas",
    simplified = false,
}: SalesChartProps) {
    const {
        getChartColor,
        predictionColor: PREDICTION_COLOR,
        predictionBorderColor: PREDICTION_BORDER_COLOR,
        tooltip: CHART_TOOLTIP,
        grid: CHART_GRID,
        tickColor: CHART_TICK_COLOR,
        swatchInactiveColor: SWATCH_INACTIVE_COLOR,
    } = useChartTokens();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartRef = useRef<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Cerrar dropdown al hacer click afuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const { xLabels, tickStep, datasets } = useChartData({
        filteredRows,
        weeks,
        allProducts,
        selectedProducts,
        getChartColor,
        predictionColor: PREDICTION_COLOR,
        predictionBorderColor: PREDICTION_BORDER_COLOR,
    });

    useEffect(() => {
        let cancelled = false;

        const buildChart = async () => {
            const {
                Chart,
                CategoryScale,
                LinearScale,
                PointElement,
                LineElement,
                LineController,
                Tooltip,
                Legend,
                Filler,
            } = await import("chart.js");

            Chart.register(
                CategoryScale, LinearScale, PointElement,
                LineElement, LineController, Tooltip, Legend, Filler
            );

            if (cancelled || !canvasRef.current) return;

            const existing = Chart.getChart(canvasRef.current);
            if (existing) existing.destroy();

            chartRef.current = new Chart(canvasRef.current, {
                type: "line",
                data: { labels: xLabels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: "index", intersect: false },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            ...CHART_TOOLTIP,
                            borderWidth: 1,
                            padding: 12,
                            callbacks: {
                                title: (items) => `Semana ${weeks[items[0].dataIndex]}`,
                                label: (ctx) => {
                                    const v = ctx.raw as number | null;
                                    return v === null
                                        ? ""
                                        : `  ${ctx.dataset.label}: ${v.toLocaleString("es-CO")}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: { color: CHART_GRID.x },
                            border: { dash: [4, 4] },
                            ticks: {
                                font: { size: 11 },
                                color: CHART_TICK_COLOR,
                                maxRotation: 0,
                                callback: (_val, index) =>
                                    index % tickStep === 0 ? xLabels[index] : "",
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: { color: CHART_GRID.y },
                            ticks: {
                                font: { size: 11 },
                                color: CHART_TICK_COLOR,
                                callback: (v) => Number(v).toLocaleString("es-CO"),
                            },
                        },
                    },
                    animation: { duration: 300 },
                },
            });
        };

        buildChart();

        return () => {
            cancelled = true;
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [
        xLabels,
        datasets,
        weeks,
        tickStep,
        CHART_TOOLTIP,
        CHART_GRID.x,
        CHART_GRID.y,
        CHART_TICK_COLOR,
    ]);

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

                {/* Dropdown selector de productos */}
                {!simplified && <div className="relative flex-shrink-0" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((o) => !o)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                        <span>
                            {selectedCount === totalCount
                                ? "Todos"
                                : `${selectedCount} producto${selectedCount !== 1 ? "s" : ""}`}
                        </span>
                        <svg
                            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                            {/* Acciones rápidas */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Filtrar productos
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAll}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                                    >
                                        Todos
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button
                                        onClick={clearAll}
                                        className="text-xs text-gray-400 hover:text-gray-600 font-semibold cursor-pointer"
                                    >
                                        Limpiar
                                    </button>
                                </div>
                            </div>

                            {/* Lista scrolleable */}
                            <div className="max-h-60 overflow-y-auto py-1">
                                {allProducts.map((product, idx) => {
                                    const color = getChartColor(idx);
                                    const active = selectedProducts.has(product);
                                    return (
                                        <button
                                            key={product}
                                            onClick={() => toggleProduct(product)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            {/* Swatch de color */}
                                            <span
                                                className="flex-shrink-0 w-2.5 h-2.5 rounded-sm transition-colors"
                                                style={{ backgroundColor: active ? color : SWATCH_INACTIVE_COLOR }}
                                            />
                                            <span
                                                className={`flex-1 truncate text-sm transition-colors ${active ? "text-gray-800 font-medium" : "text-gray-400"
                                                    }`}
                                            >
                                                {product}
                                            </span>
                                            {active && (
                                                <svg
                                                    className="w-3.5 h-3.5 flex-shrink-0"
                                                    style={{ color }}
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>}
            </div>

            {/* Filtro de tiempo estilo Google Finance */}
            {!simplified && <div className="flex items-center gap-0.5 mb-3 px-1">
                {TIME_RANGES.map(({ label, value }) => {
                    const weeksNeeded = WEEKS_BY_RANGE[value];
                    const disabled =
                        weeksNeeded !== null && allWeekNumbers.length < weeksNeeded;
                    const active = timeRange === value;
                    return (
                        <button
                            key={value}
                            onClick={() => !disabled && setTimeRange(value)}
                            disabled={disabled}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer select-none ${active
                                ? "bg-gray-800 text-white"
                                : disabled
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
                {/* Info del rango activo */}
                <span className="ml-auto text-xs text-gray-400 tabular-nums">
                    S{weeks[0]} – S{weeks[weeks.length - 1]}
                </span>
            </div>}

            {/* Chart */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white px-4 pt-4 pb-2 mb-3">
                <div style={{ position: "relative", height: "300px" }}>
                    <canvas
                        ref={canvasRef}
                        role="img"
                        aria-label="Gráfico de líneas de ventas por producto y semana"
                    />
                </div>
            </div>

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