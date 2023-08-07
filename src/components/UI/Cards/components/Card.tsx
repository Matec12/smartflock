import React from "react";
import { clsxm } from "@/lib/utils";

export interface CardProps extends React.ComponentPropsWithRef<"div"> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm(
          "card relative z-10 mb-0 flex min-w-0 flex-col overflow-hidden break-words rounded-lg bg-white bg-clip-border shadow-custom ring-1 ring-black ring-opacity-5 transition-all",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Card;
