import { Card, CardBody, CardTitle } from "@/components/UI/Cards";
import { Paragraph } from "@/components/UI/Typography";
import { Logo } from "@/components/Logo";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Card className="min-h-[450px] w-full max-w-md md:px-4 max-md:shadow-none max-md:dark:bg-transparent md:w-3/4 lg:w-10/12">
      <CardBody className="py-12">
        <div className="text-center w-full mb-5">
          <Logo className="text-base" />
        </div>
        <CardTitle className="mb-4 text-center text-3xl font-semibold">
          Forgot Password?
        </CardTitle>
        <Paragraph className="mb-10 text-center">
          Please input your email below and we will send you a link to create a
          new password.
        </Paragraph>
        <ForgotPasswordForm />
      </CardBody>
    </Card>
  );
};

export default ForgotPassword;
