import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateOrganizationStaffMutation } from "@/api/organization";
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
  InputPassword,
  FormMessage
} from "@/components/UI";
import { clsxm, passwordValidator } from "@/lib/utils";

const CreateStaffSchema = z.object({
  username: z.string(),
  fullname: z.string(),
  email: z.string().email(),
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
});

interface CreateStaffProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateStaff = ({ isOpen, handleClose }: CreateStaffProps) => {
  const {
    mutate: createStaff,
    isLoading,
    isSuccess
  } = useCreateOrganizationStaffMutation();

  const form = useForm<z.infer<typeof CreateStaffSchema>>({
    mode: "all",
    resolver: zodResolver(CreateStaffSchema)
  });

  const onSubmit = (values: z.infer<typeof CreateStaffSchema>) => {
    createStaff({ ...values });
  };

  const {
    formState: { errors, touchedFields, isDirty, isValid },
    handleSubmit,
    register,
    control
  } = form;

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      handleClose={handleClose}
      panelClassName="w-96 max-w-full"
    >
      <ModalHeader>Create Staff</ModalHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-4 px-6 py-4">
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
                        autoComplete="off"
                        disabled={isLoading}
                        className={clsxm({
                          "is-invalid":
                            errors.username && touchedFields.username
                        })}
                        {...register("username")}
                      />
                    </FormControl>
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
                        autoComplete="off"
                        disabled={isLoading}
                        className={clsxm({
                          "is-invalid":
                            errors.fullname && touchedFields.fullname
                        })}
                        {...register("fullname")}
                      />
                    </FormControl>
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
                        disabled={isLoading}
                        className={clsxm({
                          "is-invalid": errors.email && touchedFields.email
                        })}
                        {...register("email")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormGroup>
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
                          "is-invalid":
                            errors.password && touchedFields.password
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
                            errors.confirmPassword &&
                            touchedFields.confirmPassword
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
              Create
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
};

export { CreateStaff };
