import React from "react";
import { clsxm } from "@/lib/utils";

type InputGroupAddonProps = {
  addonType: "prepend" | "append";
} & React.ComponentPropsWithRef<"div">;

const InputGroupAddon = React.forwardRef<
  React.ElementRef<"div">,
  InputGroupAddonProps
>(({ children, className, addonType, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={clsxm(
        "text-primary",
        addonType === "prepend" && "input-group-prepend",
        addonType === "append" && "input-group-append",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

InputGroupAddon.displayName = "InputGroupAddon";

export { InputGroupAddon };
