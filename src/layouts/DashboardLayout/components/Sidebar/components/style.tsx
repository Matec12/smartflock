import type { ElementType, ComponentPropsWithoutRef } from "react";
import { PolymorphicProps } from "@/types/types";
import { Button, H6 } from "@/components/UI";
import { clsxm } from "@/lib/utils";

const defaultElement = Button;

type IListItemStyleProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E> & {
    activeRoot?: boolean;
    activeSub?: boolean;
    subItem?: boolean;
  };

export const ListItemStyle = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  activeRoot,
  activeSub,
  subItem,
  className,
  ...rest
}: IListItemStyleProps<E>) => {
  const Component = as ?? defaultElement;
  return (
    <Component
      className={clsxm(
        "relative z-50 mb-1 h-12 w-full justify-start rounded-none pl-6 pr-3 capitalize text-secondary hover:bg-primary-10",
        { "text-primary": activeRoot },
        { "text-primary": activeSub },
        { "h-10": subItem },
        className
      )}
      {...rest}
    >
      {" "}
      {activeRoot && (
        <div className="sc-jmfXTE btDhvU absolute left-0 z-50 h-6 w-1 min-w-[4px] rounded-r bg-primary"></div>
      )}
      {children}
    </Component>
  );
};

// ----------------------------------------------------------------------

interface IListItemTextStyleProps extends ComponentPropsWithoutRef<"div"> {
  isCollapse?: boolean;
}

export const ListItemTextStyle = ({
  isCollapse,
  children,
  className
}: IListItemTextStyleProps) => {
  return (
    <div
      className={clsxm(
        "my-0 flex-auto flex-grow justify-start whitespace-nowrap text-left transition-width duration-200",
        { hidden: isCollapse },
        className
      )}
    >
      {children}
    </div>
  );
};

// ----------------------------------------------------------------------

interface IListSubheaderStyleProps extends ComponentPropsWithoutRef<"div"> {}

export const ListSubheaderStyle = ({
  children,
  className,
  ...rest
}: IListSubheaderStyleProps) => {
  return (
    <H6
      className={clsxm(
        "pt-6 pl-4 pb-2 md:text-sm font-semibold text-body transition-opacity",
        className
      )}
      {...rest}
    >
      {children}
    </H6>
  );
};

// ----------------------------------------------------------------------

interface IListItemIconStyleProps extends ComponentPropsWithoutRef<"div"> {}

export const ListItemIconStyle = ({
  children,
  className
}: IListItemIconStyleProps) => {
  return (
    <div
      className={clsxm("flex  h-5 w-5 items-center justify-center", className)}
    >
      {children}
    </div>
  );
};
