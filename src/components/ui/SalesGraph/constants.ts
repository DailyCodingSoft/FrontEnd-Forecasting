import type { TimeRange } from "./types";

export const WEEKS_BY_RANGE: Record<TimeRange, number | null> = {
    "1M": 4,
    Q1: 13,
    Q2: 26,
    "1Y": 52,
    MAX: null,
};

export const TIME_RANGES: { label: string; value: TimeRange }[] = [
    { label: "1M", value: "1M" },
    { label: "T1", value: "Q1" },
    { label: "T2", value: "Q2" },
    { label: "1A", value: "1Y" },
    { label: "Máx", value: "MAX" },
];
