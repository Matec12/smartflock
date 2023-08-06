import * as React from "react";
import { UnstyledLink, UnstyledLinkProps } from "./UnstyledLink";
import { clsxm } from "@/lib/utils";
import { ButtonVariant } from "../../Buttons";

type ButtonLinkProps = {
  variant?: keyof typeof ButtonVariant;
  outlined?: boolean;
  flat?: boolean;
  disabled?: boolean;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = "primary",
      onClick,
      disabled,
      outlined = false,
      flat = false,
      ...rest
    },
    ref
  ) => {
    const [rippleStyle, setRippleStyle] = React.useState<{
      top: number;
      left: number;
      diameter: number;
    }>();

    const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      const { clientX, clientY, currentTarget } = event;
      const { left, top, width } = currentTarget.getBoundingClientRect();
      const diameter = Math.max(width, currentTarget.clientHeight);
      const x = clientX - left;
      const y = clientY - top;
      setRippleStyle({ top: y, left: x, diameter });

      if (onClick) {
        onClick(event);
      }
    };

    const handleRippleAnimationEnd = () => {
      setRippleStyle(undefined);
    };
    return (
      <UnstyledLink
        ref={ref}
        onClick={handleButtonClick}
        className={clsxm(
          "relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-base font-medium",
          "gap-x-6 text-center focus:outline-none text-white",
          "shadow-sm",
          "transition delay-150 duration-300 ease-in",
          `hover:shadow-md hover:shadow-${variant}-lighten-5/40`,
          {
            [`bg-${variant}`]: !outlined && !flat,
            "disabled:cursor-not-allowed": disabled,
            "disabled:bg-opacity-60 disabled:text-opacity-50 disabled:hover:bg-opacity-60 disabled:hover:shadow-none":
              disabled,
            "disabled:border-opacity-60 disabled:text-opacity-50 disabled:hover:bg-transparent disabled:hover:bg-opacity-100":
              disabled && flat
          },
          outlined
            ? {
                [`hover:text-${variant}-darken-3 border border-${variant} bg-transparent text-${variant} hover:bg-${variant}-10 hover:shadow-${variant}-darken-5/25 active:bg-${variant}-25`]:
                  true,
                "disabled:border-opacity-60 disabled:bg-transparent disabled:text-opacity-50 disabled:hover:bg-transparent disabled:hover:bg-opacity-0":
                  disabled
              }
            : flat
            ? {
                [`border-0 bg-transparent text-${variant} shadow-none hover:bg-${variant}-20 hover:text-${variant} hover:shadow-none`]:
                  true,
                "disabled:border-opacity-60 disabled:bg-transparent disabled:text-opacity-50 disabled:hover:bg-transparent disabled:hover:bg-opacity-100":
                  disabled
              }
            : {},
          className
        )}
        {...rest}
      >
        {children}
        {rippleStyle && (
          <span
            className="ripple animate-button-ripple"
            style={{
              top: rippleStyle.top - rippleStyle.diameter / 2,
              left: rippleStyle.left - rippleStyle.diameter / 2,
              width: rippleStyle.diameter,
              height: rippleStyle.diameter
            }}
            onAnimationEnd={handleRippleAnimationEnd}
          />
        )}
      </UnstyledLink>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
