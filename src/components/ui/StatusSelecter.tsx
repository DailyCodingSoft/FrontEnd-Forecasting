import { useEffect, useState } from "react";
import { getGoalStatus } from "@/services/goals";
import type {GoalStatus} from "@/types/goalTypes";

type Props = {
  onSelect: (status: [string, string]) => void;
};

export default function StatusSelector( { onSelect }: Props ) {
  const [statuses, setStatuses] = useState<GoalStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const pillSelect = "bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm rounded-full px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition-colors duration-150";

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
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-fit">
      <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
        Seleccionar Estado
      </h2>

      <select
        value={selectedStatus}
        onChange={(e) => handleChange([e.target.value, statuses[e.target.selectedIndex-1].name])}
        className={pillSelect}
      >
        <option value="">-- Selecciona --</option>

        {statuses.map((s) => (
          <option key={s.code} value={s.code}>
            {s.name }
          </option>
        ))}
      </select>
    </div>
  );
}