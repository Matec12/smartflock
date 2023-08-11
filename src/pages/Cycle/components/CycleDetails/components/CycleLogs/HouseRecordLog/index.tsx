import { useParams } from "react-router-dom";
import { useGetHouseRecordLogsQuery } from "@/api/cycle";
import { HouseRecordLogTable } from "./components/HouseRecordLogTable";
import { Skeleton } from "@/components/UI";

const HouseRecordLog = () => {
  const params = useParams();
  const { id } = params;

  const { data: houseRecordData, isLoading } = useGetHouseRecordLogsQuery(id!);

  const houseRecordLogs = houseRecordData?.payload?.house_record_logs;

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <section>
      <HouseRecordLogTable
        isLoading={isLoading}
        houseRecordLogs={houseRecordLogs!}
      />
    </section>
  );
};

export default HouseRecordLog;
