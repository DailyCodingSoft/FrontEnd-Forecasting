import axios from "axios";
import { api } from "./api";

export async function getSalesTableData():Promise<any> {
    try {
      return await api.get("/sales/");
    } catch (error: unknown){
      if (axios.isAxiosError(error)) {
        throw (error.message);
      }else {
        throw ("unexpected error");
      }
    }
}

export async function insertSalesTableData(data: any[]) {
    console.log("Enviando datos al backend:", data.slice(0, 2)); // 👈 revisar datos antes de enviar
  const res = await api.post("/sales",{
    rows: data
  });
  return res.data;

}

export  async function getProducts(categoryCode?: string):Promise<any> {
    const res = await api.get("/product", {
        params: categoryCode ? { category: categoryCode } : {},
    });
    return res.data;
}

export async function getSalesTableDataByFilters(from: string|null, to: string|null, product: string|null):Promise<any> {
    try {
      const res = await api.post("sales/grouped", {
        identificator: product,
        from: from,
        to: to
      })
      return res.data;
    }catch (error: unknown){
      if (axios.isAxiosError(error)) {
        throw ("axios error");
      }else {
        throw ("unexpected error");
      }
    }
}