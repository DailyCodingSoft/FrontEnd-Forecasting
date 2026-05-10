export interface GoalRequest {
    name: string;
    progress: number;
    categoryCode: string;
    bonus: number;
    statusCode: string;
    quantity: number;
}

export interface GoalStatus {
    name: string;
    code: string;
}

export interface GoalCategory {
    name: string;
    code: string;
}
export interface GoalStatus {
    name: string;
    code: string;
}

export type UpdateGoalRequest = {
    name: string;
    newName?: string;
    progress?: number;
    categoryCode?: string;
    quantity?: number;
    bonus?: number;
    statusCode?: string;
};