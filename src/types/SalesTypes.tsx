export interface SaleRow {
  producto: string;
  identificador: string;
  venta: number;
  semana: number;
  fecha: string;
}

export interface Column {
  key: keyof SaleRow;
  label: string;
}

export interface SalesTableResponse {
    rows: SaleRow[];
    columns: Column[];
}