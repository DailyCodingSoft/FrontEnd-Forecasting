export interface PredictionHistoryEntry {
  productName: string;
  sku: string;
  quantity: number;
  generatedAt: string;
  category: string;
}

export interface WeekGroup {
  year: number;
  week: number;
  startDate: string;
  endDate: string;
  status: "current" | "finalized";
  predictions: PredictionHistoryEntry[];
}
