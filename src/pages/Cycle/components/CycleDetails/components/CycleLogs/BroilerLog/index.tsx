import { useParams } from "react-router-dom";
import { useGetBroilerLogsQuery } from "@/api/cycle";
import { BroilerLogTable } from "./components/BroilerLogTable";

const BroilerLog = () => {
  const params = useParams();
  const { id } = params;

  const { data: broilerLogData, isLoading } = useGetBroilerLogsQuery(id!);

  const broilerLogs = broilerLogData?.payload?.broiler_logs;
  if (isLoading) {
    return "Loading";
  }

  return (
    <section>
      <BroilerLogTable isLoading={isLoading} broilerLogs={broilerLogs!} />
    </section>
  );
};

export default BroilerLog;
