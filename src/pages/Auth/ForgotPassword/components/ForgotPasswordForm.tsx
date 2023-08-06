import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/api/auth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/UI/Forms";
import { FormGroup, Input } from "@/components/UI/Forms";
import { Button } from "@/components/UI/Buttons";
import { PrimaryLink } from "@/components/UI/Links";
import { Paragraph } from "@/components/UI/Typography";
import { clsxm } from "@/lib/utils";

const ForgotPasswordSchema = z.object({
  email: z.string().email()
});

const ForgotPasswordForm = () => {
  const { mutate: forgot, isLoading } = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    mode: "all",
    resolver: zodResolver(ForgotPasswordSchema)
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    forgot(values);
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
          <Button
            disabled={!(isDirty && isValid)}
            className="w-full text-center"
            type="submit"
            isLoading={isLoading}
          >
            Request Link
          </Button>
        </FormGroup>
      </form>
      <Paragraph className="text-center text-sm">
        Return to <PrimaryLink href="/auth/register">Login</PrimaryLink>
      </Paragraph>
    </Form>
  );
};

export { ForgotPasswordForm };
