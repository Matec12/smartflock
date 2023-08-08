import { UserRole } from "@/api/auth/types";

export type SidebarConfigProps = {
  subheader: string;
  items: NavItemProps[];
};

export type NavItemProps = {
  title: string;
  path: string;
  icon?: string;
  role: UserRole[];
  children?: NavItemProps[];
};

export const SidebarConfig: SidebarConfigProps[] = [
  {
    subheader: "Home",
    items: [
      {
        title: "Overview",
        icon: "icon-park-twotone:home",
        path: "/dashboard/overview",
        role: [UserRole.Admin, UserRole.OrgAdmin, UserRole.OrgStaff]
      }
    ]
  },
  {
    subheader: "System Data",
    items: [
      {
        title: "Cycles",
        icon: "maki:doctor",
        path: "/dashboard/system-data/cycles",
        role: [UserRole.OrgAdmin, UserRole.OrgStaff]
      }
    ]
  },
  {
    subheader: "User Management",
    items: [
      {
        title: "Users",
        icon: "icon-park-twotone:hospital-four",
        path: "/dashboard/users/specialists",
        role: [UserRole.Admin]
      },
      {
        title: "Organizations",
        icon: "icon-park-twotone:hospital-four",
        path: "/dashboard/users/specialists",
        role: [UserRole.Admin]
      },
      {
        title: "Staffs",
        icon: "ic:twotone-people-alt",
        path: "/dashboard/users/clients",
        role: [UserRole.OrgAdmin]
      }
    ]
  },

  {
    subheader: "Log",
    items: [
      {
        title: "Activity",
        icon: "icon-park-twotone:log",
        path: "/dashboard/activity",
        role: [UserRole.Admin, UserRole.OrgAdmin, UserRole.OrgStaff]
      }
    ]
  },

  {
    subheader: "Account",
    items: [
      {
        title: "Settings",
        icon: "icon-park-twotone:file-settings",
        path: "/dashboard/settings",
        role: [UserRole.Admin, UserRole.OrgAdmin, UserRole.OrgStaff]
      }
    ]
  }
];
