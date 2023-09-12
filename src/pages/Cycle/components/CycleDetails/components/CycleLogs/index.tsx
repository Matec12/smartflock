import { Icon } from "@iconify/react";
import DailyAccountLog from "./DailyAccountLog";
import HouseRecordLog from "./HouseRecordLog";
import BroilerLog from "./BroilerLog";
import { Cycle } from "@/api/cycle/types";
import { clsxm, slugify } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CycleLogsProps {
  tab: string;
  cycle: Cycle;
}

const CycleLogs = ({ tab, cycle }: CycleLogsProps) => {
  const CYCLE_LOGS: TabType[] = [
    {
      id: 1,
      icon: "icon-park-twotone:egg-one",
      title: "Daily Account"
    },
    {
      id: 2,
      icon: "ph:egg-crack-duotone",
      title: "House Record"
    },
    {
      id: 3,
      icon: "icon-park-twotone:chicken-leg",
      title: "Non Layer"
    }
  ];

  const renderCycleLogs = () => {
    switch (Boolean(tab)) {
      case tab === slugify(CYCLE_LOGS[0].title):
        return <DailyAccountLog />;
      case tab === slugify(CYCLE_LOGS[1].title):
        return <HouseRecordLog />;
      case tab === slugify(CYCLE_LOGS[2].title):
        return <BroilerLog />;
      default:
        return <DailyAccountLog />;
    }
  };

  const isTabDisabled = (logType: TabType): boolean => {
    return (
      (logType.title === "Daily Account" && cycle?.birdType?.birdId !== 1) ||
      (logType.title === "House Record" &&
        cycle?.birdType?.birdId !== 1 &&
        cycle?.birdType?.birdId !== 2 &&
        cycle?.birdType?.birdId !== 5) ||
      (logType.title === "Non Layer" &&
        cycle?.birdType?.birdId !== 3 &&
        cycle?.birdType?.birdId !== 4 &&
        cycle?.birdType?.birdId !== 6 &&
        cycle?.birdType?.birdId !== 7)
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-5 w-full mb-16 overflow-x-auto overflow-hidden no-scrollbar">
        {CYCLE_LOGS.map((setting) => {
          const active = slugify(setting.title)?.includes(tab!);
          return (
            <CycleLogsTab
              key={setting.title}
              item={setting}
              active={active!}
              cycle={cycle}
              isTabDisabled={isTabDisabled}
            />
          );
        })}
      </div>
      <div>
        <div
          className={clsxm(
            "bg-white transform transition-transform duration-300 ease-in-out"
          )}
        >
          {renderCycleLogs()}
        </div>
      </div>
    </div>
  );
};

export { CycleLogs };

interface CycleLogsTabProps {
  item: TabType;
  active: boolean;
  cycle: Cycle;
  isTabDisabled: (e: TabType) => boolean;
}

const CycleLogsTab = ({
  item,
  active,
  cycle,
  isTabDisabled
}: CycleLogsTabProps) => {
  console.log(isTabDisabled(item));
  return (
    <div
      className={clsxm(
        "outline-none w-full md:w-36 py-2.5 text-base font-semibold leading-5 flex items-center justify-center gap-2 transition all cursor-not-allowed",
        "text-primary-70 hover:text-primary whitespace-nowrap rounded translate-x-0",
        {
          "bg-primary text-white hover:text-white": active,
          "transform duration-500 ease-in-out": active
        },
        {
          "cursor-not-allowed pointer-events-none": isTabDisabled(item)
        }
      )}
    >
      <Link
        to={`/dashboard/system-data/cycles/${cycle._id}/${slugify(
          cycle.name
        )}/${slugify(item.title)}`}
        className="absolute inset-0"
      />
      <Icon icon={item?.icon} />
      <span className="">{item.title}</span>
    </div>
  );
};
