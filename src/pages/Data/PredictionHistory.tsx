import { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import FilterCard from "@/components/ui/FilterCard";
import PillSelect from "@/components/ui/PillSelect";
import Button from "@/components/ui/Button";
import PredictionHistoryWeekSection from "@/components/ui/PredictionHistoryWeekSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { mockPredictionHistory } from "@/services/TEMP_MOCKS/predictionHistory";
import type { WeekGroup } from "@/types/predictionHistoryTypes";
import { formatWeekLongLabel } from "@/utils/formatWeekLabel";

const ALL_WEEKS = "";

const buildWeekKey = (g: Pick<WeekGroup, "year" | "week">) => `${g.year}-W${g.week}`;
const sortByYearWeekDesc = (a: WeekGroup, b: WeekGroup) => b.year - a.year || b.week - a.week;

export default function PredictionHistory() {
  const [selectedWeekKey, setSelectedWeekKey] = useState<string>(ALL_WEEKS);

  const allOptions = [...mockPredictionHistory].sort(sortByYearWeekDesc);
  const visibleGroups =
    selectedWeekKey === ALL_WEEKS
      ? allOptions
      : allOptions.filter((g) => buildWeekKey(g) === selectedWeekKey);

  const currentWeeks = visibleGroups.filter((g) => g.status === "current");
  const finalizedWeeks = visibleGroups.filter((g) => g.status === "finalized");

  return (
    <Flex direction="column" gap={6} p={6} maxW="5xl" mx="auto">
      <Flex direction="column" gap={1}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          Historial de predicciones
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Consulta de predicciones anteriores — solo lectura
        </Text>
      </Flex>

      <Flex align="center" gap={4} wrap="wrap">
        <FilterCard title="Semana">
          <PillSelect
            value={selectedWeekKey}
            onChange={(e) => setSelectedWeekKey(e.target.value)}
          >
            <option value={ALL_WEEKS}>Todas las semanas</option>
            {allOptions.map((g) => {
              const key = buildWeekKey(g);
              return (
                <option key={key} value={key}>
                  {formatWeekLongLabel(g)}
                </option>
              );
            })}
          </PillSelect>
        </FilterCard>
        <Button label="Filtrar" />
      </Flex>

      {currentWeeks.length > 0 && (
        <Flex direction="column" gap={4}>
          {currentWeeks.map((g) => (
            <PredictionHistoryWeekSection key={buildWeekKey(g)} group={g} />
          ))}
        </Flex>
      )}

      {currentWeeks.length > 0 && finalizedWeeks.length > 0 && (
        <SectionDivider label="Semanas anteriores" />
      )}

      {finalizedWeeks.length > 0 && (
        <Flex direction="column" gap={4}>
          {finalizedWeeks.map((g) => (
            <PredictionHistoryWeekSection key={buildWeekKey(g)} group={g} />
          ))}
        </Flex>
      )}

      {visibleGroups.length === 0 && (
        <Box bg="white" borderRadius="2xl" boxShadow="md" p={8} textAlign="center">
          <Text fontSize="sm" color="gray.500">
            No hay predicciones para mostrar.
          </Text>
        </Box>
      )}
    </Flex>
  );
}
