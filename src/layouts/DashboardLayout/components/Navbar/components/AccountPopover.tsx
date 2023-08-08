import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "@/hooks";
import MyAvatar from "@/components/MyAvatar";
import { Paragraph, UnstyledLink } from "@/components/UI";
import { clsxm } from "@/lib/utils";

const AccountPopover = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <MyAvatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex w-full items-center justify-start gap-3 border-b border-dashed px-4 py-2">
            <MyAvatar />
            <div>
              <Paragraph className="text-sm">{user?.username}</Paragraph>
              <Paragraph className="text-xs capitalize">{user?.role}</Paragraph>
            </div>
          </div>
          <Menu.Item>
            {({ active }) => (
              <UnstyledLink
                href="/dashboard/settings"
                className={clsxm(
                  { "bg-gray-100": active },
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </UnstyledLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <UnstyledLink
                onClick={handleLogout}
                href="/auth/login"
                className={clsxm(
                  { "bg-gray-100": active },
                  "block border-t border-dashed px-4 py-2 text-sm text-danger"
                )}
              >
                Sign out
              </UnstyledLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccountPopover;
