import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useCollapseDrawer } from "@/hooks";
import DashboardNavbar from "./components/Navbar";
import DashboardSidebar from "./components/Sidebar";
import { clsxm } from "@/lib/utils";

const DashboardLayout = () => {
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-layout lg:flex lg:min-h-full">
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <div
        className={clsxm(
          "z-[24] min-h-full flex-grow overflow-auto  px-8 pt-[88px] pb-20 transition-all duration-500 lg:px-12 lg:pt-32",
          { "ml-[102px]": collapseClick }
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
