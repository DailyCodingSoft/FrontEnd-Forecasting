import { getPrediction } from "@/services/predictions"
import { useEffect, useState } from "react"
import PredictionInput from "@/components/ui/PredictionInput"
import { getSalesTableData } from "@/services/sales";
import type { SalesTableResponse, SaleRow } from "@/types/SalesTypes";
import SalesTable from "@/components/ui/SalesTable";
import { format } from 'date-fns';

export default function Predictions() {
    const [table, setTable] = useState<SalesTableResponse | null>(null)
    const [original_table, setOriginal_table] = useState<SalesTableResponse | null>(null)
    
        useEffect(() => {
            const fetchData = async () => {
                const response = await getSalesTableData();
                setTable(response.data);
                setOriginal_table(response.data);
            }
            fetchData();
        }, [])

    async function fetchData(product: [string,string]) {
        const response = await getPrediction(product[0])
        const prediction = response.data
        const forecast_row: SaleRow = {
            productName: product[1],//si en algun momento el sku no coincide con el nombre del producto es culpa de esta linea.
            identificator: prediction.product_identifier,
            week: parseInt(prediction.week),
            date: format(Date.now(), "yyyy-dd-MM"),
            quantity: prediction.sales,
            isPrediction: true
        }
        if(table && original_table) {
            const newRows = original_table.rows.concat(forecast_row)
            setTable({rows: newRows, columns: table.columns})
        }
    }

    if (!table) {
        return <div>Loading...</div>
    }

    return (<>
        <h1>Predictions</h1>
        <PredictionInput onSubmit={fetchData}/>
        <SalesTable rows={table.rows} cols={table.columns} sort_key={table.columns.find((c) => c == 'week')}  sort_dir={"desc"} ></SalesTable>
    </>)
}