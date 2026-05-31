import { useState } from "react";
import type { SaleRow } from "@/types/SalesTypes";
import type { TimeRange } from "../types";
import { WEEKS_BY_RANGE } from "../constants";

export interface TimeRangeApi {
    range: TimeRange;
    setRange: (range: TimeRange) => void;
    filteredRows: SaleRow[];
    weeks: number[];
    allWeekNumbers: number[];
}

function filterByWeeks(rows: SaleRow[], range: TimeRange): SaleRow[] {
    const limit = WEEKS_BY_RANGE[range];
    if (limit === null) return rows;
    const allWeeks = [...new Set(rows.map((r) => r.week))].sort((a, b) => b - a);
    const latestWeeks = new Set(allWeeks.slice(0, limit));
    return rows.filter((r) => latestWeeks.has(r.week));
}

export function useTimeRange(rows: SaleRow[], simplified: boolean): TimeRangeApi {
    const [range, setRange] = useState<TimeRange>("MAX");
    const effective: TimeRange = simplified ? "MAX" : range;

    const filteredRows = filterByWeeks(rows, effective);
    const weeks = [...new Set(filteredRows.map((r) => r.week))].sort((a, b) => a - b);
    const allWeekNumbers = [...new Set(rows.map((r) => r.week))];

    return { range: effective, setRange, filteredRows, weeks, allWeekNumbers };
}
