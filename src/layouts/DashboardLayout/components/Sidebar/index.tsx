import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "@/hooks";
import { useCollapseDrawer } from "@/hooks";
import { Logo } from "@/components/Global";
import { Drawer } from "@/components/UI";
import CollapseButton from "./components/CollapseButton";
import SidebarAccount from "./components/SidebarAccount";
import SidebarNavSection from "./components/SidebarNavSection";
import { SidebarConfig } from "./components/SidebarConfig";
import { clsxm } from "@/lib/utils";

interface IDashboardSidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

const DashboardSidebar = ({
  isOpenSidebar,
  onCloseSidebar
}: IDashboardSidebarProps) => {
  const { pathname } = useLocation();
  // const { user } = useAuth();

  const responsiveConfig = useResponsive();

  // const privilegedSidebar = SidebarConfig?.map((section) => ({
  //   ...section,
  //   items: section.items.filter((item) => item.permissions?.includes(accType))
  // })).filter((section) => section.items.length > 0);

  const isDesktop =
    responsiveConfig.lg === true || responsiveConfig.xl === true;

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      <div
        className={clsxm("flex shrink-0 flex-col px-5 pt-6 pb-4", {
          "items-center gap-6": isCollapse
        })}
      >
        <div className="flex items-center justify-between">
          <Logo />

          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </div>

        <SidebarAccount isCollapse={isCollapse} />
      </div>

      <SidebarNavSection
        sidebarConfig={SidebarConfig}
        isCollapse={isCollapse}
      />

      <div className="flex-grow" />
    </div>
  );

  return (
    <div
      className={clsxm(
        "sidebar z-30 lg:shrink-0 lg:transition-width lg:duration-200",
        isCollapse ? "lg:w-[88px]" : "lg:w-[280px]",
        {
          absolute: collapseClick
        }
      )}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          handleClose={onCloseSidebar}
          direction="left"
          className="fixed h-full"
          overlayClassName="fixed"
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <div
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          className={clsxm(
            " min-h-full w-[280px] border-r border-dashed transition-width duration-300",
            { "w-[88px]": isCollapse },
            { "shadow-lg backdrop-blur-[6px]": collapseHover }
          )}
        >
          {renderContent}
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
