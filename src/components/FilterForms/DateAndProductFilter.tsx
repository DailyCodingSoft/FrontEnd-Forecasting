import { useState } from "react";
import DateFilter from "../ui/DateFilter";
import ProductSelector from "../ui/ProductSelecter";
import Button from "../ui/Button";
import type { dateFilterData } from "@/types/filtersTypes";

const emptyDate: dateFilterData = { year: "", month: "", day: "", week: "" };

export default function DateAndProductFilter(props: {
    onSubmit: (data: dateFilterData, product: [string, string] | null) => void;
    onClear: () => void;
}) {
    const [selectedProduct, setSelectedProduct] = useState<[string, string] | null>(null);
    const [dateData, setDateData] = useState<dateFilterData>(emptyDate);

    function sendData() {
        props.onSubmit(dateData, selectedProduct);
    }

    function clearData() {
        setDateData(emptyDate);
        setSelectedProduct(null);
        props.onClear();
    }

    return (
        <div>
            <DateFilter onSubmit={(data) => setDateData(data)} />
            <ProductSelector onSelect={(value) => setSelectedProduct(value)} />
            <Button label="Filtrar" onClick={sendData} />
            <Button label="Limpiar" onClick={clearData} />
        </div>
    );
}