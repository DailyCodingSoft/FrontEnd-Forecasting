export interface SaleRow {
  productName: string;
  identificator: string;
  quantity: number;
  week: number;
  date: string;
}

export interface Column {
  key: keyof SaleRow;
  label: string;
}

export interface SalesTableResponse {
    rows: SaleRow[];
    columns: Column[];
}