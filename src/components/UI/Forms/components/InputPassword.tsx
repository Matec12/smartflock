import { ReactNode, forwardRef, useState } from "react";
import { Icon } from "@iconify/react";
import { InputGroup, Input, InputGroupAddon, InputGroupText } from "..";
import { clsxm } from "@/lib/utils";

type InputPasswordProps = {
  show?: boolean;
  hideIcon?: ReactNode;
  showIcon?: ReactNode;
  groupClassName?: string;
  addonClassName?: string;
  merged?: boolean;
} & React.ComponentPropsWithRef<"input">;

const InputPassword = forwardRef<React.ElementRef<"input">, InputPasswordProps>(
  (
    {
      show = false,
      hideIcon,
      showIcon,
      groupClassName,
      addonClassName,
      merged = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(show);

    const renderIcon = () => {
      if (showPassword === false) {
        return showIcon ? (
          showIcon
        ) : (
          <Icon icon="eva:eye-fill" width={24} height={24} />
        );
      } else {
        return hideIcon ? (
          hideIcon
        ) : (
          <Icon icon="eva:eye-off-fill" width={24} height={24} />
        );
      }
    };

    return (
      <InputGroup className={groupClassName} merged={merged}>
        <Input ref={ref} type={showPassword ? "text" : "password"} {...rest} />
        <InputGroupAddon
          onClick={() => setShowPassword(!showPassword)}
          className={clsxm("cursor-pointer", addonClassName)}
          addonType="append"
        >
          <InputGroupText>{renderIcon()}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
