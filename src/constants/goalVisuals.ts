import type { IconType } from "react-icons";
import { LuFactory, LuTruck, LuUsers, LuPiggyBank, LuTarget } from "react-icons/lu";

type CategoryVisual = { icon: IconType; palette: string };
type StatusVisual = { label: string; palette: string };

const categoryVisuals: Record<string, CategoryVisual> = {
  Core: { icon: LuFactory, palette: "success" },
  Premium: { icon: LuTruck, palette: "brand" },
  Legendary: { icon: LuUsers, palette: "info" },
  Cheap: { icon: LuPiggyBank, palette: "teal" },
};

const fallbackCategoryVisual: CategoryVisual = { icon: LuTarget, palette: "gray" };

export const getCategoryVisual = (category: string): CategoryVisual =>
  categoryVisuals[category] ?? fallbackCategoryVisual;

export const statusVisuals: Record<string, StatusVisual> = {
  active: { label: "Activa", palette: "brand" },
  inactive: { label: "Inactiva", palette: "gray" },
  completed: { label: "Completada", palette: "success" },
};

const fallbackStatusVisual: StatusVisual = { label: "Desconocido", palette: "gray" };

export const getStatusVisual = (status: string): StatusVisual =>
  statusVisuals[status] ?? fallbackStatusVisual;
