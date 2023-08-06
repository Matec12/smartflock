import React, { ReactNode } from "react";
import { clsxm } from "@/lib/utils";

export type CustomInputProps = {
  label?: ReactNode;
  inline?: boolean;
  labelClassName?: string;
} & React.ComponentPropsWithRef<"input">;

const CustomInput = React.forwardRef<
  React.ElementRef<"input">,
  CustomInputProps
>(
  (
    {
      label,
      className,
      type = "text",
      inline,
      id,
      value,
      labelClassName,
      ...rest
    }: CustomInputProps,
    ref
  ) => {
    return (
      <div
        className={clsxm(
          `custom-${type}`,
          { "custom-control": type !== "file" },
          {
            "custom-control-inline": inline
          },
          className
        )}
      >
        <input
          ref={ref}
          type={type}
          className={clsxm(
            type === "file" ? "custom-file-input" : "custom-control-input"
          )}
          id={id}
          {...rest}
        />
        {label && (
          <label
            className={clsxm(
              type === "file"
                ? "custom-file-label"
                : "custom-control-label static text-sm font-normal",
              labelClassName
            )}
            htmlFor={id}
          >
            {value ? value : label}
          </label>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
