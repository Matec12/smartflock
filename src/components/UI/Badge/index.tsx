import React from "react";
import { clsxm } from "@/lib/utils";
import { BadgeVariant, BadgeColor } from "@/types/types";

interface BadgeProps extends React.ComponentPropsWithRef<"span"> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  borderRadius?: string;
}

const Badge = ({
  variant = BadgeVariant.Ghost,
  color = BadgeColor.Primary,
  borderRadius = "rounded-full",
  className,
  children
}: BadgeProps) => {
  const variantClasses = {
    [BadgeVariant.Ghost]: {
      [BadgeColor.Primary]: "bg-primary-20 text-primary",
      [BadgeColor.Secondary]: "bg-secondary-20 text-secondary",
      [BadgeColor.Success]: "bg-success-20 text-success",
      [BadgeColor.Danger]: "bg-danger-20 text-danger",
      [BadgeColor.Info]: "bg-info-20 text-info",
      [BadgeColor.Warning]: "bg-warning-20 text-warning"
    },
    [BadgeVariant.Outlined]: {
      [BadgeColor.Primary]:
        "border border-primary-50 bg-primary-20 text-primary",
      [BadgeColor.Secondary]:
        "border border-secondary-50 bg-secondary-20 text-secondary",
      [BadgeColor.Success]:
        "border border-success-50 bg-success-20 text-success",
      [BadgeColor.Danger]: "border border-danger-50 bg-danger-20 text-danger",
      [BadgeColor.Info]: "border border-info-50 bg-info-20 text-info",
      [BadgeColor.Warning]:
        "border border-warning-50 bg-warning-20 text-warning"
    },
    [BadgeVariant.Filled]: {
      [BadgeColor.Primary]: "bg-primary text-white",
      [BadgeColor.Secondary]: "bg-secondary text-white",
      [BadgeColor.Success]: "bg-success text-white",
      [BadgeColor.Danger]: "bg-danger text-white",
      [BadgeColor.Info]: "bg-info text-white",
      [BadgeColor.Warning]: "bg-warning text-white"
    }
  };

  return (
    <span
      className={clsxm(
        borderRadius,
        "px-3 py-1 text-xs font-medium",
        [variantClasses[variant][color]],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
