import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconButton } from "../..";
import { clsxm } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  className?: string;
  panelClassName?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  transitionEnter?: string;
  transitionLeave?: string;
}

const Modal = ({
  open,
  handleClose,
  children,
  className,
  panelClassName,
  fullWidth
}: ModalProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsxm("relative z-50", className)}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsxm(
                  "relative z-40 w-full max-w-md transform overflow-y-visible rounded-lg bg-white text-left align-middle shadow-xl transition-all",
                  { "h-full min-h-screen w-full max-w-full": fullWidth },
                  panelClassName
                )}
              >
                <div className="absolute right-0 -top-12 z-50">
                  <IconButton
                    onClick={handleClose}
                    icon="material-symbols:close-rounded"
                    className="h-8 w-8 bg-white text-primary hover:bg-white"
                  />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
