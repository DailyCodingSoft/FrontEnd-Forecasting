import { useEffect, useState } from "react"
import GoalCard from "@/components/ui/GoalCard"
import StatusSelector from "@/components/ui/StatusSelecter"
import GoalProgressDialog from "@/components/ui/UpdatePorcentegeGoal"
import type { Goal, GoalRequest } from "@/types/goalTypes"
import { getGoalCategories, getGoalsTableData, UpdateGoal } from "@/services/goals"
import Button from "@/components/ui/Button"
import { useNavigate } from "react-router-dom";


export default function GoalDashboard() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState<Goal[]>([])
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string>("active")
    const [open, setOpen] = useState(false)

    useEffect(() => {

        const fetchGoals = async () => {
            try {
                const response = await getGoalsTableData(selectedStatus)
                console.log("Goals", response)
                setGoals(response)
            } catch (error) {
                console.error("Error fetching goals:", error)
            }
        }

        fetchGoals()

    }, [selectedStatus]) // <- aquí

    function handleOpenDialog(goal: Goal) {
        setSelectedGoal(goal)
        setOpen(true)
    }
    async function handleUpdateProgress(data: Goal) {
        console.log("Data received from dialog", data); // 👈 revisar datos recibidos
        const categories: any[] = await getGoalCategories();
        console.log("Categories fetched", categories); // 👈 revisar categorías obtenidas
        const category = categories.find(x => x.name === data.category);
        console.log("Category found", category); // 👈 revisar categoría encontrada
        const dataUpdate: GoalRequest = {
            name: data.name,
            bonus: parseInt(data.bonus.toString().replaceAll(".", "")),
            progress: data.progress,
            categoryCode: category ? category.code : "",
            quantity: parseInt(data.quantity.toString().replaceAll(".", "")),
            statusCode: data.status
        }
        console.log(dataUpdate);
        const response = await UpdateGoal(dataUpdate);
        if (response.status == 200) {
            //mostrar mensaje de confirmacion en el popup.
            navigate('/goals')
        } else {
            //mostrar un error en el popup.
        }
    }

    return (
        <>
            <div>
                <h1>Resumen de Desempeño</h1>
                <p>Revisa tu progreso hacia tus objetivos y descubre cómo puedes mejorar tu desempeño.</p>
                <Button label="Crear Meta" onClick={() => navigate("/create/goal")} />
            </div>
            <div>
                <StatusSelector
                    onSelect={(status) => setSelectedStatus(status[1])}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {goals.map((goal, index) => (
                    <GoalCard
                        key={index}
                        bonus={goal.bonus}
                        categorie={goal.category}
                        name={goal.name}
                        progress={goal.progress}
                        goal={goal}
                        onBonusClick={() => {
                            handleOpenDialog(goal)
                        }}
                    />
                ))}
            </div>
            <GoalProgressDialog
                open={open}
                onClose={() => setOpen(false)}
                goal={selectedGoal as Goal}
                onSubmit={async (data) => {
                    await handleUpdateProgress(data)
                }}
            />
        </>
    )
}