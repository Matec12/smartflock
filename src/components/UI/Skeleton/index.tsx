import { clsxm } from "@/lib/utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsxm("animate-pulse rounded-md bg-gray-100", className)}
      {...props}
    />
  );
};

export { Skeleton };
