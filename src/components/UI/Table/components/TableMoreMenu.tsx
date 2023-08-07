import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { usePopper } from "@/hooks";
import {
  ListItemIconStyle,
  ListItemTextStyle
} from "@/layouts/DashboardLayout/components/Sidebar/components/style";
import { clsxm } from "@/lib/utils";
import { Button } from "../..";

interface TableMoreMenuProps {
  actions: TableActions[];
  className?: string;
  menuClassName?: string;
}

const TableMoreMenu = ({
  actions,
  className,
  menuClassName
}: TableMoreMenuProps) => {
  const [trigger, container] = usePopper({
    placement: "bottom-end",
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [30, 0] } }]
  });

  // const privilegedActions = actions.filter((action) =>
  //   action.privilege?.includes(accType)
  // );

  return (
    <Menu
      as="div"
      className={clsxm(
        "relative ml-3",
        { hidden: actions.length === 0 },
        className
      )}
    >
      <div>
        <Menu.Button ref={trigger} className="h-8 w-8 text-gray-500">
          <Icon icon="eva:more-horizontal-fill" className="h-5 w-5" />
        </Menu.Button>
      </div>
      <div ref={container} className="z-50 w-56">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={clsxm(
              "origin-top-center absolute z-50 divide-y divide-dashed rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5",
              menuClassName
            )}
          >
            {actions.map((action, index) => (
              <Menu.Item key={index}>
                <div className={clsxm("")}>
                  <Button
                    flat
                    onClick={(e) => {
                      e?.preventDefault();
                      action.action();
                    }}
                    className={clsxm(
                      "w-full rounded-none px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                    )}
                  >
                    <ListItemIconStyle>
                      <Icon icon={action.icon} width={24} height={24} />
                    </ListItemIconStyle>
                    <ListItemTextStyle>{action.title}</ListItemTextStyle>
                  </Button>
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

export { TableMoreMenu };
