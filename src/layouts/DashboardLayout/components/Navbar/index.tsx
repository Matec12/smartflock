import { useResponsive, useCollapseDrawer, useOffSetTop } from "@/hooks";
import { IconButton } from "@/components/UI/Buttons";
import { Logo } from "@/components/Global";
import AccountPopover from "./components/AccountPopover";
import { clsxm } from "@/lib/utils";

interface IDashboardNavbarProps {
  onOpenSidebar: () => void;
}

const DashboardNavbar = ({ onOpenSidebar }: IDashboardNavbarProps) => {
  const { isCollapse } = useCollapseDrawer();
  const isOffset = useOffSetTop(92);

  const responsiveConfig = useResponsive();

  const isDesktop =
    responsiveConfig.lg === true || responsiveConfig.xl === true;

  return (
    <header
      className={clsxm(
        "navbar fixed top-0 right-0 left-auto z-40 box-border flex h-16 w-full shrink-0 flex-col border-b border-dashed bg-opacity-80 text-white shadow-none backdrop-blur-[6px] transition-width duration-300 lg:h-20 lg:w-[calc(100%-281px)]",
        { "lg:w-[calc(100%-88px)]": isCollapse },
        { "lg:h-[60px]": isOffset }
      )}
    >
      <div className="relative flex min-h-full items-center px-6 lg:px-10">
        {!isDesktop && (
          <div className="flex items-center">
            <IconButton
              onClick={onOpenSidebar}
              className="mr-2 text-primary"
              icon="eva:menu-2-fill"
            />
            <Logo />
          </div>
        )}

        <div className="flex-grow" />

        <div className="flex items-center sm:p-3">
          <AccountPopover />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
