import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import {
  useCreateCycleMutation,
  useGetBirdTypesQuery,
  useUpdateCycleMutation
} from "@/api/cycle";
import {
  Form,
  FormGroup,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  Button,
  Modal,
  ModalHeader,
  Select,
  ModalFooter
} from "@/components/UI";
import { Cycle } from "@/api/cycle/types";
import { clsxm } from "@/lib/utils";
import { formatLocaleDate } from "@/lib/formatTime";

const CreateUpdateCycleSchema = z.object({
  name: z.string().min(5),
  description: z.string().optional(),
  numberOfBirds: z.number(),
  costOfFeedPerKg: z.number(),
  birdType: z.string(),
  startDate: z.string().min(1),
  endDate: z.string().min(1)
});

interface CreateUpdateCycleProps {
  currentRow?: Cycle;
  isOpen: boolean;
  handleClose: () => void;
}

const CreateUpdateCycle = ({
  currentRow,
  isOpen,
  handleClose
}: CreateUpdateCycleProps) => {
  const { user } = useAuth();
  const { data, isLoading: isBirdLoading } = useGetBirdTypesQuery();
  const {
    mutate: createCycle,
    isLoading: isCreateLoading,
    isSuccess
  } = useCreateCycleMutation();
  const { mutate: updateCycle, isLoading: isUpdateLoading } =
    useUpdateCycleMutation();

  const isLoading = isCreateLoading || isUpdateLoading;

  const birds = data?.payload.birds ? data?.payload.birds : [];

  const birdTypeOptions = birds.map((item) => ({
    label: item.name,
    value: item._id
  }));

  const [selectedValue, setSelectedValue] = useState<SelectOptions>(
    birdTypeOptions[0]
  );

  const form = useForm<z.infer<typeof CreateUpdateCycleSchema>>({
    mode: "all",
    resolver: zodResolver(CreateUpdateCycleSchema),
    defaultValues: {
      name: currentRow?.name || "",
      description: currentRow?.description || "",
      numberOfBirds: currentRow?.numberOfBirds || 0,
      costOfFeedPerKg: currentRow?.costOfFeedPerKg || 0,
      birdType: currentRow?.birdType?._id || "",
      startDate: currentRow ? formatLocaleDate(currentRow?.startDate!) : "",
      endDate: currentRow ? formatLocaleDate(currentRow?.endDate!) : ""
    }
  });

  const onSubmit = (values: z.infer<typeof CreateUpdateCycleSchema>) => {
    currentRow
      ? updateCycle({
          id: currentRow?._id,
          payload: { organization: user?.organizationId!, ...values }
        })
      : createCycle({ organization: user?.organizationId!, ...values });
  };

  const {
    formState: { errors, touchedFields, isDirty, isValid },
    handleSubmit,
    register,
    control,
    setValue
  } = form;

  useEffect(() => {
    if (currentRow) {
      setValue(
        "birdType",
        birdTypeOptions.find((type) => type.value === currentRow.birdType._id)
          ?.value as string
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow, setValue]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      handleClose={handleClose}
      panelClassName="w-[650px] max-w-full"
    >
      <ModalHeader>{currentRow ? "Update Cycle" : "Create Cycle"}</ModalHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-y-scroll px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormGroup>
              <FormField
                control={control}
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Name"
                        autoComplete="off"
                        className={clsxm({
                          "is-invalid": errors.name && touchedFields.name
                        })}
                        {...register("name")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="Description"
                        autoComplete="off"
                        {...register("description")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="numberOfBirds"
                render={({ field: { value, onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>Total Number of Birds</FormLabel>
                    <FormControl>
                      <Input
                        ref={ref}
                        id="numberOfBirds"
                        type="number"
                        placeholder="0"
                        autoComplete="off"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="costOfFeedPerKg"
                render={({ field: { value, onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>Cost of Feed Per Kg</FormLabel>
                    <FormControl>
                      <Input
                        ref={ref}
                        id="costOfFeedPerKg"
                        type="number"
                        placeholder="0"
                        autoComplete="off"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="birdType"
                render={() => (
                  <FormItem>
                    <FormLabel>Bird Type</FormLabel>
                    <FormControl>
                      {currentRow ? (
                        <Input
                          value={
                            birdTypeOptions.find(
                              (type) => type.value === currentRow.birdType._id
                            )?.label as string
                          }
                          disabled
                        />
                      ) : (
                        <Select
                          selected={selectedValue}
                          setSelected={setSelectedValue}
                          options={birdTypeOptions}
                          isLoading={isBirdLoading}
                          disabled={Boolean(currentRow)}
                          className={clsxm({
                            "is-invalid":
                              errors.birdType && touchedFields.birdType
                          })}
                          handleChange={(e) => {
                            setValue("birdType", e?.value);
                          }}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="startDate"
                render={() => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        id="startDate"
                        placeholder="Start Date"
                        type="date"
                        autoComplete="off"
                        className={clsxm({
                          "is-invalid":
                            errors.startDate && touchedFields.startDate
                        })}
                        {...register("startDate")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={control}
                name="endDate"
                render={() => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        id="endDate"
                        placeholder="End Date"
                        type="date"
                        autoComplete="off"
                        className={clsxm({
                          "is-invalid": errors.endDate && touchedFields.endDate
                        })}
                        {...register("endDate")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>

            {/* <FormGroup>
              <Button
                disabled={!(isDirty && isValid)}
                className="w-full text-center"
                type="submit"
                isLoading={isLoading}
              >
                {currentRow ? "Update" : "Create"}
              </Button>
            </FormGroup> */}
          </div>
          <ModalFooter>
            <Button onClick={handleClose} outlined>
              Cancel
            </Button>
            <Button
              disabled={!(isDirty && isValid)}
              className="text-center"
              type="submit"
              isLoading={isLoading}
            >
              {currentRow ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
};

export { CreateUpdateCycle };
