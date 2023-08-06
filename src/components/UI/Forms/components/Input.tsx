import React from "react";
import { clsxm } from "@/lib/utils";

const Input = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithRef<"input">
>(({ className, type = "text", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={clsxm("form-control", className)}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };
