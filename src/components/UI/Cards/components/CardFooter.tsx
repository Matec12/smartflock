import React from "react";
import { clsxm } from "@/lib/utils";

export interface CardFooterProps extends React.ComponentPropsWithRef<"div"> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm("card-footer border-t p-6", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default CardFooter;
