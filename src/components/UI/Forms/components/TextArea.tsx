import React from "react";
import { clsxm } from "@/lib/utils";

export type TextAreaProps = React.ComponentPropsWithRef<"textarea">;

const TextArea = ({ className, rows = 5, ...rest }: TextAreaProps) => {
  return (
    <textarea
      rows={rows}
      className={clsxm("form-control", className)}
      {...rest}
    />
  );
};

TextArea.displayName = "TextArea";

export { TextArea };
