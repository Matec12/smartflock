import { useParams } from "react-router-dom";
import { useGetDailyAccountLogsQuery } from "@/api/cycle";
import { DailyAccountLogTable } from "./components/DailyAccountLogTable";
import { Skeleton } from "@/components/UI";

const DailyAccountLog = () => {
  const params = useParams();
  const { id } = params;

  const { data: dailyAccountLogData, isLoading } = useGetDailyAccountLogsQuery(
    id!
  );

  const dailyAccountLogs = dailyAccountLogData?.payload?.daily_account_logs;
  console.log({ dailyAccountLogs });

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <section>
      <DailyAccountLogTable
        isLoading={isLoading}
        dailyAccountLogs={dailyAccountLogs!}
      />
    </section>
  );
};

export default DailyAccountLog;
