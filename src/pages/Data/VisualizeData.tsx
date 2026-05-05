import DateFilter from "@/components/ui/DateFilter";
import SalesGraph from "@/components/ui/SalesGraph";
import SalesTable from "@/components/ui/SalesTable";
import { getSalesTableData, getSalesTableDataByFilters } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import type { dateFilterData } from "@/types/filtersTypes";
import type { Product } from "@/types/products";
import { useEffect, useState } from "react";
import {getDateRange} from "@/utils/files/DataFilter";

export default function VisualizeData() {
    const [table, setTable] = useState<SalesTableResponse | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSalesTableData().then((r) => {
                    setLoading(false);
                    setTable(r.data);
                });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setLoading(false);
                    setError(error.message)
                }else {
                    setLoading(false);
                    setError(String(error))
                }
            }
        }
        fetchData();
    }, [])

    const sendFilters = async (data: dateFilterData, product: Product | null) => {
        const [from, to] = getDateRange(data);
        try {
            const response = await getSalesTableDataByFilters(from, to, product ? product.identificator : null);
            setTable({ columns: response.columns, rows: response.rows});
        }catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            }else {
                setError(String(error))
            }
        }
    };
    if (loading) {
        return (<div>Loading...</div>)
    }

    if (table) {
        return (<>
        <DateFilter onSubmit={sendFilters} ></DateFilter>
        <SalesGraph rows={table.rows} ></SalesGraph>
        <SalesTable rows={table.rows} cols={table.columns} ></SalesTable>
    </>)   
    }else {
        return <div>Error obteniendo la informacion del servidor: {error}</div>
    }
}