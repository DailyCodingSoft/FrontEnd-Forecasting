import type { Goal, GoalRequest, UpdateGoalRequest } from "@/types/goalTypes";
import { api } from "./api";

export async function saveGoal(data: GoalRequest) {
    const listToSend: GoalRequest[] = [];
    listToSend[0] = data;
    console.log("Goal send to back", listToSend); // 👈 revisar datos antes de enviar
    const res = await api.post("/goals", listToSend);
    return res;
}

export async function getGoalStatus(): Promise<any> {
    const res = await api.get("/goals/status");
    return res.data;
}

//cambiar cuando exista el endpoint obtener categorias.
export async function getGoalCategories(): Promise<any> {
    const res = await api.get("/goals/categories");
    return res.data;
}

export async function getGoalsTableData(status: string): Promise<any> {
    const res = await api.get(`/goals/${status}`);
    return res.data;
}

export async function getAllGoals(): Promise<Goal[]> {
    const statuses = ["active", "inactive", "completed"];
    const results = await Promise.all(statuses.map((s) => getGoalsTableData(s)));
    return results.flat();
}

export async function UpdateGoal(data: GoalRequest) {
    const res = await api.put("/Goals/update", data);
    return res;
}

export async function getGoalByName(name: string): Promise<any> {
    const res = await api.get(`/goals/byName/${name}`);
    return res.data;
}

export async function updateGoal(data: UpdateGoalRequest) {
    try {
        const response = await api.put("/goals/update", data);
        return response.data;
    } catch (error: any) {

        const message =
            error.response?.data ||
            error.response?.data?.message ||
            "Error inesperado";

        throw new Error(message);
    }
}

export async function generateSuggestedDiscounts(goalName: string): Promise<any> {
    return await api.post(`/goals/generate-suggested-discounts`, goalName, {
        headers: { "Content-Type": "application/json" },
    });
}
