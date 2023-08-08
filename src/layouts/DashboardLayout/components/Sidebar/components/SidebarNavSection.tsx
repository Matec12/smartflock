import { SidebarConfigProps } from "./SidebarConfig";
import { NavListRoot } from "./SidebarNavList";
import { ListSubheaderStyle } from "./style";
import { clsxm } from "@/lib/utils";

interface ISidebarNavSectionProps {
  isCollapse: boolean;
  sidebarConfig: SidebarConfigProps[];
}

const SidebarNavSection = ({
  sidebarConfig,
  isCollapse = false,
  ...other
}: ISidebarNavSectionProps) => {
  return (
    <div {...other} className="">
      {sidebarConfig.map((group) => (
        <div key={group.subheader} className="">
          <ListSubheaderStyle
            className={clsxm("px-6", { "opacity-0": isCollapse })}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SidebarNavSection;
