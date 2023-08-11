import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useToggleOrganizationsStaffQuery } from "@/api/organization";
import { Button, H5, Modal, Paragraph } from "@/components/UI";
import { User } from "@/api/auth/types";
import { clsxm } from "@/lib/utils";
import { ButtonVariant } from "@/types/types";

interface ToggleStaffAccessProps {
  currentRow: User;
  isOpen: boolean;
  handleClose: () => void;
}

const ToggleStaffAccess = ({
  currentRow,
  isOpen,
  handleClose
}: ToggleStaffAccessProps) => {
  console.log({ currentRow });
  const [userInput, setUserInput] = useState<string>("yes");
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
  const {
    mutate: toggleAccess,
    isLoading,
    isSuccess
  } = useToggleOrganizationsStaffQuery();

  const handleConfirmation = () => {
    toggleAccess(currentRow?._id);
  };

  const handleCancel = () => {
    setUserInput("cancel");
    setSecondDialogOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setUserInput("yes");
      setSecondDialogOpen(true);
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      handleClose={handleClose}
      panelClassName="w-full max-w-[500px]"
    >
      {!secondDialogOpen ? (
        <>
          <div className="px-[3.75rem] pt-14 pb-8">
            <div className="flex items-center text-center flex-col justify-center">
              <Icon
                icon="tabler:alert-circle"
                fontSize="5.5rem"
                className="mb-8 text-warning"
              />
              <H5 className="text-secondary">Are you sure?</H5>
              <Paragraph>
                You are about to {currentRow?.isActive ? "suspend" : "activate"}{" "}
                <span className="font-semibold">{currentRow?.username}</span>
              </Paragraph>
            </div>
          </div>
          <div className="flex justify-center px-[3.75rem] pb-14">
            <Button
              className="mr-2"
              variant={
                currentRow?.isActive
                  ? ButtonVariant.Danger
                  : ButtonVariant.Success
              }
              isLoading={isLoading}
              onClick={handleConfirmation}
            >
              Yes, {currentRow?.isActive ? "Suspend" : "Activate"} user!
            </Button>
            <Button ghost onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="px-[3.75rem] pt-14 pb-8">
            <div className="flex items-center flex-col">
              <Icon
                fontSize="5.5rem"
                className={clsxm(
                  "mb-8",
                  userInput === "yes" ? "text-success" : "text-danger"
                )}
                icon={
                  userInput === "yes"
                    ? "tabler:circle-check"
                    : "tabler:circle-x"
                }
              />
              <H5 className="mb-8">
                {userInput === "yes"
                  ? currentRow?.isActive
                    ? "Suspended!"
                    : "Activated"
                  : "Cancelled"}
              </H5>
              <Paragraph>
                {userInput === "yes"
                  ? currentRow?.isActive
                    ? "User has been suspended!"
                    : "User has been activated"
                  : "Cancelled Suspension :)"}
              </Paragraph>
            </div>
          </div>
          <div className="flex justify-center px-[3.75rem] pb-14">
            <Button color="success" onClick={handleClose}>
              OK
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export { ToggleStaffAccess };
