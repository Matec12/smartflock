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
  Button
} from "@/components/UI";
import { GetActivityParams } from "@/api/activity/types";

const FilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string()
});

interface ActivityFiltersProps {
  setAllFilters?: React.Dispatch<React.SetStateAction<GetActivityParams>>;
  setUserFilters?: React.Dispatch<React.SetStateAction<GetActivityParams>>;
}

const ActivityFilters = ({
  setAllFilters,
  setUserFilters
}: ActivityFiltersProps) => {
  const form = useForm<z.infer<typeof FilterSchema>>({
    mode: "all",
    resolver: zodResolver(FilterSchema)
  });

  const onSubmit = (values: z.infer<typeof FilterSchema>) => {
    if (setAllFilters) {
      setAllFilters(values);
    }
    if (setUserFilters) {
      setUserFilters(values);
    }
  };

  const { handleSubmit, register, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 items-end p-6 border-b">
          <FormGroup>
            <FormField
              control={control}
              name="dateFrom"
              render={() => (
                <FormItem>
                  <FormLabel>Date From</FormLabel>
                  <FormControl>
                    <Input
                      id="dateFrom"
                      placeholder="Date From"
                      type="date"
                      autoComplete="off"
                      {...register("dateFrom")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup>
            <FormField
              control={control}
              name="dateTo"
              render={() => (
                <FormItem>
                  <FormLabel>Date To</FormLabel>
                  <FormControl>
                    <Input
                      id="dateTo"
                      placeholder="Date To"
                      type="date"
                      autoComplete="off"
                      {...register("dateTo")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup>
            <Button className="w-full text-center" type="submit">
              Login
            </Button>
          </FormGroup>
        </div>
      </form>
    </Form>
  );
};

export { ActivityFilters };
