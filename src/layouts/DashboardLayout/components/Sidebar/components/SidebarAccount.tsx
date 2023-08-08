import { useAuth } from "@/hooks";
import MyAvatar from "@/components/MyAvatar";
import { UnstyledLink, H6, Paragraph } from "@/components/UI";
import { clsxm } from "@/lib/utils";

interface ISidebarAccountProps {
  isCollapse: boolean;
}

const SidebarAccount = ({ isCollapse }: ISidebarAccountProps) => {
  const { user } = useAuth();

  return (
    <UnstyledLink className="mt-6" href="/user/account">
      <div
        className={clsxm(
          "flex items-center rounded-lg bg-gray-500 bg-opacity-10 py-4 px-5 transition-opacity duration-200",
          { "bg-transparent": isCollapse }
        )}
      >
        <MyAvatar />

        <div
          className={clsxm("ml-4 transition-width duration-200", {
            hidden: isCollapse
          })}
        >
          <H6 className="text-ellipsis text-base">{user?.username}</H6>
          <Paragraph className="text-ellipsis text-xs capitalize text-secondary">
            {user?.organizationName}
          </Paragraph>
        </div>
      </div>
    </UnstyledLink>
  );
};

export default SidebarAccount;
