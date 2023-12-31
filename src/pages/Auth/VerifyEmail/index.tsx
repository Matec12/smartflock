import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCountdown } from "usehooks-ts";
import { useAuth } from "@/hooks";
import { useResendEmailMutation, useVerifyEmailMutation } from "@/api/auth";
import { Logo } from "@/components/Global";
import {
  Card,
  CardBody,
  CardTitle,
  Paragraph,
  Button,
  Loader
} from "@/components/UI";

const VerifyEmail = () => {
  const { pathname } = useLocation();
  const token = pathname.split("/")[3];
  const { user } = useAuth();
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000
  });
  const { mutate: resend, isLoading, isSuccess } = useResendEmailMutation();
  const { mutate: verify } = useVerifyEmailMutation();

  function handleResendEmail() {
    resend({ email: user?.email as string });
  }

  useEffect(() => {
    if (!token) {
      startCountdown();

      if (isSuccess) {
        resetCountdown();
        startCountdown();
      }
    } else {
      verify(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isSuccess]);

  return (
    <Card className="w-full max-w-md rounded-l-2xl px-4 max-md:shadow-none max-md:dark:bg-transparent md:w-3/4 lg:w-10/12">
      <CardBody className="py-12">
        <div className="text-center w-full mb-5">
          <Logo className="text-base" />
        </div>
        <CardTitle className="mb-4 text-center text-3xl font-semibold">
          Verify Email
        </CardTitle>
        <Paragraph className="mb-10 text-center">
          A verification link has been sent to your email.{" "}
        </Paragraph>
        {!token ? (
          <div className="flex flex-col justify-center items-center w-full h-full max-w-3xl gap-6">
            <Button
              className="max-w-xl w-full font-poppins font-bold hover:shadow-[-0_0_0_0]"
              isLoading={isLoading}
              disabled={count > 0}
              onClick={handleResendEmail}
            >
              Resend Email {count > 0 ? `(${count}s)` : null}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader />
            <p className="text-green-feldgrau font-poppins text-base">
              Verifying...
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default VerifyEmail;
