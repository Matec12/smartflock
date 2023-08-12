import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreateBroilerLogMutation,
  useGetFeedTypesQuery,
  useUpdateBroilerLogMutation
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
  ModalFooter,
  TextArea,
  Select
} from "@/components/UI";
import { BroilerLog } from "@/api/cycle/types";
import { clsxm } from "@/lib/utils";
import { formatLocaleDate } from "@/lib/formatTime";

const CreateUpdateCycleSchema = z.object({
  date: z.string(),
  mortality: z.number(),
  culls: z.number(),
  feedType: z.string(),
  feedConsumed: z.string(),
  weeklyWeightGain: z.string(),
  drugsVaccinationCost: z.number(),
  costOfLabour: z.number(),
  remarks: z.string().optional()
});

interface CreateUpdateBroilerLogProps {
  currentRow?: BroilerLog;
  isOpen: boolean;
  handleClose: () => void;
}

const CreateUpdateBroilerLog = ({
  currentRow,
  isOpen,
  handleClose
}: CreateUpdateBroilerLogProps) => {
  const { id } = useParams();
  const { data, isLoading: isFeedLoading } = useGetFeedTypesQuery();
  const {
    mutate: createBroilerLog,
    isLoading: isCreateLoading,
    isSuccess
  } = useCreateBroilerLogMutation();
  const { mutate: updateBroilerLog, isLoading: isUpdateLoading } =
    useUpdateBroilerLogMutation();

  const isLoading = isCreateLoading || isUpdateLoading;

  const feeds = data?.payload.feeds ? data?.payload.feeds : [];

  const feedTypeOptions = feeds.map((item) => ({
    label: item.name,
    value: item._id
  }));

  const [selectedValue, setSelectedValue] = useState<SelectOptions>(
    feedTypeOptions[0]
  );

  console.log(id);

  const form = useForm<z.infer<typeof CreateUpdateCycleSchema>>({
    mode: "all",
    resolver: zodResolver(CreateUpdateCycleSchema),
    defaultValues: {
      date: currentRow ? formatLocaleDate(currentRow?.date) : "",
      mortality: currentRow ? currentRow.mortality : 0,
      culls: currentRow ? currentRow.culls : 0,
      feedType: currentRow ? currentRow.feedType._id : "",
      feedConsumed: currentRow ? String(currentRow.feedConsumed) : "0",
      weeklyWeightGain: currentRow ? String(currentRow.weeklyWeightGain) : "0",
      drugsVaccinationCost: currentRow ? currentRow.drugsVaccinationCost : 0,
      costOfLabour: currentRow ? currentRow.costOfLabour : 0,
      remarks: currentRow ? currentRow.remarks : ""
    }
  });

  const onSubmit = (values: z.infer<typeof CreateUpdateCycleSchema>) => {
    currentRow
      ? updateBroilerLog({
          id: currentRow?._id,
          payload: { ...values }
        })
      : createBroilerLog({ cycle: id!, payload: { ...values } });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const {
    formState: { errors, touchedFields, isDirty, isValid },
    handleSubmit,
    register,
    control,
    setValue
  } = form;

  return (
    <Modal
      open={isOpen}
      handleClose={handleClose}
      panelClassName="w-[700px] max-w-full"
    >
      <ModalHeader>
        {currentRow ? "Update Non-Layer Log" : "Create Non-Layer Log"}
      </ModalHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormGroup>
                <FormField
                  control={control}
                  name="date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Log Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Log Date"
                          type="date"
                          disabled={Boolean(currentRow)}
                          autoComplete="off"
                          className={clsxm({
                            "is-invalid": errors.date && touchedFields.date
                          })}
                          {...register("date")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="mortality"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Mortality</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Mortality"
                          autoComplete="off"
                          value={value}
                          onChange={(event) =>
                            onChange(Number(event.target.value))
                          }
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid":
                              errors.mortality && touchedFields.mortality
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="culls"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Culls</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Culls"
                          autoComplete="off"
                          value={value}
                          onChange={(event) =>
                            onChange(Number(event.target.value))
                          }
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid": errors.culls && touchedFields.culls
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="feedType"
                  render={() => (
                    <FormItem>
                      <FormLabel>Feed Type</FormLabel>
                      <FormControl>
                        {currentRow ? (
                          <Input
                            value={
                              feedTypeOptions.find(
                                (type) => type.value === currentRow.feedType._id
                              )?.label as string
                            }
                            disabled
                          />
                        ) : (
                          <Select
                            selected={selectedValue}
                            setSelected={setSelectedValue}
                            options={feedTypeOptions}
                            isLoading={isFeedLoading}
                            disabled={Boolean(currentRow)}
                            className={clsxm({
                              "is-invalid":
                                errors.feedType && touchedFields.feedType
                            })}
                            handleChange={(e) => {
                              setValue("feedType", e?.value);
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
                  name="feedConsumed"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Feed Consumed (kg)</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Feed Consumed"
                          autoComplete="off"
                          value={value}
                          onChange={(event) => onChange(event.target.value)}
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid":
                              errors.feedConsumed && touchedFields.feedConsumed
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="weeklyWeightGain"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Weekly Weight Gain (kg)</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Feed"
                          autoComplete="off"
                          value={value}
                          onChange={(event) => onChange(event.target.value)}
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid":
                              errors.weeklyWeightGain &&
                              touchedFields.weeklyWeightGain
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="drugsVaccinationCost"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Vaccination Cost</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Feed"
                          autoComplete="off"
                          value={value}
                          onChange={(event) =>
                            onChange(Number(event.target.value))
                          }
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid":
                              errors.drugsVaccinationCost &&
                              touchedFields.drugsVaccinationCost
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  control={control}
                  name="costOfLabour"
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Cost of Labour</FormLabel>
                      <FormControl>
                        <Input
                          ref={ref}
                          placeholder="Feed"
                          autoComplete="off"
                          value={value}
                          onChange={(event) =>
                            onChange(Number(event.target.value))
                          }
                          onBlur={onBlur}
                          className={clsxm({
                            "is-invalid":
                              errors.costOfLabour && touchedFields.costOfLabour
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <FormField
                control={control}
                name="remarks"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <TextArea
                        placeholder="Remarks"
                        autoComplete="off"
                        className="w-full"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
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

export { CreateUpdateBroilerLog };
