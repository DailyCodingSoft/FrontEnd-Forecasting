import { useState } from "react";
import DateFilter from "../ui/DateFilter";
import ProductSelector from "../ui/ProductSelecter";
import Button from "../ui/Button";
import type { dateFilterData } from "@/types/filtersTypes";
export default function DateAndProductFilter(props: { onSubmit: (data: dateFilterData, product: [string, string]) => void }) {
    const [selectedProduct, setSelectedProduct] = useState<([string, string])>(['','']);
    const [dateData, setDateData] = useState<dateFilterData>({
        year: "",
        month: "",
        day: "",
        week: ""
    })
    function sendData(){
        props.onSubmit(dateData, selectedProduct);
    }
    return (
        <div>
            <DateFilter onSubmit={(data) => setDateData(data)} />
            <ProductSelector onSelect={(value) => setSelectedProduct(value)} />
            <Button label="Filtrar" onClick={sendData} />
        </div>
    )
}