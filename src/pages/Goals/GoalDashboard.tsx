import { useEffect, useState } from "react"
import GoalCard from "@/components/ui/GoalCard"
import StatusSelector from "@/components/ui/StatusSelecter"
import type { GoalRequest } from "@/types/goalTypes"
import { getGoalsTableData } from "@/services/goals"
import Button from "@/components/ui/Button"
import { useNavigate } from "react-router-dom";


export default function GoalDashboard() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState<GoalRequest[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string>("active")

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
                        categorie={goal.categoryCode}
                        name={goal.name}
                        progress={goal.progress}
                        goal={goal}
                    />
                ))}
            </div>
        </>
    )
}