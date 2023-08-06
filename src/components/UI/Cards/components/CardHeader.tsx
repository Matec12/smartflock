import React from "react";
import { clsxm } from "@/lib/utils";

export interface ICardHeaderProps extends React.ComponentPropsWithRef<"div"> {}

const CardHeader = React.forwardRef<HTMLDivElement, ICardHeaderProps>(
  ({ className, children, ...rest }: ICardHeaderProps, ref) => {
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
