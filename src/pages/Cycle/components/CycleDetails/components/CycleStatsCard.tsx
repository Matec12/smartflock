import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Card, CardBody, Paragraph, Badge, Button, H5 } from "@/components/UI";
import { BadgeColor, BadgeVariant } from "@/types/types";
import { clsxm } from "@/lib/utils";
import { Cycle } from "@/api/cycle/types";

const MENU_ARRAY = [
  {
    title: "Daily Account",
    action: () => {}
  },
  {
    title: "House Record",
    action: () => {}
  },
  {
    title: "Non Layer",
    action: () => {}
  }
];

interface CycleStatsCardProps {
  cycle: Cycle;
}

const CycleStatsCard = ({ cycle }: CycleStatsCardProps) => {
  const isMenuDisabled = (menuType: (typeof MENU_ARRAY)[0]): boolean => {
    return (
      (menuType.title === "Daily Account" && cycle.birdType.birdId !== 1) ||
      (menuType.title === "House Record" &&
        cycle.birdType.birdId !== 1 &&
        cycle.birdType.birdId !== 2 &&
        cycle.birdType.birdId !== 5) ||
      (menuType.title === "Non Layer" &&
        cycle.birdType.birdId !== 3 &&
        cycle.birdType.birdId !== 4 &&
        cycle.birdType.birdId !== 6 &&
        cycle.birdType.birdId !== 7)
    );
  };

  return (
    <Card className="z-30 my-5 overflow-visible">
      <CardBody className="flex flex-col justify-between">
        <div className="flex w-full">
          <Paragraph className="text-slate-600 w-2/5">Logs Stats</Paragraph>
          <div className="flex gap-5 w-3/5 justify-end items-center">
            <Menu as="div" className="relative">
              <Menu.Button as={Button} outlined className="flex gap-2">
                <Icon icon="icon-park-twotone:log" width={20} />
                <span className="align-middle">Create Log</span>
              </Menu.Button>
              <Menu.Items
                as="ul"
                className="absolute right-1 z-10 mt-2 w-[95%] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {MENU_ARRAY.map((menu) => (
                  <Menu.Item disabled={isMenuDisabled(menu)}>
                    {({ active }) => (
                      <li
                        className={clsxm(
                          { "bg-gray-100": active },
                          "block cursor-pointer px-4 py-2 text-sm text-body",
                          {
                            "bg-slate-50 text-gray-400 cursor-not-allowed":
                              isMenuDisabled(menu)
                          }
                        )}
                        onClick={menu.action}
                      >
                        <Icon icon="" width={15} />
                        <span className="ml-50 align-middle">{menu.title}</span>
                      </li>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-12">
          <CycleStats
            icon="icon-park-twotone:egg-one"
            title="Daily Accounts"
            stats={"4"}
            color={BadgeColor.Primary}
          />
          <CycleStats
            icon="ph:egg-crack-duotone"
            title="House Record"
            stats={"4"}
            color={BadgeColor.Info}
          />
          <CycleStats
            icon="icon-park-twotone:chicken-leg"
            title="Non Layers"
            stats={"4"}
            color={BadgeColor.Warning}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export { CycleStatsCard };

interface CycleStatsProps {
  color: BadgeColor;
  icon: string;
  stats: string;
  title: string;
}

const CycleStats = ({ color, icon, stats, title }: CycleStatsProps) => {
  return (
    <div className="col-span-6 md:col-span-4">
      <div className="flex items-center">
        <Badge
          variant={BadgeVariant.Ghost}
          color={color}
          className="mr-4 w-11 h-11 flex"
        >
          <Icon icon={icon} className="w-8 h-8" />
        </Badge>
        <div className="flex flex-col">
          <H5 className="text-xl font-semibold">{stats}</H5>
          <Paragraph className="text-xs">{title}</Paragraph>
        </div>
      </div>
    </div>
  );
};
