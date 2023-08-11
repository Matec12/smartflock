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
  Input,
  FormMessage,
  Button,
  Card,
  CardBody
} from "@/components/UI";
import { clsxm } from "@/lib/utils";

const UpdateDetailsSchema = z.object({
  username: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  organizationName: z.string()
});

const UpdateDetailsForm = () => {
  const { updateUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdateDetailsSchema>>({
    mode: "all",
    resolver: zodResolver(UpdateDetailsSchema),
    defaultValues: {
      username: user?.username,
      fullname: user?.fullname,
      email: user?.email,
      organizationName: user?.organizationName
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateDetailsSchema>) => {
    const { username, fullname } = values;
    setIsLoading(true);
    updateUser({ username, fullname })
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
                            "is-invalid":
                              errors.username && touchedFields.username
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
                            "is-invalid":
                              errors.fullname && touchedFields.fullname
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
                          disabled
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
                          disabled
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

export { UpdateDetailsForm };
