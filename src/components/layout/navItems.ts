import type { IconType } from "react-icons";
import {
  LuUpload,
  LuTable,
  LuChartNoAxesCombined,
  LuHistory,
  LuLayoutDashboard,
  LuPlus,
} from "react-icons/lu";

export interface NavItem {
  to: string;
  label: string;
  icon: IconType;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "VENTAS",
    items: [
      { to: "/Uploadfiles", label: "Cargar archivo", icon: LuUpload },
      { to: "/data", label: "Visualizar datos", icon: LuTable },
    ],
  },
  {
    label: "PREDICCIONES",
    items: [
      { to: "/predictions", label: "Predicciones", icon: LuChartNoAxesCombined },
      { to: "/predictions/history", label: "Histórico de predicciones", icon: LuHistory },
    ],
  },
  {
    label: "METAS",
    items: [
      { to: "/goals", label: "Dashboard de metas", icon: LuLayoutDashboard },
      { to: "/create/goal", label: "Crear meta", icon: LuPlus },
    ],
  },
];
