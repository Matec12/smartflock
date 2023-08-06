import React from "react";
import { Icon } from "@iconify/react";
import { clsxm } from "@/lib/utils";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Success = "success",
  Info = "info",
  Warning = "warning"
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  outlined?: boolean;
  flat?: boolean;
}

const Button = ({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  variant = ButtonVariant.Primary,
  onClick,
  outlined = false,
  flat = false,
  ...rest
}: ButtonProps) => {
  const [rippleStyle, setRippleStyle] = React.useState<{
    top: number;
    left: number;
    diameter: number;
  }>();

  const disabled = isLoading || buttonDisabled;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const { clientX, clientY, currentTarget } = event;
      const { left, top, width } = currentTarget.getBoundingClientRect();
      const diameter = Math.max(width, currentTarget.clientHeight);
      const x = clientX - left;
      const y = clientY - top;
      setRippleStyle({ top: y, left: x, diameter });
    }
    if (onClick) {
      onClick(event);
    }
  };

  const handleRippleAnimationEnd = () => {
    setRippleStyle(undefined);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsxm(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-base font-medium",
        "gap-x-6 text-center focus:outline-none text-white",
        "shadow-sm",
        "transition delay-150 duration-300 ease-in",
        `hover:shadow-md hover:shadow-${variant}-lighten-5/40`,
        {
          [`bg-${variant}`]: !outlined && !flat,
          "disabled:cursor-not-allowed": disabled,
          "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait":
            isLoading,
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
      onClick={handleButtonClick}
      {...rest}
    >
      {isLoading ? (
        <div
          className={clsxm("text-center text-white", {
            [`text-${variant}-80`]: outlined || flat
          })}
        >
          <Icon className="h-6 w-6 animate-spin" icon="lucide:loader" />
        </div>
      ) : (
        children
      )}

      {rippleStyle && (
        <span
          className="ripple absolute rounded-full bg-[rgba(0,_0,_0,_0.5)] transform -translate-x-1/2 -translate-y-1/2 animate-button-ripple"
          style={{
            top: rippleStyle.top - rippleStyle.diameter / 2,
            left: rippleStyle.left - rippleStyle.diameter / 2,
            width: rippleStyle.diameter,
            height: rippleStyle.diameter
          }}
          onAnimationEnd={handleRippleAnimationEnd}
        />
      )}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
