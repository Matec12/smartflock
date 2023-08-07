import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/api/auth";
import {
  Form,
  FormGroup,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
  Paragraph,
  PrimaryLink
} from "@/components/UI";
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
        Return to <PrimaryLink href="/auth/login">Login</PrimaryLink>
      </Paragraph>
    </Form>
  );
};

export { ForgotPasswordForm };
