import { clsxm } from "@/lib/utils";

const Logo = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) => {
  return (
    <span
      className={clsxm(
        "text-primary leading-normal font-extrabold font-Lato text-xs [font-size:--logo-text-size] text-center",
        className
      )}
      {...rest}
    >
      SMARTFLOCK
    </span>
  );
};

export { Logo };
