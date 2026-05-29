import { Flex } from "@chakra-ui/react";
import DateAndProductFilter from "@/components/FilterForms/DateAndProductFilter";
import SalesGraph from "@/components/ui/SalesGraph";
import SalesTable from "@/components/ui/SalesTable";
import StatusCard from "@/components/ui/StatusCard";
import { getSalesTableData, getSalesTableDataByFilters } from "@/services/sales";
import type { SalesTableResponse } from "@/types/SalesTypes";
import type { dateFilterData } from "@/types/filtersTypes";
import { useEffect, useState } from "react";
import { getDateRange } from "@/utils/files/DataFilter";

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
                } else {
                    setLoading(false);
                    setError(String(error))
                }
            }
        }
        fetchData();
    }, [])

    const handleClear = async () => {
        try {
            const r = await getSalesTableData();
            setTable(r.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
    };

    const sendFilters = async (data: dateFilterData, product: [string, string] | null) => {
        if (!data.year && !data.month && !data.day && !data.week && !product) {
            await handleClear();
            return;
        }

        const [from, to] = getDateRange(data);
        try {
            const response = await getSalesTableDataByFilters(
                from,
                to,
                product ? product[0] : null,
                data.week || null,
                data.year || null
            );
            setTable({ rows: response.rows });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
    };
    if (loading) {
        return <StatusCard>Cargando…</StatusCard>
    }

    if (table) {
        return (
            <Flex direction="column" gap={6} p={6}>
                <DateAndProductFilter onSubmit={sendFilters} onClear={handleClear}></DateAndProductFilter>
                <SalesGraph rows={table.rows} ></SalesGraph>
                <SalesTable rows={table.rows} ></SalesTable>
            </Flex>
        )
    } else {
        return <StatusCard>Error obteniendo la informacion del servidor: {error}</StatusCard>
    }
}