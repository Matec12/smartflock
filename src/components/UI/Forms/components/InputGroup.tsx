import React from "react";
import { clsxm } from "@/lib/utils";

type InputGroupProps = {
  merged?: boolean;
} & React.ComponentPropsWithRef<"div">;

const InputGroup = React.forwardRef<React.ElementRef<"div">, InputGroupProps>(
  ({ children, className, merged, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm(
          "input-group",
          { "input-group-merge": merged },
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

export { InputGroup };
