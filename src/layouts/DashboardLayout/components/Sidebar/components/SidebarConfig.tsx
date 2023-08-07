export const SidebarConfig: SidebarConfigProps[] = [
  {
    subheader: "Home",
    items: [
      {
        title: "Overview",
        icon: "icon-park-twotone:home",
        path: "/dashboard/overview",
        permissions: [1, 2, 3, 4]
      }
    ]
  },
  // {
  //   subheader: "System Data",
  //   items: [
  //     {
  //       title: "Speciality",
  //       icon: "maki:doctor",
  //       path: "/dashboard/system-data/speciality",
  //       permissions: [2]
  //     },
  //     {
  //       title: "Modality",
  //       icon: "ph:test-tube-duotone",
  //       path: "/dashboard/system-data/modality",
  //       permissions: [2]
  //     },
  //     {
  //       title: "Study Description",
  //       icon: "ic:twotone-description",
  //       path: "/dashboard/system-data/study_description",
  //       permissions: [2]
  //     }
  //   ]
  // },
  {
    subheader: "User Management",
    items: [
      {
        title: "Organizations",
        icon: "icon-park-twotone:hospital-four",
        path: "/dashboard/users/specialists",
        permissions: [2]
      },
      {
        title: "Staffs",
        icon: "ic:twotone-people-alt",
        path: "/dashboard/users/clients",
        permissions: [2]
      }
    ]
  },
  {
    subheader: "Examination",
    items: [
      {
        title: "Study",
        icon: "icon-park-twotone:document-folder",
        path: "/dashboard/examination/study",
        permissions: [1, 2, 3, 4]
      },
      {
        title: "WorkSpace",
        icon: "ic:twotone-workspaces",
        path: "/dashboard/examination/workspace",
        permissions: [1]
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
        permissions: [1, 2, 3, 4]
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
        permissions: [1, 2, 3, 4]
      }
    ]
  }
];
