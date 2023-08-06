import * as React from "react";
import { UnstyledLink, UnstyledLinkProps } from "./UnstyledLink";
import { clsxm } from "@/lib/utils";

const PrimaryLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          "inline-flex items-center",
          "hover:text-primary-darken-2 font-medium text-primary",
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

PrimaryLink.displayName = "PrimaryLink";

export { PrimaryLink };
