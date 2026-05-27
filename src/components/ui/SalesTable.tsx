import { useState } from "react";
import { Box, Flex, Heading, Span, Table, Text } from "@chakra-ui/react";
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
    <Box
      className="w-full max-w-3xl mx-auto"
      fontFamily="'DM Sans', 'Segoe UI', sans-serif"
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={4} px={1}>
        <Box>
          <Heading
            as="h2"
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            letterSpacing="tight"
          >
            {title}
          </Heading>
          <Text fontSize="xs" color="gray.400" mt="0.5">
            {rows.length} productos · Semana {rows[0]?.week}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text
            fontSize="xs"
            color="gray.400"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Total Ventas
          </Text>
          <Text fontSize="2xl" fontWeight="black" color="gray.900">
            {totalquantitys.toLocaleString("es-CO")}
          </Text>
        </Box>
      </Flex>

      {/* Table */}
      <Box
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="gray.100"
      >
        <Table.Root width="100%">
          <Table.Header>
            <Table.Row bg="gray.800">
              {columns.map((col) => (
                <Table.ColumnHeader
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  px={4}
                  py="3.5"
                  textAlign="center"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="white"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  cursor="pointer"
                  userSelect="none"
                  transition="background-color 150ms"
                  _hover={{ bg: "gray.700" }}
                >
                  <Flex align="center" justify="center" gap={1}>
                    {col.label}
                    {sortKey === col.key ? (
                      <Span color="yellow.400" fontSize="xs">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </Span>
                    ) : (
                      <Span color="gray.500" fontSize="xs" opacity={0.6}>↕</Span>
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
              const rowBg = row.isPrediction ? "cyan.300" : isEven ? "white" : "gray.50";
              const rowHoverBg = row.isPrediction ? "cyan.100" : "yellow.50";
              return (
                <Table.Row
                  key={`${row.identificator}-${row.week}`}
                  bg={rowBg}
                  _hover={{ bg: rowHoverBg }}
                  transition="background-color 150ms"
                  borderBottomWidth={isLast ? "0" : "1px"}
                  borderBottomColor="gray.100"
                >
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.800"
                    lineHeight="tight"
                  >
                    {row.productName}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} textAlign="center">
                    <Span
                      display="inline-block"
                      bg="gray.800"
                      color="white"
                      fontSize="xs"
                      fontFamily="mono"
                      fontWeight="bold"
                      px="2.5"
                      py={1}
                      borderRadius="full"
                      letterSpacing="widest"
                    >
                      {row.identificator}
                    </Span>
                  </Table.Cell>
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray.900"
                  >
                    {row.quantity.toLocaleString("es-CO")}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} textAlign="center">
                    <Span
                      display="inline-block"
                      bg="yellow.100"
                      color="yellow.800"
                      fontSize="xs"
                      fontWeight="bold"
                      px="2.5"
                      py={1}
                      borderRadius="full"
                    >
                      {row.week}
                    </Span>
                  </Table.Cell>
                  <Table.Cell
                    px={4}
                    py={4}
                    textAlign="center"
                    fontSize="sm"
                    color="gray.500"
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
      <Text fontSize="xs" color="gray.400" mt={3} px={1} textAlign="right">
        Haz clic en una columna para ordenar
      </Text>
    </Box>
  );
}
