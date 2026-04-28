import DateFilter from "@/components/ui/DateFilter";
import SalesGraph from "@/components/ui/SalesGraph";
import SalesTable from "@/components/ui/SalesTable";
import { getSalesTableData } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import type { dateFilterData } from "@/types/filtersTypes";
import type { Product } from "@/types/products";
import { useEffect, useState } from "react";
import {getRowsForTable} from "@/utils/files/DataFilter";

export default function VisualizeData() {
    const [table, setTable] = useState<SalesTableResponse | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSalesTableData();
            console.log(response.data);

            setTable(response.data);
        }
        fetchData();
    }, [])
const formatDate = (date: Date) => {
    return date.toISOString().split('.')[0];
};

   const sendFilters = async (data: dateFilterData, product: Product | null) => {
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
    const rows = await getRowsForTable(
        from,
        to,
        product ? product.identificator : null
    );

    setTable({
        columns: ['productName', 'identificator', 'quantity', 'week', 'date'],
        rows: rows
    });
};

    if (!table) {
        return <div>Loading...</div>
    }
    return (<>
        <DateFilter onSubmit={sendFilters} ></DateFilter>
        <SalesGraph rows={table.rows} ></SalesGraph>
        <SalesTable rows={table.rows} cols={table.columns} ></SalesTable>
    </>)
}