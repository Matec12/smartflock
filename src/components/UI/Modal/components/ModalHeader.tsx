import { ComponentPropsWithoutRef } from "react";
import { H6 } from "../..";
import { clsxm } from "@/lib/utils";

type ModalHeaderProps = ComponentPropsWithoutRef<"div">;

const ModalHeader = ({ children, className }: ModalHeaderProps) => {
  return (
    <div
      className={clsxm(
        "modal-header flex items-center justify-between rounded-t-lg border-b bg-slate-100 px-4 py-2.5",
        className
      )}
    >
      <H6>{children}</H6>
    </div>
  );
};

export default ModalHeader;
