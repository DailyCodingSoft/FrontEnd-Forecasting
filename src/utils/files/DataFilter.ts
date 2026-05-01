import type { SaleRow } from "@/types/SalesTypes";
import { getSalesTableDataByFilters } from "@/services/sales";


//Las funciones de utils no deberian hacer llamados al back,
//el enfoque correcto es que se pase como parametro la respuesta del back y 
//el metodo de utils retorne el objeto mapeado.
//la llamada al back la hace el componente padre que necesita esa data.
export const getRowsForTable = async (
    from: string | null,
    to: string | null,
    identificator: string | null
): Promise<SaleRow[]> => {
    try {
        const response = await getSalesTableDataByFilters(from, to, identificator);

        // 🔥 1. APLANAR
        const flatRows: SaleRow[] = response.products.flatMap((product: any) =>
            product.sales.map((sale: any) => ({
                productName: product.productName,
                identificator: product.identificator,
                quantity: sale.quantity,
                week: sale.week,
                date: sale.date
            }))
        );

        // 🔥 2. AGRUPAR + SUMAR
        const grouped: SaleRow[] = Object.values(
            flatRows.reduce((acc: Record<string, SaleRow>, item) => {
                const key = `${item.identificator}-${item.week}-${item.date}`;

                if (!acc[key]) {
                    acc[key] = { ...item };
                } else {
                    acc[key].quantity += item.quantity;
                }

                return acc;
            }, {})
        );

        return grouped;

    } catch (error) {
        console.error("Error obteniendo datos:", error);
        return [];
    }
};