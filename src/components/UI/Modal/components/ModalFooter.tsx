import { ComponentPropsWithoutRef } from "react";
import { clsxm } from "@/lib/utils";

type ModalFooterProps = ComponentPropsWithoutRef<"div">;

const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={clsxm(
        "modal-footer flex justify-end gap-3 rounded-b-lg border-t bg-slate-100 px-4 py-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
