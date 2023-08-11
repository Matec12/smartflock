import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  useUpdateOrganizationMutation,
  useUserGetOrganizationsDetailsQuery
} from "@/api/organization";

const UpdateOrgDetailsSchema = z.object({
  name: z.string(),
  address: z.string()
});

const UpdateOrgDetailsForm = () => {
  const { data } = useUserGetOrganizationsDetailsQuery();
  const { mutate: updateOrg, isLoading } = useUpdateOrganizationMutation();
  console.log({ data });
  const form = useForm<z.infer<typeof UpdateOrgDetailsSchema>>({
    mode: "all",
    resolver: zodResolver(UpdateOrgDetailsSchema),
    defaultValues: {
      name: data?.payload?.organization?.name,
      address: data?.payload?.organization?.address
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateOrgDetailsSchema>) => {
    updateOrg(values);
  };

  const {
    formState: { errors, touchedFields, isValid },
    handleSubmit,
    register,
    control,
    setValue
  } = form;

  useEffect(() => {
    if (data) {
      setValue("name", data?.payload?.organization?.name);
      setValue("address", data?.payload?.organization?.address);
    }
  }, [data]);

  return (
    <Card>
      <CardBody>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-4">
              <FormGroup>
                <FormField
                  control={control}
                  name="name"
                  render={() => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Username"
                          autoComplete="off"
                          disabled={isLoading}
                          className={clsxm({
                            "is-invalid": errors.name && touchedFields.name
                          })}
                          {...register("name")}
                        />
                      </FormControl>
                      <FormMessage id="name" />
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="address"
                  render={() => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          id="address"
                          placeholder="Address"
                          autoComplete="off"
                          disabled={isLoading}
                          className={clsxm({
                            "is-invalid":
                              errors.address && touchedFields.address
                          })}
                          {...register("address")}
                        />
                      </FormControl>
                      <FormMessage id="address" />
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

export { UpdateOrgDetailsForm };
