import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import {
  Form,
  FormGroup,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  PrimaryLink,
  InputPassword,
  CustomInput,
  Button,
  Paragraph
} from "@/components/UI";
import { clsxm, passwordValidator } from "@/lib/utils";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((password) => passwordValidator(password), {
      message:
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
    })
});

const LoginForm = () => {
  const location = useLocation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: queryParams.get("email")
        ? atob(queryParams.get("email") as string)
        : "",
      password: queryParams.get("password")
        ? atob(queryParams.get("password") as string)
        : ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    login(values)
      .then(() => navigate("/dashboard/overview"))
      .catch(
        (err: RequestError) =>
          err.response && toast.error(err?.response?.data.error)
      )
      .finally(() => setIsLoading(false));
  };

  const {
    formState: { errors, touchedFields, isDirty, isValid },
    handleSubmit,
    register,
    control
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormField
            control={control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="off"
                    disabled={isLoading}
                    className={clsxm({
                      "is-invalid": errors.email && touchedFields.email
                    })}
                    {...register("email")}
                  />
                </FormControl>
                <FormMessage id="email" />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup>
          <FormField
            control={control}
            name="password"
            render={() => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <PrimaryLink href="/auth/forgot-password">
                    <small>Forgot Password?</small>
                  </PrimaryLink>
                </div>
                <FormControl>
                  <InputPassword
                    merged
                    placeholder="Password"
                    autoComplete="off"
                    disabled={isLoading}
                    groupClassName={clsxm({
                      "is-invalid": errors.password && touchedFields.password
                    })}
                    // onChange={(e) => setValue("password", e.target.value)}
                    {...register("password")}
                  />
                </FormControl>
                <FormMessage id="password" />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup>
          <CustomInput
            type="checkbox"
            className="custom-control-Primary"
            id="remember-me"
            label="Remember Me"
          />
        </FormGroup>
        <FormGroup>
          <Button
            disabled={queryParams ? !isValid : !(isDirty && isValid)}
            className="w-full text-center"
            type="submit"
            isLoading={isLoading}
          >
            Login
          </Button>
        </FormGroup>
      </form>
      <Paragraph className="text-center text-sm">
        No account yet?{" "}
        <PrimaryLink href="/auth/register">Register here</PrimaryLink>
      </Paragraph>
    </Form>
  );
};

export { LoginForm };
