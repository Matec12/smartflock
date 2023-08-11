import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tab } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks";
import { Page } from "@/components/Global";
import { BreadCrumbs } from "@/components/UI";
import { UpdateDetailsForm } from "./components/UpdateDetailsForm";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";
import { UpdateOrgDetailsForm } from "./components/UpdateOrgDetailsForm";
import { clsxm } from "@/lib/utils";
import { isOrganization } from "@/api/auth/types";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [settings] = useState({
    Account: {
      element: <UpdateDetailsForm />,
      icon: "icon-park-twotone:egg-one"
    },
    Password: {
      element: <UpdatePasswordForm />,
      icon: "ph:egg-crack-duotone"
    },
    Organization: {
      element: <UpdateOrgDetailsForm />,
      icon: "icon-park-twotone:chicken-leg"
    }
  });

  const isTabHidden = (setting: any): boolean => {
    return setting[0] === "Organization" && !isOrganization(user!);
  };

  const handleChange = (value: number) => {
    setSelectedIndex(value);
  };

  useEffect(() => {
    if (selectedIndex === 0) {
      navigate(`/dashboard/settings/account`);
    } else if (selectedIndex === 1) {
      navigate(`/dashboard/settings/password`);
    } else {
      navigate(`/dashboard/settings/organization`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <Page title="Cycle">
      <BreadCrumbs breadCrumbTitle="Cycle" breadCrumbActive="Cycle" />
      <Tab.Group selectedIndex={selectedIndex} onChange={handleChange}>
        <Tab.List className="flex justify-center gap-5 w-full mb-16 overflow-x-auto overflow-hidden no-scrollbar">
          {Object.entries(settings).map((setting) => (
            <Tab
              key={setting[0]}
              className={({ selected }) =>
                clsxm(
                  "outline-none w-full md:w-36 py-2.5 text-base font-semibold leading-5 flex items-center justify-center gap-2 transition all ",
                  "text-primary-70 hover:text-primary whitespace-nowrap rounded translate-x-0",
                  {
                    "bg-primary text-white hover:text-white": selected,
                    "transform duration-500 ease-in-out": selected
                  },
                  {
                    hidden: isTabHidden(setting)
                  }
                )
              }
              disabled={isTabHidden(setting)}
            >
              <Icon icon={setting[1]?.icon} />
              {setting[0]}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(settings).map((setting, idx) => (
            <Tab.Panel
              key={idx}
              className={clsxm(
                "mx-auto max-w-md bg-white transform transition-transform duration-300 ease-in-out",
                {
                  "translate-x-0 opacity-100": idx === selectedIndex,
                  "-translate-x-full opacity-0": idx !== selectedIndex
                }
              )}
            >
              {setting.element}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </Page>
  );
};

export default Settings;
