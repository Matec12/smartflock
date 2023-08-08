import { clsxm } from "@/lib/utils";

export type SmallProps = {
  children: React.ReactNode;
} & React.ComponentProps<"small">;
const Small: React.FC<SmallProps> = ({ children, className, ...rest }) => {
  return (
    <small
      className={clsxm("font-base text-xs leading-none text-body", className)}
      {...rest}
    >
      {children}
    </small>
  );
};

export default Small;
