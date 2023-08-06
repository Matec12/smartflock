import React from "react";
import { clsxm } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ children, className, ...rest }, ref) => {
  return (
    <label
      ref={ref}
      className={clsxm(
        "label inline-block text-left text-base font-semibold text-headings",
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
