import { useEffect, useState } from "react";
import { getGoalCategories, getGoalByName, updateGoal } from "@/services/goals";
import type { GoalCategory, UpdateGoalRequest } from "@/types/goalTypes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner, Center, Text, VStack } from "@chakra-ui/react";
import { formatNumberToCurrency } from "@/utils/helpers";
import GoalForm from "@/components/forms/GoalForm";

export default function EditGoal() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const preLoadGoal = location.state?.goal;

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<GoalCategory[]>([]);
    const [initialName, setInitialName] = useState("");
    const [initialCategory, setInitialCategory] = useState("");
    const [initialBonus, setInitialBonus] = useState("");
    const [initialQuantity, setInitialQuantity] = useState("100");
    const [goalName, setGoalName] = useState("");

    useEffect(() => {
        const init = async () => {
            const result = await getGoalCategories();
            setCategories(result);

            let goal = preLoadGoal;
            if (!goal && params.goalName) {
                goal = await getGoalByName(params.goalName);
            }

            if (goal) {
                setGoalName(goal.name);
                setInitialName(goal.name);
                setInitialQuantity(goal.quantity.toString());
                setInitialBonus(formatNumberToCurrency(goal.bonus.toString()));
                const selected = result.find((c: GoalCategory) => c.name === goal.category);
                setInitialCategory(selected?.code || "");
            }
            setLoading(false);
        };
        init();
    }, []);

    async function handleSubmit(data: { name: string; categoryCode: string; bonus: number; quantity: number }) {
        const request: UpdateGoalRequest = {
            name: goalName,
            newName: data.name,
            progress: 0,
            categoryCode: data.categoryCode,
            quantity: data.quantity,
            bonus: data.bonus,
        };
        await updateGoal(request);
        navigate('/goals');
    }

    if (loading) {
        return (
            <Center h="70vh">
                <VStack gap={4}>
                    <Spinner size="lg" color="brand.400" />
                    <Text>Cargando meta...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <GoalForm
            title="Edición de la Meta"
            categories={categories}
            initialName={initialName}
            initialCategory={initialCategory}
            initialBonus={initialBonus}
            initialQuantity={initialQuantity}
            submitLabel="Actualizar meta"
            onSubmit={handleSubmit}
            onCancel={() => navigate('/goals')}
        />
    );
}
