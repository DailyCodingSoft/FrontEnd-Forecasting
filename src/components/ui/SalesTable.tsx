import { useState } from "react";
import type { Column, SaleRow } from "@/types/SalesTypes";
import { format } from 'date-fns';

type SortDirection = "asc" | "desc";

interface SalesTableProps {
  rows: SaleRow[];
  cols: (keyof SaleRow)[];
  title?: string;
  sort_key?: keyof SaleRow | null;
  sort_dir?: SortDirection;
}

export default function SalesTable({ rows, cols, title = "Reporte de Ventas", sort_key = null, sort_dir = "asc" }: SalesTableProps) {
  const [sortKey, setSortKey] = useState<keyof SaleRow | null>(sort_key);
  const [sortDir, setSortDir] = useState<SortDirection>(sort_dir);

  const columns: Column[] = cols.map(c => ({
      key: c,
      label: c
  }));

  const handleSort = (key: keyof SaleRow): void => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...rows].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }
    return sortDir === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalquantitys = rows.reduce((sum, row) => sum + row.quantity, 0);
  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {rows.length} productos · Semana {rows[0]?.week}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total Ventas</p>
          <p className="text-2xl font-black text-gray-900">
            {totalquantitys.toLocaleString("es-CO")}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3.5 text-center text-xs font-semibold text-white uppercase tracking-wider cursor-pointer select-none transition-colors hover:bg-gray-700 first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  <span className="flex items-center justify-center gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      <span className="text-amber-400 text-xs">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs opacity-60">↕</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const isLast = i === sorted.length - 1;
              const isEven = i % 2 === 0;
              return (
                <tr
                  key={`${row.identificator}-${row.week}`}
                  className={`
                    transition-colors duration-150
                    ${row.isPrediction ? "bg-cyan-300" : isEven ? "bg-white" : "bg-gray-50"}
                    ${row.isPrediction ? "hover:bg-cyan-100" : "hover:bg-amber-50"}
                    ${isLast ? "last:rounded-b-2xl" : "border-b border-gray-100"}
                  `}
                >
                  <td className="px-4 py-4 text-center text-sm font-semibold text-gray-800 leading-tight">
                    {row.productName}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block bg-gray-800 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full tracking-widest">
                      {row.identificator}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
                    {row.quantity.toLocaleString("es-CO")}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {row.week}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-500 font-mono">
                    {row.date.split("T")[0]}
                    {/* si las fechas se rompen es culpa de esta linea jaja */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-3 px-1 text-right">
        Haz clic en una columna para ordenar
      </p>
    </div>
  );
}