import type { dateFilterData } from "@/types/filtersTypes";

const formatDate = (date: Date) => {
    return date.toISOString().split('.')[0];
};

export function getDateRange(data: dateFilterData): [string | null, string | null] {
    const { year, month, day, week } = data;

    // Si viene semana, getDateRange no aplica
    if (week) return [null, null];

    let from: string | null = null;
    let to: string | null = null;

    // Si hay mes o día pero no año, asumir año actual
    const effectiveYear = year || (month || day ? new Date().getFullYear().toString() : null);

    if (effectiveYear) {
        const y = parseInt(effectiveYear);

        if (month) {
            const m = parseInt(month) - 1;

            if (day) {
                const d = parseInt(day);
                const date = new Date(y, m, d);
                from = formatDate(date);
                to = formatDate(date);
            } else {
                const start = new Date(y, m, 1);
                const end = new Date(y, m + 1, 0);
                from = formatDate(start);
                to = formatDate(end);
            }
        } else {
            const start = new Date(y, 0, 1);
            const end = new Date(y, 11, 31);
            from = formatDate(start);
            to = formatDate(end);
        }
    }

    return [from, to];
}