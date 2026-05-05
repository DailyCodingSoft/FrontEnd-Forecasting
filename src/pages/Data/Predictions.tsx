import { getPrediction } from "@/services/predictions"
import { getSalesTableDataByFilters } from "@/services/sales";
import { useState } from "react"
import PredictionInput from "@/components/ui/PredictionInput"
import type { SalesTableResponse, SaleRow } from "@/types/SalesTypes";
import SalesTable from "@/components/ui/SalesTable";
import SalesGraph from "@/components/ui/SalesGraph";
import { format } from 'date-fns';

export default function Predictions() {
    const [table, setTable] = useState<SalesTableResponse | null>(null)
    
    async function fetchTable(identificator: string, prediction: SaleRow) {
        const response = await getSalesTableDataByFilters(null, null, identificator);
        const predict_table = response.rows.concat(prediction)
        setTable({rows: predict_table, columns: response.columns});
    }

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
        fetchTable(product[0], forecast_row)
    }

    if (!table) {
        return (
            <>
                <h1>Predictions</h1>
                <div>Selecciona un producto para ver realizar la prediccion</div>
                <PredictionInput onSubmit={fetchData}/>
            </>
        )
        
    }

    return (<>
        <h1>Predictions</h1>
        <PredictionInput onSubmit={fetchData}/>
        <SalesGraph rows={table.rows} ></SalesGraph>
        <SalesTable rows={table.rows} cols={table.columns} sort_key={table.columns.find((c) => c == 'week')}  sort_dir={"desc"} ></SalesTable>
    </>)
}