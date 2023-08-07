import React from "react";
import { clsxm } from "@/lib/utils";

export interface CardHeaderProps extends React.ComponentPropsWithRef<"div"> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm("card-header border-b  p-6", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default CardHeader;
