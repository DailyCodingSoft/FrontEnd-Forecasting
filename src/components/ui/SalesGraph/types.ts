import type { SaleRow } from "@/types/SalesTypes";

export type TimeRange = "1M" | "Q1" | "Q2" | "1Y" | "MAX";

export interface SalesChartProps {
    rows: SaleRow[];
    title?: string;
    simplified?: boolean;
}
