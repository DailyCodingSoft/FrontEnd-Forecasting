import type { GoalRequest } from "@/types/goalTypes";
import { api } from "./api";

export async function saveGoal(data: GoalRequest) {
  const listToSend: GoalRequest[] = [];
  listToSend[0] = data;
  console.log("Goal send to back", listToSend); // 👈 revisar datos antes de enviar
  const res = await api.post("/goals", listToSend);
  return res;
}

export  async function getGoalStatus():Promise<any> {
    const res = await api.get("/goals/status");
    return res.data;
}

//cambiar cuando exista el endpoint obtener categorias.
export  async function getGoalCategories():Promise<any> {
    const res = await api.get("/goals/categories");
    return res.data;
}

export async function getGoalsTableData(status: string): Promise<any> {
    const res  = await api.get(`/goals/${status}`);  
    return  res.data;
}