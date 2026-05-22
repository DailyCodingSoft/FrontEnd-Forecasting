import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";
import type { WeekGroup } from "@/types/predictionHistoryTypes";
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
  const { startDate, endDate, status, predictions } = group;

  return (
    <Box w="full" bg="white" borderRadius="2xl" boxShadow="md" p={6}>
      <Flex align="center" justify="space-between" mb={4} gap={4} wrap="wrap">
        <Flex align="center" gap={3} wrap="wrap">
          <Box>
            <Heading
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              color="gray.800"
              letterSpacing="tight"
            >
              {formatWeekShortLabel(group)}
            </Heading>
            <Text fontSize="xs" color="gray.500" mt="0.5" fontFamily="mono">
              {`${startDate} al ${endDate}`}
            </Text>
          </Box>
          <WeekStatusTag status={status} />
        </Flex>
        <MetaLabel>{`${predictions.length} predicciones`}</MetaLabel>
      </Flex>

      <Box borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor="gray.100">
        <Table.Root width="100%">
          <Table.Header>
            <Table.Row bg="gray.50">
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
                  bg="white"
                  _hover={{ bg: "gray.50" }}
                  transition="background-color 150ms"
                  borderBottomWidth={isLast ? "0" : "1px"}
                  borderBottomColor="gray.100"
                >
                  <Table.Cell px={4} py={4} fontSize="sm" fontWeight="semibold" color="gray.800">
                    {row.productName}
                  </Table.Cell>
                  <Table.Cell px={4} py={4}>
                    <SkuPill sku={row.sku} />
                  </Table.Cell>
                  <Table.Cell px={4} py={4} fontSize="sm" fontWeight="bold" color="gray.900">
                    {row.quantity.toLocaleString("es-CO")}
                  </Table.Cell>
                  <Table.Cell px={4} py={4} fontSize="sm" color="gray.500" fontFamily="mono">
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
    </Box>
  );
}
