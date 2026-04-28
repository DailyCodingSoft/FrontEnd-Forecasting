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

export  async function getProducts():Promise<any> {
    const res = await api.get("/product");
    return res.data;
}

export async function getSalesTableDataByFilters(from: string|null, to: string|null, product: string|null):Promise<any> {
    const res = await api.post("sales/grouped", {
      identificator: product,
      from: from,
      to: to
    })
    return res.data;
}