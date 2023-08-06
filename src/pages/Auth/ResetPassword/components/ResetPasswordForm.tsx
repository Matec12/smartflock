import { useLocation } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/api/auth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/UI/Forms";
import { FormGroup, InputPassword } from "@/components/UI/Forms";
import { Button } from "@/components/UI/Buttons";
import { PrimaryLink } from "@/components/UI/Links";
import { Paragraph } from "@/components/UI/Typography";
import { clsxm, passwordValidator } from "@/lib/utils";

const ResetPasswordSchema = z
  .object({
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

const ResetPasswordForm = () => {
  const { pathname } = useLocation();
  const token = pathname.split("/")[3];
  const { mutate: reset, isLoading } = useResetPasswordMutation();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    mode: "all",
    resolver: zodResolver(ResetPasswordSchema)
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    reset({ token, ...values });
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
                        errors.confirmPassword && touchedFields.confirmPassword
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

        <FormGroup>
          <Button
            disabled={!(isDirty && isValid)}
            className="w-full text-center"
            type="submit"
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </FormGroup>
        <Paragraph className="text-center text-sm">
          Remember Password?{" "}
          <PrimaryLink href="/auth/login">Sign in</PrimaryLink>
        </Paragraph>
      </form>
    </Form>
  );
};

export { ResetPasswordForm };
