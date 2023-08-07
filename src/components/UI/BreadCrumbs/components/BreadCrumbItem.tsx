import { ElementType } from "react";
import { PolymorphicProps } from "@/types/types";
import { clsxm } from "@/lib/utils";

const defaultElement = "li";

type BreadCrumbItemProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E> & { active?: boolean };

const BreadCrumbItem = ({ as, children, active }: BreadCrumbItemProps) => {
  const Component = as ?? defaultElement;

  return (
    <Component
      className={clsxm("breadcrumb-item flex", { "text-body": active })}
    >
      {children}
    </Component>
  );
};

export { BreadCrumbItem };
