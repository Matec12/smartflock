import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tab } from "@headlessui/react";
import { Icon } from "@iconify/react";
import DailyAccountLog from "./DailyAccountLog";
import HouseRecordLog from "./HouseRecordLog";
import BroilerLog from "./BroilerLog";
import { Cycle } from "@/api/cycle/types";
import { clsxm, slugify } from "@/lib/utils";

interface CycleLogsProps {
  tab: number;
  cycle: Cycle;
}

const CycleLogs = ({ tab, cycle }: CycleLogsProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [logs] = useState({
    "Daily Account": {
      element: <DailyAccountLog />,
      icon: "icon-park-twotone:egg-one"
    },
    "House Record": {
      element: <HouseRecordLog />,
      icon: "ph:egg-crack-duotone"
    },
    "Non Layer": {
      element: <BroilerLog />,
      icon: "icon-park-twotone:chicken-leg"
    }
  });

  const isTabDisabled = (logType: any): boolean => {
    return (
      (logType[0] === "Daily Account" && cycle?.birdType?.birdId !== 1) ||
      (logType[0] === "House Record" &&
        cycle?.birdType?.birdId !== 1 &&
        cycle?.birdType?.birdId !== 2 &&
        cycle?.birdType?.birdId !== 5) ||
      (logType[0] === "Non Layer" &&
        cycle?.birdType?.birdId !== 3 &&
        cycle?.birdType?.birdId !== 4 &&
        cycle?.birdType?.birdId !== 6 &&
        cycle?.birdType?.birdId !== 7)
    );
  };

  const handleChange = (value: number) => {
    setSelectedIndex(value);
    navigate(
      `/dashboard/system-data/cycles/${cycle?._id}/${slugify(
        cycle.name
      )}/${value}`
    );
  };

  useEffect(() => {
    if (tab && tab !== selectedIndex) {
      setSelectedIndex(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={handleChange}>
      <Tab.List className="flex justify-center gap-5 w-full mb-16 overflow-x-auto overflow-hidden no-scrollbar">
        {Object.entries(logs).map((logType) => (
          <Tab
            key={logType[0]}
            className={({ selected }) =>
              clsxm(
                "outline-none w-full md:w-36 py-2.5 text-base font-semibold leading-5 flex items-center justify-center gap-2 transition all ",
                "text-primary-70 hover:text-primary whitespace-nowrap rounded translate-x-0",
                {
                  "bg-primary text-white hover:text-white": selected,
                  "transform duration-500 ease-in-out": selected
                },
                {
                  "hover:cursor-not-allowed hover:text-primary-70":
                    isTabDisabled(logType)
                }
              )
            }
            disabled={isTabDisabled(logType)}
          >
            <Icon icon={logType[1]?.icon} />
            {logType[0]}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {Object.values(logs).map((log, idx) => (
          <Tab.Panel
            key={idx}
            className={clsxm(
              "bg-white transform transition-transform duration-300 ease-in-out",
              {
                "translate-x-0 opacity-100": idx === selectedIndex,
                "-translate-x-full opacity-0": idx !== selectedIndex
              }
            )}
          >
            {log.element}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export { CycleLogs };
