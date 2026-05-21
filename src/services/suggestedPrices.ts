import axios from "axios";
import { api } from "./api";

export async function generateSuggestedDiscounts(goalName: string): Promise<any> {
    try {
        const response = await api.post(
            "/goals/generate-suggested-discounts",
            goalName
        );

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.message;
        } else {
            throw "unexpected error";
        }
    }
}

export async function getSuggestedDiscountsByGoalName(
    goalName: string
): Promise<any> {
    try {
        const response = await api.get(
            `/goals/suggested-discounts/${goalName}`
        );
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.message;
        } else {
            throw "unexpected error";
        }
    }
}