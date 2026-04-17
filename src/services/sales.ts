import { api } from "./api";

//To Do: usar axios para obtener la data del backend
//por ahora esto es un mock para probrar la tabla.
export async function getSalesTableData():Promise<any> {
    return await api.get("/sales/");
}