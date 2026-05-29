import { useState } from "react";
import { Box, Flex, Heading, Span, Table, Text } from "@chakra-ui/react";
import MetaLabel from "@/components/ui/MetaLabel";
import SkuPill from "@/components/ui/SkuPill";
import type { Column, SaleRow } from "@/types/SalesTypes";

type SortDirection = "asc" | "desc";

interface SalesTableProps {
  rows: SaleRow[];
  title?: string;
  sort_key?: keyof SaleRow | null;
  sort_dir?: SortDirection;
}

const columns: Column[] = [
  { key: "productName", label: "productName" },
  { key: "identificator", label: "identificator" },
  { key: "quantity", label: "quantity" },
  { key: "week", label: "week" },
  { key: "date", label: "date" },
];

export default function SalesTable({ rows, title = "Reporte de Ventas", sort_key = null, sort_dir = "asc" }: SalesTableProps) {
  const [sortKey, setSortKey] = useState<keyof SaleRow | null>(sort_key);
  const [sortDir, setSortDir] = useState<SortDirection>(sort_dir);

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
    <Box className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <Flex align="center" justify="space-between" mb={4} px={1}>
        <Box>
          <Heading as="h2" textStyle="heading.section" color="text.primary">
            {title}
          </Heading>
          <Text textStyle="body.xs" color="text.muted" mt="0.5">
            {rows.length} productos · Semana {rows[0]?.week}
          </Text>
        </Box>
        <Box textAlign="right">
          <MetaLabel color="text.muted">Total Ventas</MetaLabel>
          <Text fontSize="2xl" fontWeight="black" color="text.primary">
            {totalquantitys.toLocaleString("es-CO")}
          </Text>
        </Box>
      </Flex>

      {/* Table */}
      <Box
        borderRadius="card"
        overflow="hidden"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="border.subtle"
      >
        <Table.Root width="100%">
          <Table.Header>
            <Table.Row bg="surface.inverse">
              {columns.map((col) => (
                <Table.ColumnHeader
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  px={4}
                  py="3.5"
                  textAlign="center"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="text.onInverse"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  cursor="pointer"
                  userSelect="none"
                  transition="background-color 150ms"
                  _hover={{ bg: "neutral.800" }}
                >
                  <Flex align="center" justify="center" gap={1}>
                    {col.label}
                    {sortKey === col.key ? (
                      <Span color="accent.warning.solid" fontSize="xs">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </Span>
                    ) : (
                      <Span color="neutral.500" fontSize="xs" opacity={0.6}>↕</Span>
                    )}
                  </Flex>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sorted.map((row, i) => {
              const isLast = i === sorted.length - 1;
              const isEven = i % 2 === 0;
              const rowBg = row.isPrediction ? "accent.warning.bg" : isEven ? "surface.base" : "surface.muted";
              const rowHoverBg = row.isPrediction ? "amber.100" : "surface.muted";
              return (
                <Table.Row
                  key={`${row.identificator}-${row.week}`}
                  bg={rowBg}
                  _hover={{ bg: rowHoverBg }}
                  transition="background-color 150ms"
                  borderBottomWidth={isLast ? "0" : "1px"}
                  borderBottomColor="border.subtle"
                >
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="text.primary"
                    lineHeight="tight"
                  >
                    {row.productName}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} textAlign="center">
                    <SkuPill sku={row.identificator} />
                  </Table.Cell>
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {row.quantity.toLocaleString("es-CO")}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} textAlign="center">
                    <Span
                      display="inline-block"
                      bg="amber.100"
                      color="amber.800"
                      fontSize="xs"
                      fontWeight="bold"
                      px="2.5"
                      py={1}
                      borderRadius="pill"
                    >
                      {row.week}
                    </Span>
                  </Table.Cell>
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    color="text.secondary"
                    fontFamily="mono"
                  >
                    {row.date.split("T")[0]}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Footer note */}
      <Text textStyle="body.xs" color="text.muted" mt={3} px={1} textAlign="right">
        Haz clic en una columna para ordenar
      </Text>
    </Box>
  );
}
