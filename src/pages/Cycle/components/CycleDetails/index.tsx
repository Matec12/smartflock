import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCyclesQuery } from "@/api/cycle";
import { Page } from "@/components/Global";
import { BreadCrumbs } from "@/components/UI";
import { CreateUpdateCycle } from "../CreateUpdateCycle";
import { CycleDetailsCard } from "./components/CycleDetailsCard";
import { CycleStatsCard } from "./components/CycleStatsCard";
import { CycleLogs } from "./components/CycleLogs";

const CycleDetails = () => {
  const params = useParams();
  const { id, tab } = params;
  const { data: cycleData, isLoading } = useGetCyclesQuery({ cycleId: id });
  const cycle = cycleData?.payload?.cycles[0];
  const [openUpdateCycleModal, setOpenUpdateCycleModal] =
    useState<boolean>(false);

  const handleUpdateCycleModal = () => {
    setOpenUpdateCycleModal(!openUpdateCycleModal);
  };

  if (isLoading) {
    return "Loading";
  }

  return (
    <Page title={`Cycles | ${cycle?.name}`}>
      <BreadCrumbs
        breadCrumbTitle={cycle?.name}
        breadCrumbActive={cycle?.name}
        breadCrumbParent="Cycle"
        breadCrumbParentLink="/dashboard/system-data/cycles"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CycleDetailsCard
          cycle={cycle}
          handleUpdateCycleModal={handleUpdateCycleModal}
        />
        <CycleStatsCard cycle={cycle!} />
      </div>
      <div className="mt-10">
        <CycleLogs cycle={cycle!} tab={Number(tab)} />
      </div>
      {openUpdateCycleModal && (
        <CreateUpdateCycle
          currentRow={cycle}
          isOpen={openUpdateCycleModal}
          handleClose={handleUpdateCycleModal}
        />
      )}
    </Page>
  );
};

export default CycleDetails;
