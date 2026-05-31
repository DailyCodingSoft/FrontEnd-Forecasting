"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useChartTokens } from "@/theme/useChartTokens";
import type { ChartDataset } from "./hooks/useChartData";

interface ChartCanvasProps {
    xLabels: string[];
    datasets: ChartDataset[];
    weeks: number[];
    tickStep: number;
}

export default function ChartCanvas({
    xLabels,
    datasets,
    weeks,
    tickStep,
}: ChartCanvasProps) {
    const { tooltip, grid, tickColor } = useChartTokens();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartRef = useRef<any>(null);

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
                            ...tooltip,
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
                            grid: { color: grid.x },
                            border: { dash: [4, 4] },
                            ticks: {
                                font: { size: 11 },
                                color: tickColor,
                                maxRotation: 0,
                                callback: (_val, index) =>
                                    index % tickStep === 0 ? xLabels[index] : "",
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: { color: grid.y },
                            ticks: {
                                font: { size: 11 },
                                color: tickColor,
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
    }, [xLabels, datasets, weeks, tickStep, tooltip, grid.x, grid.y, tickColor]);

    return (
        <Box
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            bg="white"
            px={4}
            pt={4}
            pb={2}
            mb={3}
        >
            <Box position="relative" h="300px">
                <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label="Gráfico de líneas de ventas por producto y semana"
                />
            </Box>
        </Box>
    );
}
