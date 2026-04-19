import { api } from "./api";

//To Do: usar axios para obtener la data del backend
//por ahora esto es un mock para probrar la tabla.
export async function getSalesTableData():Promise<any> {
    return await api.get("/sales/");
}

export async function insertSalesTableData(data: any[]) {
    console.log("Enviando datos al backend:", data.slice(0, 2)); // 👈 revisar datos antes de enviar
  const res = await api.post("/sales",{
    rows: data
  });
  return res.data;
}