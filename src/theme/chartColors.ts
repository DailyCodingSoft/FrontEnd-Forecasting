export const CHART_PALETTE = [
    "#1d4ed8", "#dc2626", "#16a34a", "#d97706", "#7c3aed",
    "#0891b2", "#be185d", "#059669", "#ea580c", "#6366f1",
    "#84cc16", "#f43f5e", "#14b8a6", "#a855f7", "#fb923c",
    "#0ea5e9", "#10b981", "#e11d48", "#8b5cf6", "#22c55e",
]

export function getChartColor(idx: number): string {
    return CHART_PALETTE[idx % CHART_PALETTE.length]
}

export const PREDICTION_COLOR = "#eab308"
export const PREDICTION_BORDER_COLOR = "#ca8a04"

export const CHART_TOOLTIP = {
    backgroundColor: "#1f2937",
    titleColor: "#f9fafb",
    bodyColor: "#d1d5db",
    borderColor: "#374151",
}

export const CHART_GRID = {
    x: "#f9fafb",
    y: "#f3f4f6",
}

export const CHART_TICK_COLOR = "#9ca3af"

export const SWATCH_INACTIVE_COLOR = "#d1d5db"
