import { ElementType } from "react";
import { PolymorphicProps } from "@/types/types";
import { clsxm } from "@/lib/utils";

const defaultElement = "li";

type IBreadCrumbItemProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E> & { active?: boolean };

const BreadCrumbItem = ({ as, children, active }: IBreadCrumbItemProps) => {
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
