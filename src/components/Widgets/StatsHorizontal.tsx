import { clsxm } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Card, CardBody, H3, Paragraph, Skeleton } from "../UI";

interface IStatsHorizontalProps {
  icon: string;
  iconClassName: string;
  stats: string;
  statTitle: string;
  className?: string;
  isLoading?: boolean;
}

const StatsHorizontal = ({
  icon,
  iconClassName,
  stats,
  statTitle,
  isLoading,
  className
}: IStatsHorizontalProps) => {
  if (isLoading) {
    return <Skeleton className="h-28" />;
  }

  return (
    <Card>
      <CardBody className={className}>
        <div className="flex items-center justify-between">
          <div>
            <H3 className="mb-0 text-2xl font-bold text-slate-700">{stats}</H3>
            <Paragraph className="card-text">{statTitle}</Paragraph>
          </div>
          <div
            className={clsxm(
              "card-icon rounded-full bg-opacity-20 p-3",
              iconClassName
            )}
          >
            <Icon icon={icon} width={22} height={22} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsHorizontal;
