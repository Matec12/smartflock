import React from "react";
import { Icon, IconifyIcon } from "@iconify/react";
import { Button } from "..";
import { clsxm } from "@/lib/utils";

type IconButtonProps = {
  icon?: string | IconifyIcon;
  iconClassName?: string;
} & React.ComponentPropsWithoutRef<"button">;

const IconButton = ({
  icon = "",
  children,
  onClick,
  className,
  iconClassName,
  ...rest
}: IconButtonProps) => {
  return (
    <Button
      className={clsxm(
        "overflow-visible rounded-full border-[#E5E7EA] bg-transparent p-1 text-gray-500 shadow-none hover:bg-transparent hover:shadow-none",
        className
      )}
      flat
      onClick={onClick}
      {...rest}
    >
      {icon ? (
        <Icon
          icon={icon}
          className={clsxm("close-modal h-8 w-8 text-inherit", iconClassName)}
        />
      ) : (
        children
      )}
    </Button>
  );
};
IconButton.displayName = "Label";

export { IconButton };
