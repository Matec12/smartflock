import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks";
import { Page } from "@/components/Global";
import { BreadCrumbs } from "@/components/UI";
import { UpdateDetailsForm } from "./components/UpdateDetailsForm";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";
import { UpdateOrgDetailsForm } from "./components/UpdateOrgDetailsForm";
import { clsxm, slugify } from "@/lib/utils";
import { isOrganization } from "@/api/auth/types";

const SETTINGS: TabType[] = [
  {
    id: 1,
    icon: "solar:user-id-bold-duotone",
    title: "Account"
  },
  {
    id: 2,
    icon: "solar:password-bold-duotone",
    title: "Password"
  },
  {
    id: 3,
    icon: "ic:twotone-people-alt",
    title: "Organization"
  }
];

const Settings = () => {
  const { tab } = useParams();
  const { user } = useAuth();

  const renderSettings = () => {
    switch (Boolean(tab)) {
      case tab === "account":
        return <UpdateDetailsForm />;
      case tab === "password":
        return <UpdatePasswordForm />;
      case tab === "organization":
        return <UpdateOrgDetailsForm />;
      default:
        return <UpdateDetailsForm />;
    }
  };

  const isTabHidden = (setting: TabType): boolean => {
    return setting.title === "Organization" && !isOrganization(user!);
  };

  return (
    <Page title="Settings">
      <BreadCrumbs breadCrumbTitle="Settings" breadCrumbActive="Settings" />
      <div>
        <div className="flex justify-center gap-5 w-full mb-16 overflow-x-auto overflow-hidden no-scrollbar">
          {SETTINGS.map((setting) => {
            const active = slugify(setting.title)?.includes(tab!);

            return (
              <SettingTab
                key={setting.title}
                item={setting}
                active={active!}
                isTabHidden={isTabHidden}
              />
            );
          })}
        </div>
        <div
          className={clsxm(
            "mx-auto max-w-md bg-white transform transition-transform duration-300 ease-in-out"
          )}
        >
          {renderSettings()}
        </div>
      </div>
    </Page>
  );
};

export default Settings;

interface SettingTabProps {
  item: TabType;
  active: boolean;
  isTabHidden: (e: TabType) => boolean;
}

const SettingTab = ({ item, active, isTabHidden }: SettingTabProps) => {
  return (
    <div
      className={clsxm(
        "outline-none w-full md:w-36 py-2.5 text-base font-semibold leading-5 flex items-center justify-center gap-2 transition all ",
        "text-primary-70 hover:text-primary whitespace-nowrap rounded translate-x-0",
        {
          "bg-primary text-white hover:text-white": active,
          "transform duration-500 ease-in-out": active
        },
        {
          hidden: isTabHidden(item)
        }
      )}
    >
      <Link
        to={`/dashboard/settings/${slugify(item.title)}`}
        className="absolute inset-0"
      />
      <Icon icon={item?.icon} />
      <span className="">{item.title}</span>
    </div>
  );
};
