import { useParams } from "react-router-dom";
import { useGetHouseRecordLogsQuery } from "@/api/cycle";
import { HouseRecordLogTable } from "./components/HouseRecordLogTable";

const HouseRecordLog = () => {
  const params = useParams();
  const { id } = params;

  const { data: houseRecordData, isLoading } = useGetHouseRecordLogsQuery(id!);

  const houseRecordLogs = houseRecordData?.payload?.house_record_logs;

  if (isLoading) {
    return "Loading";
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
