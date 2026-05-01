import { getPrediction } from "@/services/predictions"
import { useEffect, useState } from "react"
import ProductSelecter from "@/components/ui/ProductSelecter"
export default function Predictions() {
    const [product, setProduct] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPrediction(product)//esto viene del input
            console.log(response)
        }
        fetchData()
    },[]) 

    return (<>
    <h1>my prediction page</h1>
    <ProductSelecter onSelect={(value) => setProduct(value)} />
    <h1>{product}</h1>
    </>)
}