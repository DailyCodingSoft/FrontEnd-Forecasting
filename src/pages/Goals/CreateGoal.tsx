import { useEffect, useState } from "react";
import { getGoalCategories, saveGoal } from "@/services/goals";
import type { GoalCategory, GoalRequest } from "@/types/goalTypes";
import { useNavigate } from "react-router-dom";
import GoalForm from "@/components/forms/GoalForm";

export default function CreateGoal() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<GoalCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getGoalCategories();
            setCategories(result);
        };
        fetchCategories();
    }, []);

    async function handleSubmit(data: { name: string; categoryCode: string; bonus: number; quantity: number }) {
        const goalRequest: GoalRequest = {
            name: data.name,
            bonus: data.bonus,
            progress: 0,
            categoryCode: data.categoryCode,
            quantity: data.quantity,
            statusCode: "3",
        };
        const response = await saveGoal(goalRequest);
        if (response.status === 200) {
            navigate('/goals');
        }
    }

    return (
        <GoalForm
            title="Creación de una Meta"
            categories={categories}
            submitLabel="Guardar meta"
            onSubmit={handleSubmit}
            onCancel={() => navigate('/goals')}
        />
    );
}
