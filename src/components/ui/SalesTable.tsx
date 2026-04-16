import { useState } from "react";
import type { SaleRow, Column } from "@/types/SalesTypes";

interface SalesTableProps {
  data: SaleRow[];
  columns: Column[];
  title?: string;
}

type SortDirection = "asc" | "desc";

export default function SalesTable({ data, columns, title = "Reporte de Ventas" }: SalesTableProps) {
  const [sortKey, setSortKey] = useState<keyof SaleRow | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const handleSort = (key: keyof SaleRow): void => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...data].sort((a, b) => {
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

  const totalVentas = data.reduce((sum, row) => sum + row.venta, 0);

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
            {data.length} productos · Semana {data[0]?.semana}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total ventas</p>
          <p className="text-2xl font-black text-gray-900">
            {totalVentas.toLocaleString("es-CO")}
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
                  key={row.identificador}
                  className={`
                    transition-colors duration-150
                    ${isEven ? "bg-white" : "bg-gray-50"}
                    hover:bg-amber-50
                    ${isLast ? "last:rounded-b-2xl" : "border-b border-gray-100"}
                  `}
                >
                  <td className="px-4 py-4 text-center text-sm font-semibold text-gray-800 leading-tight">
                    {row.producto}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block bg-gray-800 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full tracking-widest">
                      {row.identificador}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
                    {row.venta.toLocaleString("es-CO")}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {row.semana}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-500 font-mono">
                    {row.fecha}
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