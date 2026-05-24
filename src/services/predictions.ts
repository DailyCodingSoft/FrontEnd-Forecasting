import { api } from './api'
import type {
    PredictionHistoryEntry,
    PredictionHistoryResponse,
    WeekGroup,
} from '@/types/predictionHistoryTypes'
import { getISOWeek } from '@/utils/isoWeek'

export async function getPrediction(product_identifier: string): Promise<any> {
    return await api.get(`/predictions/${product_identifier}`)
}

const WEEK_KEY_PATTERN = /^semana\s+(\d+)\s+del\s+(\d{4})$/i;

function parseWeekKey(key: string): { year: number; week: number } | null {
    const match = key.match(WEEK_KEY_PATTERN);
    if (!match) return null;
    return { week: Number(match[1]), year: Number(match[2]) };
}

function toWeekGroups(
    raw: PredictionHistoryResponse,
    today: { year: number; week: number },
): WeekGroup[] {
    const groups: WeekGroup[] = [];
    for (const [key, predictions] of Object.entries(raw)) {
        const parsed = parseWeekKey(key);
        if (!parsed) continue;
        const isCurrent = parsed.year === today.year && parsed.week === today.week;
        groups.push({
            year: parsed.year,
            week: parsed.week,
            status: isCurrent ? "current" : "finalized",
            predictions: predictions as PredictionHistoryEntry[],
        });
    }
    return groups;
}

export async function getPredictionHistory(): Promise<WeekGroup[]> {
    const res = await api.get<PredictionHistoryResponse>('/predictions/history')
    return toWeekGroups(res.data, getISOWeek())
}
