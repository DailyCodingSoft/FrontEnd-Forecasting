type WeekLike = {
  year: number;
  week: number;
  startDate: string;
  endDate: string;
};

export function formatWeekShortLabel(g: Pick<WeekLike, "year" | "week">) {
  return `Semana ${g.week} · ${g.year}`;
}

export function formatWeekLongLabel(g: WeekLike) {
  return `${formatWeekShortLabel(g)} (${g.startDate} al ${g.endDate})`;
}
