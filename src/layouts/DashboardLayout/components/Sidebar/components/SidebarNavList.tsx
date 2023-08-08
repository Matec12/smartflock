import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavItemRoot, NavItemSub } from "./SidebarNavItem";
import { Disclosure, Transition } from "@headlessui/react";
import { getActive } from "@/lib/layout";
import { NavItemProps } from "./SidebarConfig";

interface INavListRootProps {
  isCollapse: boolean;
  list: NavItemProps;
}

const NavListRoot = ({ list, isCollapse }: INavListRootProps) => {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse && (
          <Transition as="div" show={open}>
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="">
                {(list.children || []).map((item) => (
                  <NavListSub key={item.title} list={item} />
                ))}
              </div>
            </Transition.Child>
          </Transition>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
};

//** Nav List Sub */
interface NavListSubProps {
  list: NavItemProps;
}

const NavListSub = ({ list }: NavListSubProps) => {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <Disclosure>
        <Disclosure.Button
          as={NavItemSub}
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
        />

        <Transition as="div" show={open}>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <Disclosure.Panel as="div" className="pl-6">
              {(list.children || []).map((item) => (
                <NavItemSub
                  key={item.title}
                  item={item}
                  active={getActive(item.path, pathname)}
                />
              ))}
            </Disclosure.Panel>
          </Transition.Child>
        </Transition>
      </Disclosure>
    );
  }

  return <NavItemSub item={list} active={active} />;
};

export { NavListRoot, NavListSub };
