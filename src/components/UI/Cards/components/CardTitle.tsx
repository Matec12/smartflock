import React from "react";
import { H4 } from "../../Typography";
import { clsxm } from "@/lib/utils";

export interface ICardTitleProps extends React.ComponentPropsWithRef<"h4"> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, ICardTitleProps>(
  ({ className, children, ...rest }: ICardTitleProps, ref) => {
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
