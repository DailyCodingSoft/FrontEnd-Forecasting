import SalesTable from "@/components/ui/SalesTable";
import { getSalesTableData } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import { useEffect, useState } from "react";

export default function VisualizeData() {
    const [response, setResponse]= useState<SalesTableResponse | null>(null)

    useEffect(() => {
        getSalesTableData().then(setResponse);
    }, [])

    if (!response) {
        return <div>Loading...</div>
    }

    return(<>
        <SalesTable data={response.rows} columns={response.columns} ></SalesTable>
    </>)
}