import { useAuth } from "@/hooks";
import { useGetOrganizationsStaffsQuery } from "@/api/organization";
import { Page } from "@/components/Global";
import { BreadCrumbs } from "@/components/UI";
import { StaffsTable } from "./components/StaffsTable";

const StaffsModule = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetOrganizationsStaffsQuery(user);
  return (
    <Page title="Staffs">
      <BreadCrumbs breadCrumbTitle="Staffs" breadCrumbActive="Staffs" />
      <section className="mt-5">
        {data?.payload?.staffs && (
          <StaffsTable isLoading={isLoading} staffs={data?.payload?.staffs} />
        )}
      </section>
    </Page>
  );
};

export default StaffsModule;
