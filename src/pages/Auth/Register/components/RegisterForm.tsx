import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  InputPassword,
  CustomInput,
  Button,
  Paragraph,
  PrimaryLink
} from "@/components/UI";
import { clsxm, passwordValidator } from "@/lib/utils";

const RegisterSchema = z
  .object({
    username: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    organizationName: z.string(),
    password: z
      .string()
      .min(8)
      .refine((password) => passwordValidator(password), {
        message:
          "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
      }),
    confirmPassword: z
      .string()
      .min(8)
      .refine((password) => passwordValidator(password), {
        message:
          "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  });

const RegisterForm = () => {
  const { register: _register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: "all",
    resolver: zodResolver(RegisterSchema)
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    _register(values)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormGroup>
            <FormField
              control={control}
              name="username"
              render={() => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Username"
                      type="username"
                      autoComplete="off"
                      disabled={isLoading}
                      className={clsxm({
                        "is-invalid": errors.username && touchedFields.username
                      })}
                      {...register("username")}
                    />
                  </FormControl>
                  <FormMessage id="username" />
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup>
            <FormField
              control={control}
              name="fullname"
              render={() => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      id="fullname"
                      placeholder="Fullname"
                      type="fullname"
                      autoComplete="off"
                      disabled={isLoading}
                      className={clsxm({
                        "is-invalid": errors.fullname && touchedFields.fullname
                      })}
                      {...register("fullname")}
                    />
                  </FormControl>
                  <FormMessage id="fullname" />
                </FormItem>
              )}
            />
          </FormGroup>
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
              name="organizationName"
              render={() => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      id="organizationName"
                      placeholder="Organization Name"
                      type="organizationName"
                      autoComplete="off"
                      disabled={isLoading}
                      className={clsxm({
                        "is-invalid":
                          errors.organizationName &&
                          touchedFields.organizationName
                      })}
                      {...register("organizationName")}
                    />
                  </FormControl>
                  <FormMessage id="organizationName" />
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
                  <FormLabel>Password</FormLabel>
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
            <FormField
              control={control}
              name="confirmPassword"
              render={() => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      merged
                      placeholder="Confirm Password"
                      autoComplete="off"
                      disabled={isLoading}
                      groupClassName={clsxm({
                        "is-invalid":
                          errors.confirmPassword &&
                          touchedFields.confirmPassword
                      })}
                      // onChange={(e) => setValue("confirmPassword", e.target.value)}
                      {...register("confirmPassword")}
                    />
                  </FormControl>
                  <FormMessage id="confirmPassword" />
                </FormItem>
              )}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <CustomInput
            type="checkbox"
            className="z-10"
            id="remember-me"
            label="
                I have read, understand and agree to SmartLock’s Privacy Policy and Terms and Conditions"
          />
        </FormGroup>
        <FormGroup>
          <Button
            disabled={!(isDirty && isValid)}
            className="w-full text-center"
            type="submit"
            isLoading={isLoading}
          >
            Register
          </Button>
        </FormGroup>
        <Paragraph className="text-center text-sm">
          Have an account? <PrimaryLink href="/auth/login">Sign in</PrimaryLink>
        </Paragraph>
      </form>
    </Form>
  );
};

export { RegisterForm };
