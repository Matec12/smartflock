import { Card, CardBody, CardTitle } from "@/components/UI/Cards";
import { Paragraph } from "@/components/UI/Typography";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "./components/RegisterForm";

const Register = () => {
  return (
    <Card className="min-h-[450px] w-full max-w-2xl rounded-l-2xl px-4 max-md:shadow-none max-md:dark:bg-transparent md:w-3/4 lg:w-10/12">
      <CardBody className="py-12">
        <div className="text-center w-full mb-5">
          <Logo className="text-base" />
        </div>
        <CardTitle className="mb-4 text-center text-3xl font-semibold">
          Get Started
        </CardTitle>
        <Paragraph className="mb-10 text-center">
          Please enter your details to create an account
        </Paragraph>
        <RegisterForm />
      </CardBody>
    </Card>
  );
};

export default Register;
