import type { SaleRow } from "@/types/SalesTypes";
import { getSalesTableDataByFilters } from "@/services/sales";
import type { dateFilterData } from "@/types/filtersTypes";


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

const formatDate = (date: Date) => {
        return date.toISOString().split('.')[0];
};

export function getDateRange(data: dateFilterData): [string | null, string | null] {
    const { year, month, day } = data;

    let from: string | null = null;
    let to: string | null = null;

    if (year) {
        const y = parseInt(year);

        if (month) {
            const m = parseInt(month) - 1;

            if (day) {
                const d = parseInt(day);

                const date = new Date(y, m, d);
                from = formatDate(date);
                to = formatDate(date);

            } else {
                const start = new Date(y, m, 1);
                const end = new Date(y, m + 1, 0);

                from = formatDate(start);
                to = formatDate(end);
            }

        } else {
            const start = new Date(y, 0, 1);
            const end = new Date(y, 11, 31);

            from = formatDate(start);
            to = formatDate(end);
        }
    }
    return [from, to]
}