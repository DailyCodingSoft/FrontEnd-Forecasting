import { useMemo } from "react";
import { useToken } from "@chakra-ui/react";

const SERIES_PATHS = Array.from({ length: 20 }, (_, i) => `chart.series.${i}`);

export interface ChartTokens {
    getChartColor: (idx: number) => string;
    predictionColor: string;
    predictionBorderColor: string;
    tooltip: {
        backgroundColor: string;
        titleColor: string;
        bodyColor: string;
        borderColor: string;
    };
    grid: { x: string; y: string };
    tickColor: string;
    swatchInactiveColor: string;
}

export function useChartTokens(): ChartTokens {
    const series = useToken("colors", SERIES_PATHS);
    const [
        predictionColor,
        predictionBorderColor,
        tickColor,
        gridX,
        gridY,
        tooltipBg,
        tooltipTitle,
        tooltipBody,
        tooltipBorder,
        swatchInactiveColor,
    ] = useToken("colors", [
        "chart.prediction",
        "chart.predictionBorder",
        "chart.tick",
        "chart.gridX",
        "chart.gridY",
        "chart.tooltipBg",
        "chart.tooltipTitle",
        "chart.tooltipBody",
        "chart.tooltipBorder",
        "chart.swatchInactive",
    ]);

    return useMemo<ChartTokens>(
        () => ({
            getChartColor: (idx: number) => series[idx % series.length],
            predictionColor,
            predictionBorderColor,
            tooltip: {
                backgroundColor: tooltipBg,
                titleColor: tooltipTitle,
                bodyColor: tooltipBody,
                borderColor: tooltipBorder,
            },
            grid: { x: gridX, y: gridY },
            tickColor,
            swatchInactiveColor,
        }),
        [
            series,
            predictionColor,
            predictionBorderColor,
            tooltipBg,
            tooltipTitle,
            tooltipBody,
            tooltipBorder,
            gridX,
            gridY,
            tickColor,
            swatchInactiveColor,
        ]
    );
}
