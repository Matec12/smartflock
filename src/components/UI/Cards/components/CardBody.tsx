import React from "react";
import { clsxm } from "@/lib/utils";

export interface ICardBodyProps extends React.ComponentPropsWithRef<"div"> {}

const CardBody = React.forwardRef<HTMLDivElement, ICardBodyProps>(
  ({ className, children, ...rest }: ICardBodyProps, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm("card-body min-h-[1px] flex-auto p-6", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default CardBody;
