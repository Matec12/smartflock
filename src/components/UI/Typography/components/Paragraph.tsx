import React from "react";
import { clsxm } from "@/lib/utils";

export type ParagraphProps = {
  children: React.ReactNode;
} & React.ComponentProps<"p">;

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <p className={clsxm("text-base leading-6 text-body", className)} {...rest}>
      {children}
    </p>
  );
};

export { Paragraph };
