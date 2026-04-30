import { api } from './api'

export async function getPrediction(product_identifier: string):Promise<any> {
    return await api.get(`/predictions/${product_identifier}`)
}