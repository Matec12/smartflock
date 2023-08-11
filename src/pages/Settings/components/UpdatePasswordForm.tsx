import { useState } from "react";
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
  FormMessage,
  Button,
  Card,
  CardBody,
  InputPassword
} from "@/components/UI";
import { clsxm, passwordValidator } from "@/lib/utils";

const UpdatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8)
    .refine((password) => passwordValidator(password), {
      message:
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
    }),
  newPassword: z
    .string()
    .min(8)
    .refine((password) => passwordValidator(password), {
      message:
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
    })
});

const UpdatePasswordForm = () => {
  const { updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    mode: "all",
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {}
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    setIsLoading(true);
    updatePassword(values)
      .then(() => toast.success("Updated Successfully"))
      .catch(
        (err: RequestError) =>
          err.response && toast.error(err?.response?.data.error)
      )
      .finally(() => setIsLoading(false));
  };

  const {
    formState: { errors, touchedFields, isValid },
    handleSubmit,
    register,
    control
  } = form;

  return (
    <Card>
      <CardBody>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-4">
              <FormGroup>
                <FormField
                  control={control}
                  name="oldPassword"
                  render={() => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          merged
                          placeholder="Password"
                          autoComplete="off"
                          disabled={isLoading}
                          groupClassName={clsxm({
                            "is-invalid":
                              errors.oldPassword && touchedFields.oldPassword
                          })}
                          {...register("oldPassword")}
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
                  name="newPassword"
                  render={() => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          merged
                          placeholder="Confirm Password"
                          autoComplete="off"
                          disabled={isLoading}
                          groupClassName={clsxm({
                            "is-invalid":
                              errors.newPassword && touchedFields.newPassword
                          })}
                          {...register("newPassword")}
                        />
                      </FormControl>
                      <FormMessage id="confirmPassword" />
                    </FormItem>
                  )}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Button
                disabled={!isValid}
                className="w-full text-center"
                type="submit"
                isLoading={isLoading}
              >
                Update
              </Button>
            </FormGroup>
          </form>
        </Form>
      </CardBody>
    </Card>
  );
};

export { UpdatePasswordForm };
