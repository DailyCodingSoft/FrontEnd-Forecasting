import { api } from './api'

export async function getPrediction(product_identifier: string):Promise<any> {
    return await api.get(`/predictions/${product_identifier}`)
}

// TODO: confirm endpoint path, HTTP method, request body and response shape with backend
export async function getSuggestedDiscount(goalName: string): Promise<any> {
    return await api.post(`/discount/suggested`, { goalName })
}