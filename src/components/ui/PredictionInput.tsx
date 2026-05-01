import { useState } from "react"
import ProductSelector from "./ProductSelecter"
import Button from "./Button";

export default function PredictionInput(props: { onSubmit: (product: [string, string]) => void }) {
    const [product, setProduct] = useState<([string, string])>(['','']);
    function sendData() {
        props.onSubmit(product)
    }
    return (<>
        <ProductSelector onSelect={(value) => setProduct(value)} />
        <Button label="Crear Prediccion" onClick={sendData} />
    </>)
}