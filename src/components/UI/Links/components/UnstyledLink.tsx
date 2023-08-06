import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { clsxm } from "@/lib/utils";

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  linkProps?: Omit<LinkProps, "to">;
} & React.ComponentPropsWithRef<"a">;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, linkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith("/") && !href.startsWith("#");

    if (!isNewTab) {
      return (
        <Link
          ref={ref}
          to={href}
          {...linkProps}
          className={className}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        to={href}
        {...rest}
        className={clsxm("cursor-newtab", className)}
      >
        {children}
      </Link>
    );
  }
);

UnstyledLink.displayName = "UnstyledLink";

export { UnstyledLink };
