import { useState } from "react";
import { useAuth } from "@/hooks";
import { Page } from "@/components/Global/Page";
import { BreadCrumbs, Card } from "@/components/UI";
import ActivityTable from "./components/ActivityTable";
import {
  useGetAllActivitiesQuery,
  useGetCurrentUserActivitiesQuery
} from "@/api/activity";
import { Tab } from "@headlessui/react";
import { ActivityFilters } from "./components/ActivityFilters";
import { clsxm } from "@/lib/utils";
import { User, UserRole } from "@/api/auth/types";
import { GetActivityParams } from "@/api/activity/types";

const ActivityModule = () => {
  const { user } = useAuth();
  const [userFilters, setUserFilters] = useState<GetActivityParams>({});
  const [allFilters, setAllFilters] = useState<GetActivityParams>({});

  const { data: mydata, isLoading: isFetching } =
    useGetCurrentUserActivitiesQuery(userFilters);
  const { data, isLoading } = useGetAllActivitiesQuery(
    user as User,
    allFilters
  );

  const activities = {
    User: (
      <>
        <ActivityFilters setUserFilters={setUserFilters} />
        {mydata?.payload.activities && (
          <ActivityTable
            isLoading={isFetching}
            activities={mydata?.payload?.activities}
          />
        )}
      </>
    ),
    All: (
      <>
        <ActivityFilters setAllFilters={setAllFilters} />
        {data?.payload.activities && (
          <ActivityTable
            isLoading={isLoading}
            activities={data?.payload?.activities}
          />
        )}
      </>
    )
  };

  return (
    <Page title="Activity">
      <BreadCrumbs breadCrumbTitle="Activity" breadCrumbActive="Activity" />
      <Card className="z-10">
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b">
            {Object.keys(activities).map((type) => (
              <Tab
                key={type}
                disabled={
                  type === "All" &&
                  (user?.role as unknown as UserRole) !== UserRole.OrgAdmin
                }
                className={({ selected }) =>
                  clsxm(
                    "w-1/6 py-2.5 text-sm font-semibold leading-5 text-blue-700",
                    selected
                      ? "outline-none border-b border-primary text-primary"
                      : "text-primary-50 hover:bg-white/[0.12] hover:text-primary-70"
                  )
                }
              >
                {type}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            {Object.values(activities).map((table, idx) => (
              <Tab.Panel key={idx} className={clsxm("bg-white")}>
                {table}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Card>
    </Page>
  );
};

export default ActivityModule;
