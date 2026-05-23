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
  status: "current" | "finalized";
  predictions: PredictionHistoryEntry[];
}

export type PredictionHistoryResponse = Record<string, PredictionHistoryEntry[]>;
