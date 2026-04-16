import type { SalesTableResponse } from "@/types/SalesTypes";
import { defaultData } from "./TEMP_MOCKS/sales";

//To Do: usar axios para obtener la data del backend
//por ahora esto es un mock para probrar la tabla.
export async function getSalesTableData():Promise<SalesTableResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(defaultData)
        }, 1000)
    })
}