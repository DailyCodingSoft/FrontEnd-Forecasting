export interface GoalRequest {
    name: string;
    progress: number;
    categoryCode: string;
    bonus: number;
    statuscode: string;
    quantity: number;
}

export interface Goal {
    name: string;
    progress: number;
    category: string;
    bonus: number;
    status: string;
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
export interface GoalStatus{
    name: string;
    code: string;
}