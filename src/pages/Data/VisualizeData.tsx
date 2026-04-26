import DateFilter from "@/components/ui/DateFilter";
import SalesGraph from "@/components/ui/SalesGraph";
import SalesTable from "@/components/ui/SalesTable";
import { getSalesTableData } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import type { dateFilterData } from "@/types/filtersTypes";
import { useEffect, useState } from "react";

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

    const sendFilters = (data: dateFilterData) => {
        console.log('sending data: ', data)
    }

    if (!table) {
        return <div>Loading...</div>
    }

    return (<>
        <DateFilter onSubmit={sendFilters} ></DateFilter>
        <SalesGraph rows={table.rows} ></SalesGraph>
        <SalesTable rows={table.rows} cols={table.columns} ></SalesTable>
    </>)
}