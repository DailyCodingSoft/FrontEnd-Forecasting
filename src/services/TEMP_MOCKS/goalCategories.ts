//Dejar de utilizar el mock cuando exista el endpoint para obtener categorias.
import type {GoalCategory} from "../../types/goalTypes"

export const goalCategories: GoalCategory[] = [
    {name: "Core", code: "0001"},
    {name: "Premiun", code: "0002"},
]