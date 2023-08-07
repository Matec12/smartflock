import { ComponentProps, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { clsxm } from "@/lib/utils";

type TableSortLabelProps = {
  hideSortIcon?: boolean;
  active?: boolean;
  sortIcon?: ReactNode;
  direction?: "ascending" | "descending";
} & ComponentProps<"div">;

const TableSortLabel = ({
  hideSortIcon,
  active,
  sortIcon,
  direction = "ascending",
  className,
  children,
  ...rest
}: TableSortLabelProps) => {
  const renderIcon = () => {
    return sortIcon ? (
      sortIcon
    ) : (
      <Icon
        icon={
          direction === "ascending" ? "bi:caret-down-fill" : "bi:caret-up-fill"
        }
        width={12}
        height={12}
      />
    );
  };

  return (
    <div
      className={clsxm("cursor-pointer", { "text-primary": active }, className)}
      {...rest}
      aria-hidden="true"
    >
      <span className="flex items-center gap-x-4">
        {children}
        {!hideSortIcon && <>{renderIcon()}</>}
      </span>
    </div>
  );
};

export { TableSortLabel };
