import { useEffect, useState } from "react";
import { getGoalStatus } from "@/services/goals";
import type {GoalStatus} from "@/types/goalTypes";
import PillSelect from "@/components/ui/PillSelect";
import FilterCard from "@/components/ui/FilterCard";

type Props = {
  onSelect: (status: [string, string]) => void;
};

export default function StatusSelector( { onSelect }: Props ) {
  const [statuses, setStatuses] = useState<GoalStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await getGoalStatus();
      const mapped = response.map((item: any) => ({
        code: item.code,
        name: item.name,
      }));
      setStatuses(mapped);
    };

    fetchStatuses();
  }, []);

   const handleChange = (status: [string, string]) => {
    setSelectedStatus(status[0]);
    onSelect(status); // 👈 aquí “envías” el dato al padre
  };

  return (
    <FilterCard title="Seleccionar Estado">
      <PillSelect
        value={selectedStatus}
        onChange={(e) => handleChange([e.target.value, statuses[e.target.selectedIndex-1].name])}
      >
        <option value="">-- Selecciona --</option>

        {statuses.map((s) => (
          <option key={s.code} value={s.code}>
            {s.name }
          </option>
        ))}
      </PillSelect>
    </FilterCard>
  );
}