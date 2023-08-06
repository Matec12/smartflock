import { clsxm } from "@/lib/utils";

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={clsxm("form-group", className)}>{children}</div>;
};

FormGroup.displayName = "FormGroup";

export { FormGroup };
