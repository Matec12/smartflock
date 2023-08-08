import { Icon } from "@iconify/react";
import { ButtonLink } from "@/components/UI";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";
import { isExternalLink } from "@/lib/layout";
import { NavItemProps } from "./SidebarConfig";
import { clsxm } from "@/lib/utils";

interface INavItemRootProps {
  active: boolean;
  open?: boolean;
  isCollapse: boolean;
  onOpen?: () => void;
  item: NavItemProps;
}

const NavItemRoot = ({
  item,
  isCollapse,
  open = false,
  active,
  onOpen
}: INavItemRootProps) => {
  const { title, path, icon, children } = item;

  const renderContent = (
    <>
      {icon && <Icon width={24} height={24} icon={icon} />}
      <ListItemTextStyle isCollapse={isCollapse}>{title}</ListItemTextStyle>
      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  );

  if (children) {
    return (
      <ListItemStyle flat onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle as={ButtonLink} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle as={ButtonLink} flat href={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
};

//** Nav Item Sub */
interface INavItemSubProps {
  active: boolean;
  open?: boolean;
  onOpen?: () => void;
  item: NavItemProps;
}

const NavItemSub = ({
  item,
  open = false,
  active = false,
  onOpen
}: INavItemSubProps) => {
  const { title, path, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemTextStyle className="my-0 flex-auto">{title}</ListItemTextStyle>
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle flat onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      as={ButtonLink}
      flat
      href={path}
      target="_blank"
      rel="noopener"
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle as={ButtonLink} flat href={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
};

//** Dot Icon */
interface IDotIconProps {
  active: boolean;
}

const DotIcon = ({ active }: IDotIconProps) => {
  return (
    <ListItemIconStyle>
      <span
        className={clsxm(
          "h-1 w-1 rounded-full bg-gray-200 transition-transform",
          { "scale-110 transform bg-primary": active }
        )}
      />
    </ListItemIconStyle>
  );
};

//**  Arrow Icon */
interface IArrowIconProps {
  open: boolean;
}

const ArrowIcon = ({ open }: IArrowIconProps) => {
  return (
    <Icon
      icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
      className="ml-2 h-4 w-4"
    />
  );
};

export { DotIcon, ArrowIcon, NavItemSub, NavItemRoot };
