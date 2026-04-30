import { getPrediction } from "@/services/predictions"
import { useEffect } from "react"

export default function Predictions() {
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPrediction("001")//esto viene del input
            console.log(response)
        }
        fetchData()
    },[]) 

    return (<>
    <h1>my prediction page</h1>
    </>)
}