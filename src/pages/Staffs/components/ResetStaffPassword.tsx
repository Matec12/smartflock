import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useResetOrganizationsStaffPasswordsQuery } from "@/api/organization";
import { Button, H5, Modal, Paragraph } from "@/components/UI";
import { User } from "@/api/auth/types";
import { clsxm } from "@/lib/utils";
import { ButtonVariant } from "@/types/types";

interface ResetStaffPasswordProps {
  currentRow: User;
  isOpen: boolean;
  handleClose: () => void;
}

const ResetStaffPassword = ({
  currentRow,
  isOpen,
  handleClose
}: ResetStaffPasswordProps) => {
  console.log({ currentRow });
  const [userInput, setUserInput] = useState<string>("yes");
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
  const {
    mutate: resetPassword,
    isLoading,
    isSuccess
  } = useResetOrganizationsStaffPasswordsQuery();

  const handleConfirmation = () => {
    resetPassword({
      userId: currentRow?._id,
      payload: { email: currentRow?.email }
    });
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
                You are about to reset
                <span className="font-semibold">
                  {currentRow?.username}'s
                </span>{" "}
                password, this action irreversible!
              </Paragraph>
            </div>
          </div>
          <div className="flex justify-center px-[3.75rem] pb-14">
            <Button
              className="mr-2"
              variant={ButtonVariant.Warning}
              isLoading={isLoading}
              onClick={handleConfirmation}
            >
              Yes, Reset password!
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
                {userInput === "yes" ? "Reset Successful!" : "Cancelled"}
              </H5>
              <Paragraph>
                {userInput === "yes"
                  ? "User's password has been reset to default!"
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

export { ResetStaffPassword };
