import { matchPath } from "react-router-dom";
import { NavItemProps } from "@/layouts/DashboardLayout/components/Sidebar/components/SidebarConfig";

export const isExternalLink = (path: NavItemProps["path"]): boolean => {
  return path.includes("http");
};

export const getActive = (
  path: NavItemProps["path"],
  pathname: string
): boolean => {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
};
