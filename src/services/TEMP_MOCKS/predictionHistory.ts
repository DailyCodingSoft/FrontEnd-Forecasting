import type { WeekGroup } from "@/types/predictionHistoryTypes";

export const mockPredictionHistory: WeekGroup[] = [
  {
    year: 2026,
    week: 10,
    startDate: "2026-07-22",
    endDate: "2026-07-28",
    status: "current",
    predictions: [
      { productName: "AGUILA 330",     sku: "001", quantity: 1240, generatedAt: "2026-07-22", category: "Cervezas" },
      { productName: "COSTEÑA 330",    sku: "002", quantity: 870,  generatedAt: "2026-07-22", category: "Cervezas" },
      { productName: "AGUA ZALVA 1.5", sku: "003", quantity: 430,  generatedAt: "2026-07-22", category: "Aguas" },
    ],
  },
  {
    year: 2026,
    week: 9,
    startDate: "2026-07-15",
    endDate: "2026-07-21",
    status: "finalized",
    predictions: [
      { productName: "POKER 330",      sku: "015", quantity: 980, generatedAt: "2026-07-15", category: "Cervezas" },
      { productName: "MALTA LEONA 330",sku: "022", quantity: 560, generatedAt: "2026-07-15", category: "Maltas" },
      { productName: "CORONITA*6",     sku: "008", quantity: 320, generatedAt: "2026-07-15", category: "Cervezas" },
      { productName: "AGUA ZALVA 1.5", sku: "003", quantity: 510, generatedAt: "2026-07-16", category: "Aguas" },
    ],
  },
  {
    year: 2026,
    week: 8,
    startDate: "2026-07-08",
    endDate: "2026-07-14",
    status: "finalized",
    predictions: [
      { productName: "AGUILA 750",        sku: "004", quantity: 740, generatedAt: "2026-07-08", category: "Cervezas" },
      { productName: "CLUB COLOMBIA 330", sku: "011", quantity: 615, generatedAt: "2026-07-08", category: "Cervezas" },
      { productName: "MALTA LEONA 330",   sku: "022", quantity: 410, generatedAt: "2026-07-09", category: "Maltas" },
      { productName: "AGUA ZALVA 1.5",    sku: "003", quantity: 380, generatedAt: "2026-07-09", category: "Aguas" },
      { productName: "POKER 330",         sku: "015", quantity: 295, generatedAt: "2026-07-10", category: "Cervezas" },
    ],
  },
];
