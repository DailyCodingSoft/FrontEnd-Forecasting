import SalesTable from "@/components/ui/SalesTable";
import { getSalesTableData } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import { useEffect, useState } from "react";

export default function VisualizeData() {
    const [table, setTable]= useState<SalesTableResponse | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSalesTableData();
            console.log(response.data);
            
            setTable(response.data);
        }
        fetchData();
    }, [])

    if (!table) {
        return <div>Loading...</div>
    }

    return(<>
        <SalesTable rows={table.rows} columns={table.columns} ></SalesTable>
    </>)
}