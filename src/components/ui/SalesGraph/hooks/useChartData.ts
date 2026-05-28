import type { SaleRow } from "@/types/SalesTypes";

interface UseChartDataInput {
    filteredRows: SaleRow[];
    weeks: number[];
    allProducts: string[];
    selectedProducts: Set<string>;
    getChartColor: (idx: number) => string;
    predictionColor: string;
    predictionBorderColor: string;
}

export interface ChartDataset {
    label: string;
    data: (number | null)[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    pointRadius: number[];
    pointHoverRadius: number;
    pointBackgroundColor: string[];
    pointBorderColor: string[];
    tension: number;
    fill: boolean;
    spanGaps: boolean;
}

export interface ChartData {
    xLabels: string[];
    tickStep: number;
    datasets: ChartDataset[];
}

function pickTickStep(weekCount: number): number {
    if (weekCount <= 8) return 1;
    if (weekCount <= 16) return 2;
    if (weekCount <= 30) return 4;
    return 8;
}

export function useChartData(input: UseChartDataInput): ChartData {
    const {
        filteredRows,
        weeks,
        allProducts,
        selectedProducts,
        getChartColor,
        predictionColor,
        predictionBorderColor,
    } = input;

    const xLabels = weeks.map((w) => `${w}`);
    const tickStep = pickTickStep(weeks.length);
    const normalPointRadius = weeks.length > 20 ? 2 : 4;

    const datasets = allProducts
        .filter((p) => selectedProducts.has(p))
        .map<ChartDataset>((product) => {
            const color = getChartColor(allProducts.indexOf(product));
            const pointBackgroundColor: string[] = [];
            const pointBorderColor: string[] = [];
            const pointRadius: number[] = [];

            const data = weeks.map((week) => {
                const match = filteredRows.find(
                    (r) => r.productName === product && r.week === week
                );

                if (match?.isPrediction) {
                    pointBackgroundColor.push(predictionColor);
                    pointBorderColor.push(predictionBorderColor);
                    pointRadius.push(6);
                } else {
                    pointBackgroundColor.push(color);
                    pointBorderColor.push(color);
                    pointRadius.push(normalPointRadius);
                }

                return match ? match.quantity : null;
            });

            return {
                label: product,
                data,
                borderColor: color,
                backgroundColor: color + "15",
                borderWidth: 2,
                pointRadius,
                pointHoverRadius: 8,
                pointBackgroundColor,
                pointBorderColor,
                tension: 0.4,
                fill: false,
                spanGaps: true,
            };
        });

    return { xLabels, tickStep, datasets };
}
