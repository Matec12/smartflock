import { useContext } from "react";
import { CollapseDrawerContext } from "@/contexts/CollapseDrawerContext";

export const useCollapseDrawer = () => useContext(CollapseDrawerContext);
