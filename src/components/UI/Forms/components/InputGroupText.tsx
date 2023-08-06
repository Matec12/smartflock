import React from "react";
import { clsxm } from "@/lib/utils";

type InputGroupTextProps = React.ComponentPropsWithoutRef<"span">;

const InputGroupText = ({
  children,
  className,
  ...rest
}: InputGroupTextProps) => {
  return (
    <span className={clsxm("input-group-text text-body", className)} {...rest}>
      {children}
    </span>
  );
};

InputGroupText.displayName = "InputGroupText";

export { InputGroupText };
