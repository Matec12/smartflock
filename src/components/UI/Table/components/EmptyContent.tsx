import { Paragraph } from "../..";
import { clsxm } from "@/lib/utils";

interface EmptyContentProps {
  title: string;
  description?: string;
  imgClassname: string;
}

const EmptyContent = ({
  title,
  description,
  imgClassname,
  ...other
}: EmptyContentProps) => {
  return (
    <div
      className="flex h-full flex-col items-center justify-center py-32 px-4 text-center"
      {...other}
    >
      <img
        alt="empty content"
        src={
          "https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
        }
        className={clsxm("mb-0.5 h-60", imgClassname)}
      />

      <Paragraph className="mt-6 font-semibold">{title}</Paragraph>

      {description && <Paragraph>{description}</Paragraph>}
    </div>
  );
};

export { EmptyContent };
