import React from "react";
import { clsxm } from "@/lib/utils";

export interface ICardFooterProps extends React.ComponentPropsWithRef<"div"> {}

const CardFooter = React.forwardRef<HTMLDivElement, ICardFooterProps>(
  ({ className, children, ...rest }: ICardFooterProps, ref) => {
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
