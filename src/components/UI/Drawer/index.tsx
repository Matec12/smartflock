import React, { Fragment } from "react";
import { useUnScrollOnOverlayOpen } from "@/hooks";
import { clsxm } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  handleClose: () => void;
  className?: string;
  overlayClassName?: string;
  children: React.ReactNode;
  direction: "right" | "left";
  hideOverlay?: boolean;
}

const Drawer = ({
  open,
  handleClose,
  children,
  className,
  direction,
  hideOverlay = false,
  overlayClassName,
  ...rest
}: DrawerProps) => {
  useUnScrollOnOverlayOpen(open);

  return (
    <Fragment>
      {!hideOverlay && (
        <div
          className={clsxm(
            {
              "absolute inset-0 z-40 h-full bg-gray-600 bg-opacity-75": open
            },
            overlayClassName
          )}
          onClick={handleClose}
        ></div>
      )}
      <div
        className={clsxm(
          "absolute top-0 bottom-0 z-50 w-0 overflow-y-auto border-dashed bg-white transition-width duration-300",
          { "left-0 border-l": direction === "left" },
          { "right-0 border-r": direction === "right" },
          {
            "w-[280px] transition-width duration-300": open
          },
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </Fragment>
  );
};

Drawer.displayName = "Drawer";

export { Drawer };
