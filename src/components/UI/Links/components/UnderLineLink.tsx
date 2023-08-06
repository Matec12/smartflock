import * as React from "react";
import { UnstyledLink, UnstyledLinkProps } from "./UnstyledLink";
import { clsxm } from "@/lib/utils";

const UnderLineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          "animated-underline custom-link inline-flex items-center font-semibold",
          "focus:outline-none focus-visible:rounded ",
          "border-dark border-b border-dotted hover:border-black/0",
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

UnderLineLink.displayName = "UnderLineLink";

export { UnderLineLink };
