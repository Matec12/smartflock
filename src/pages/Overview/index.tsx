import { Page } from "@/components/Global/Page";
import { BreadCrumbs, H5 } from "@/components/UI";
import { useAuth } from "@/hooks";
import { isAdmin, isOrganization, isOrganizationAdmin } from "@/api/auth/types";
import {
  useGetOrganizationsQuery,
  useGetOrganizationsStaffsQuery
} from "@/api/organization";
import { useGetUsersQuery } from "@/api/user";
import { useGetCyclesQuery } from "@/api/cycle";
import { useGetEnvironmentReadingsQuery } from "@/api/readings";
import { StatsHorizontal } from "@/components/Widgets";
import { TemperatureChart } from "./components/TemperatureChart";
import { HumidityChart } from "./components/HumidityChart";
import { AmmoniaGasChart } from "./components/AmmoniaGasChart";

const Overview = () => {
  const { user } = useAuth();
  const { data: orgData, isLoading } = useGetOrganizationsQuery(user);
  const { data: userData, isLoading: userLoader } = useGetUsersQuery(user);
  const { data: cycleData, isLoading: cycleLoader } = useGetCyclesQuery();
  const { data: staffData, isLoading: staffLoader } =
    useGetOrganizationsStaffsQuery(user);
  const { data: environmentData, isLoading: environmentLoader } =
    useGetEnvironmentReadingsQuery();

  const archivedCycles = cycleData?.payload?.cycles?.filter(
    (cycle) => new Date(cycle.endDate) < new Date()
  );

  const activeCycles = cycleData?.payload?.cycles?.filter(
    (cycle) => new Date(cycle.endDate) > new Date()
  );

  return (
    <Page title="Overview">
      <BreadCrumbs breadCrumbTitle="Overview" />
      <H5>Welcome {user?.username}</H5>
      <div className="my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isAdmin(user!) && (
          <>
            <StatsHorizontal
              icon="ic:twotone-people-alt"
              iconClassName="bg-primary text-primary"
              stats={String(orgData?.payload?.organizations?.length)}
              isLoading={isLoading}
              statTitle="Organizations"
            />

            <StatsHorizontal
              icon="ic:twotone-people-alt"
              iconClassName="bg-success text-success"
              stats={String(userData?.payload?.users?.length || 0)}
              statTitle="Users"
              isLoading={userLoader}
            />
          </>
        )}
        <StatsHorizontal
          icon="icon-park-twotone:cycle-one"
          iconClassName="bg-info text-info"
          stats={String(cycleData?.payload?.cycles?.length)}
          statTitle="Cycles"
          isLoading={cycleLoader}
        />
        {isOrganizationAdmin(user!) && (
          <>
            <StatsHorizontal
              icon="ic:twotone-people-alt"
              iconClassName="bg-primary text-primary"
              stats={String(staffData?.payload?.staffs?.length)}
              statTitle="Staffs"
              isLoading={staffLoader}
            />
          </>
        )}
        {isOrganization(user!) && (
          <>
            <StatsHorizontal
              icon="icon-park-twotone:cycle-one"
              iconClassName="bg-success text-success"
              stats={String(activeCycles?.length)}
              statTitle="Active Cycles"
              isLoading={cycleLoader}
            />
            <StatsHorizontal
              icon="icon-park-twotone:cycle-one"
              iconClassName="bg-danger text-danger"
              stats={String(archivedCycles?.length)}
              statTitle="Archived Cycles"
              isLoading={cycleLoader}
            />
          </>
        )}
        <StatsHorizontal
          icon="ic:twotone-gas-meter"
          iconClassName="bg-primary text-primary"
          stats={String(environmentData?.payload?.data?.slice(-1)[0]?.gasValue)}
          statTitle="Gas Level"
          isLoading={environmentLoader}
        />
        <StatsHorizontal
          icon="material-symbols:humidity-mid"
          iconClassName="bg-primary text-primary"
          stats={String(environmentData?.payload?.data?.slice(-1)[0]?.humValue)}
          statTitle="Humidity"
          isLoading={environmentLoader}
        />
        <StatsHorizontal
          icon="solar:temperature-bold-duotone"
          iconClassName="bg-primary text-primary"
          stats={String(
            environmentData?.payload?.data?.slice(-1)[0]?.tempValue
          )}
          statTitle="Temperature"
          isLoading={environmentLoader}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AmmoniaGasChart />
        <TemperatureChart />
        <HumidityChart />
      </div>
    </Page>
  );
};

export default Overview;
