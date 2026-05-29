import { Box, Flex, Heading, Table } from "@chakra-ui/react";
import type { WeekGroup } from "@/types/predictionHistoryTypes";
import Card from "@/components/ui/Card";
import CategoryTag from "@/components/ui/CategoryTag";
import WeekStatusTag from "@/components/ui/WeekStatusTag";
import MetaLabel from "@/components/ui/MetaLabel";
import SkuPill from "@/components/ui/SkuPill";
import { formatWeekShortLabel } from "@/utils/formatWeekLabel";

type Props = {
  group: WeekGroup;
};

const COLUMNS = ["Producto", "Código", "Cantidad", "Fecha generada", "Categoría"] as const;

export default function PredictionHistoryWeekSection({ group }: Props) {
  const { status, predictions } = group;

  return (
    <Card elevated w="full" p={6}>
      <Flex align="center" justify="space-between" mb={4} gap={4} wrap="wrap">
        <Flex align="center" gap={3} wrap="wrap">
          <Heading
            as="h2"
            fontSize="lg"
            fontWeight="bold"
            color="text.primary"
            letterSpacing="tight"
          >
            {formatWeekShortLabel(group)}
          </Heading>
          <WeekStatusTag status={status} />
        </Flex>
        <MetaLabel>{`${predictions.length} predicciones`}</MetaLabel>
      </Flex>

      <Box borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor="border.subtle">
        <Table.Root width="100%">
          <Table.Header>
            <Table.Row bg="surface.muted">
              {COLUMNS.map((label) => (
                <Table.ColumnHeader key={label} px={4} py={3} textAlign="left">
                  <MetaLabel as="span">{label}</MetaLabel>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {predictions.map((row, i) => {
              const isLast = i === predictions.length - 1;
              return (
                <Table.Row
                  key={`${row.sku}-${row.generatedAt}-${i}`}
                  bg="surface.base"
                  _hover={{ bg: "surface.muted" }}
                  transition="background-color 150ms"
                  borderBottomWidth={isLast ? "0" : "1px"}
                  borderBottomColor="border.subtle"
                >
                  <Table.Cell px={4} py={4} fontSize="sm" fontWeight="semibold" color="text.primary">
                    {row.productName}
                  </Table.Cell>
                  <Table.Cell px={4} py={4}>
                    <SkuPill sku={row.sku} />
                  </Table.Cell>
                  <Table.Cell px={4} py={4} fontSize="sm" fontWeight="bold" color="text.primary">
                    {row.quantity.toLocaleString("es-CO")}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} fontSize="sm" color="text.secondary" fontFamily="mono">
                    {row.generatedAt}
                  </Table.Cell>
                  <Table.Cell px={4} py={4}>
                    <CategoryTag category={row.category} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
    </Card>
  );
}
