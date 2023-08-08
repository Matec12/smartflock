import { Page } from "@/components/Global/Page";
import { BreadCrumbs, H1, H5 } from "@/components/UI";
import { useAuth } from "@/hooks";
import { isAdmin, isOrganizationAdmin } from "@/api/auth/types";
import StatsHorizontal from "@/components/Widgets/StatsHorizontal";
import {
  useGetOrganizationsQuery,
  useGetOrganizationsStaffsQuery
} from "@/api/organization";
import { useGetUsersQuery } from "@/api/user";
import { useGetCyclesQuery } from "@/api/cycle";

const Overview = () => {
  const { user } = useAuth();
  const { data: orgData, isLoading } = useGetOrganizationsQuery(user);
  const { data: userData } = useGetUsersQuery(user);
  const { data: cycleData } = useGetCyclesQuery();
  const { data: staffData } = useGetOrganizationsStaffsQuery(user);

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
            <div>
              <StatsHorizontal
                icon="ic:twotone-people-alt"
                iconClassName="bg-primary text-primary"
                stats={String(orgData?.payload?.organizations?.length)}
                statTitle="Organizations"
              />
            </div>
            <div>
              <StatsHorizontal
                icon="ic:twotone-people-alt"
                iconClassName="bg-success text-success"
                stats={String(userData?.payload?.users?.length)}
                statTitle="Users"
              />
            </div>
          </>
        )}
        <div>
          <StatsHorizontal
            icon="icon-park-twotone:cycle-one"
            iconClassName="bg-info text-info"
            stats={String(cycleData?.payload?.cycles?.length)}
            statTitle="Cycles"
          />
        </div>
        {isOrganizationAdmin(user!) && (
          <>
            <div>
              <StatsHorizontal
                icon="ic:twotone-people-alt"
                iconClassName="bg-primary text-primary"
                stats={String(staffData?.payload?.staffs?.length)}
                statTitle="Staffs"
              />
            </div>
            <div>
              <StatsHorizontal
                icon="icon-park-twotone:cycle-one"
                iconClassName="bg-success text-success"
                stats={String(activeCycles?.length)}
                statTitle="Active Cycles"
              />
            </div>
            <div>
              <StatsHorizontal
                icon="icon-park-twotone:cycle-one"
                iconClassName="bg-danger text-danger"
                stats={String(archivedCycles?.length)}
                statTitle="Archived Cycles"
              />
            </div>
          </>
        )}
      </div>
    </Page>
  );
};

export default Overview;
