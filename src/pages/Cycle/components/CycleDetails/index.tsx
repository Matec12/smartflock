import { Menu } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useGetCyclesQuery } from "@/api/cycle";
import { Page } from "@/components/Global";
import {
  Badge,
  BreadCrumbs,
  Button,
  Card,
  CardBody,
  H5,
  Paragraph
} from "@/components/UI";
import { BadgeVariant, BadgeColor, ButtonVariant } from "@/types/types";
import { fDate } from "@/lib/formatTime";
import { clsxm } from "@/lib/utils";
import { useState } from "react";
import { CreateUpdateCycle } from "../CreateUpdateCycle";

const CycleDetails = () => {
  const params = useParams();
  const { id } = params;
  const { data: cycleData, isLoading } = useGetCyclesQuery({ cycleId: id });
  const cycle = cycleData?.payload?.cycles[0];
  const [openUpdateCycleModal, setOpenUpdateCycleModal] =
    useState<boolean>(false);

  const canLogDailyAccount = cycle?.birdType.birdId !== 1;

  const canLogHouseRecord =
    cycle?.birdType.birdId !== 1 && cycle?.birdType.birdId !== 2;

  const canLogNonLayer =
    cycle?.birdType.birdId !== 3 &&
    cycle?.birdType.birdId !== 4 &&
    cycle?.birdType.birdId !== 6 &&
    cycle?.birdType.birdId !== 7;

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
        <Card className="z-30 my-5 overflow-visible">
          <CardBody>
            <Paragraph className="text-slate-600">Details</Paragraph>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="flex gap-2">
                <Paragraph>Name: </Paragraph>
                <Paragraph>{cycle?.name}</Paragraph>
              </div>
              <div className="flex gap-2">
                <Paragraph>Description: </Paragraph>
                <Paragraph>{cycle?.description}</Paragraph>
              </div>
              <div className="flex gap-2">
                <Paragraph>Bird Type: </Paragraph>
                <Paragraph>{cycle?.birdType?.name}</Paragraph>
              </div>
              <div className="flex gap-2 items-center">
                <Paragraph>Status: </Paragraph>
                <Badge
                  color={
                    cycle?.isActive ? BadgeColor.Success : BadgeColor.Danger
                  }
                  borderRadius="rounded-md"
                >
                  {cycle?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Paragraph>Start Date: </Paragraph>
                <Paragraph>{fDate(cycle?.startDate!)}</Paragraph>
              </div>
              <div className="flex gap-2">
                <Paragraph>End Date: </Paragraph>
                <Paragraph>{fDate(cycle?.endDate!)}</Paragraph>
              </div>
            </div>
            <div className="flex gap-5 justify-center w-full items-center mt-6">
              <Button className="w-1/6" onClick={handleUpdateCycleModal}>
                Edit
              </Button>
              <Button className="w-1/6" variant={ButtonVariant.Danger} ghost>
                End
              </Button>
            </div>
          </CardBody>
        </Card>
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
                    <Menu.Item disabled={canLogDailyAccount}>
                      {({ active }) => (
                        <li
                          className={clsxm(
                            { "bg-gray-100": active },
                            "block cursor-pointer px-4 py-2 text-sm text-body",
                            {
                              "bg-slate-50 text-gray-400 cursor-not-allowed":
                                canLogDailyAccount
                            }
                          )}
                        >
                          <Icon icon="" width={15} />
                          <span className="ml-50 align-middle">
                            Daily Account
                          </span>
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled={canLogHouseRecord}>
                      {({ active }) => (
                        <li
                          className={clsxm(
                            { "bg-gray-100": active },
                            "block cursor-pointer px-4 py-2 text-sm text-body",
                            {
                              "bg-slate-50 text-gray-400 cursor-not-allowed":
                                canLogHouseRecord
                            }
                          )}
                          // onClick={() =>
                          //   downloadCSV(filteredData, filteredData)
                          // }
                        >
                          <Icon icon="" width={15} />
                          <span className="ml-50 align-middle">
                            House Record
                          </span>
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled={canLogNonLayer}>
                      {({ active }) => (
                        <li
                          className={clsxm(
                            { "bg-gray-100": active },
                            "block cursor-pointer px-4 py-2 text-sm text-body",
                            {
                              "bg-slate-50 text-gray-400 cursor-not-allowed":
                                canLogNonLayer
                            }
                          )}
                          // onClick={() =>
                          //   downloadCSV(filteredData, filteredData)
                          // }
                        >
                          <Icon icon="" width={15} />
                          <span className="ml-50 align-middle">Non-Layer</span>
                        </li>
                      )}
                    </Menu.Item>
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
