import { useGetCyclesQuery } from "@/api/cycle";
import { Page } from "@/components/Global";
import { BreadCrumbs } from "@/components/UI";
import { CycleTable } from "./components/CycleTable";

const CycleModule = () => {
  const { data, isLoading } = useGetCyclesQuery();
  return (
    <Page title="Cycle">
      <BreadCrumbs breadCrumbTitle="Cycle" breadCrumbActive="Cycle" />
      <section className="mt-5">
        {data?.payload.cycles && (
          <CycleTable isLoading={isLoading} cycles={data?.payload?.cycles} />
        )}
      </section>
    </Page>
  );
};

export default CycleModule;
