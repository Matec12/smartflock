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
  address: z.string(),
  gasThreshold: z.number(),
  humThreshold: z.number(),
  tempThreshold: z.number()
});

const UpdateOrgDetailsForm = () => {
  const { data: organization, refetch } = useUserGetOrganizationsDetailsQuery();
  const { mutate: updateOrg, isLoading } = useUpdateOrganizationMutation();

  const form = useForm<z.infer<typeof UpdateOrgDetailsSchema>>({
    mode: "all",
    resolver: zodResolver(UpdateOrgDetailsSchema),
    defaultValues: {
      name: organization?.name,
      address: organization?.address,
      gasThreshold: organization?.gasThreshold,
      humThreshold: organization?.humThreshold,
      tempThreshold: organization?.tempThreshold
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateOrgDetailsSchema>) => {
    updateOrg(values, { onSuccess: () => refetch() });
  };

  const {
    formState: { errors, touchedFields, isValid },
    handleSubmit,
    register,
    control,
    setValue
  } = form;

  useEffect(() => {
    if (organization) {
      setValue("name", organization?.name);
      setValue("address", organization?.address);
      setValue("gasThreshold", organization?.gasThreshold);
      setValue("humThreshold", organization?.humThreshold);
      setValue("tempThreshold", organization?.tempThreshold);
    }
  }, [organization, setValue]);

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
              <FormGroup>
                <FormField
                  control={control}
                  name="gasThreshold"
                  render={() => (
                    <FormItem>
                      <FormLabel>Gas Threshold</FormLabel>
                      <FormControl>
                        <Input
                          id="gasThreshold"
                          placeholder="1000"
                          autoComplete="off"
                          disabled={isLoading}
                          className={clsxm({
                            "is-invalid":
                              errors.gasThreshold && touchedFields.gasThreshold
                          })}
                          {...register("gasThreshold", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage id="gasThreshold" />
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="humThreshold"
                  render={() => (
                    <FormItem>
                      <FormLabel>Humidity Threshold</FormLabel>
                      <FormControl>
                        <Input
                          id="humThreshold"
                          placeholder="50"
                          autoComplete="off"
                          disabled={isLoading}
                          className={clsxm({
                            "is-invalid":
                              errors.humThreshold && touchedFields.humThreshold
                          })}
                          {...register("humThreshold", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage id="humThreshold" />
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="tempThreshold"
                  render={() => (
                    <FormItem>
                      <FormLabel>Temperature Threshold</FormLabel>
                      <FormControl>
                        <Input
                          id="tempThreshold"
                          placeholder="45"
                          autoComplete="off"
                          disabled={isLoading}
                          className={clsxm({
                            "is-invalid":
                              errors.tempThreshold &&
                              touchedFields.tempThreshold
                          })}
                          {...register("tempThreshold", {
                            valueAsNumber: true
                          })}
                        />
                      </FormControl>
                      <FormMessage id="tempThreshold" />
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
