import { useParams } from "react-router-dom";
import { useGetBroilerLogsQuery } from "@/api/cycle";
import { Skeleton } from "@/components/UI";
import { StatsHorizontal } from "@/components/Widgets";
import { BroilerLogTable } from "./components/BroilerLogTable";
import { fCurrency, fShortenNumber } from "@/lib/formatNumber";

const BroilerLog = () => {
  const params = useParams();
  const { id } = params;

  const { data: broilerLogData, isLoading } = useGetBroilerLogsQuery(id!);

  const broilerLogs = broilerLogData?.payload?.broiler_logs
    ? broilerLogData?.payload?.broiler_logs
    : [];
  const lastLog = broilerLogs[broilerLogs?.length - 1];

  const cumulativeCostofFeeding = broilerLogs?.reduce(
    (acc, log) => (acc += log?.costOfFeeding),
    0
  );

  const cumulativeCostofLabour = broilerLogs?.reduce(
    (acc, log) => (acc += log?.costOfLabour),
    0
  );

  const cumulativeCostofVaccine = broilerLogs?.reduce(
    (acc, log) => (acc += log?.drugsVaccinationCost),
    0
  );

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <section>
      <div className="my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatsHorizontal
          icon="ph:bowl-food-duotone"
          iconClassName="bg-primary text-primary h-full"
          stats={`${String(fShortenNumber(lastLog?.cumulativeFeedConsumed))}kg`}
          isLoading={isLoading}
          statTitle="Cumulative Feed Consumed"
        />
        <StatsHorizontal
          icon="ph:bowl-food-duotone"
          iconClassName="bg-success text-success"
          stats={`${String(
            fShortenNumber(lastLog?.cumulativeFeedConsumedPerBird)
          )}kg`}
          statTitle="Cumulative Feed Consumed Per Bird"
          isLoading={isLoading}
        />
        <StatsHorizontal
          icon="icon-park-twotone:weightlifting"
          iconClassName="bg-info text-info"
          stats={`${String(
            fShortenNumber(lastLog?.cumulativeAverageWeeklyWeightGainPerBird)
          )}kg`}
          statTitle="Cumulative Average Weekly Weight Gain Per Bird"
          isLoading={isLoading}
        />
        <StatsHorizontal
          icon="solar:tag-price-bold-duotone"
          iconClassName="bg-warning text-warning"
          stats={fCurrency(cumulativeCostofFeeding)}
          statTitle="Cumulative Cost of Feeding"
          isLoading={isLoading}
        />
        <StatsHorizontal
          icon="solar:tag-price-bold-duotone"
          iconClassName="bg-danger text-danger"
          stats={fCurrency(cumulativeCostofVaccine)}
          statTitle="Cumulative Cost of Vaccine"
          isLoading={isLoading}
        />
        <StatsHorizontal
          icon="solar:tag-price-bold-duotone"
          iconClassName="bg-secondary text-secondary"
          stats={fCurrency(cumulativeCostofLabour)}
          statTitle="Cumulative Cost of Labour"
          isLoading={isLoading}
        />
      </div>
      <BroilerLogTable isLoading={isLoading} broilerLogs={broilerLogs!} />
    </section>
  );
};

export default BroilerLog;
