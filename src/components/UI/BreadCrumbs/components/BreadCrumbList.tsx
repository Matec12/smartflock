import { ElementType } from "react";
import { PolymorphicProps } from "@/types/types";
import { clsxm } from "@/lib/utils";

const defaultElement = "ol";

type IBreadCrumbProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E>;

const BreadCrumbList = ({ as, className, children }: IBreadCrumbProps) => {
  const Component = as ?? defaultElement;
  return (
    <nav className="breadcrumb block">
      <Component
        className={clsxm(
          "breadcrumb flex list-none flex-wrap py-1.5 px-4 text-base",
          className
        )}
      >
        {children}
      </Component>
    </nav>
  );
};

export { BreadCrumbList };
