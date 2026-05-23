type WeekLike = {
  year: number;
  week: number;
};

export function formatWeekShortLabel(g: WeekLike) {
  return `Semana ${g.week} · ${g.year}`;
}
