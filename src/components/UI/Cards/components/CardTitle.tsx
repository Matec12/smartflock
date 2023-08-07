import React from "react";
import { clsxm } from "@/lib/utils";
import { H4 } from "../..";

export interface CardTitleProps extends React.ComponentPropsWithRef<"h4"> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <H4
        ref={ref}
        className={clsxm("card-title mb-6 text-xl font-medium", className)}
        {...rest}
      >
        {children}
      </H4>
    );
  }
);

export default CardTitle;
