import { SetStateAction, useState } from "react";
import {
  TableToolbar,
  CardBody,
  Table,
  TablePagination,
  Card,
  TableMoreMenu,
  Badge
} from "@/components/UI";
import { CreateStaff } from "./CreateStaff";
import { ToggleStaffAccess } from "./ToggleStaffAccess";
import { ResetStaffPassword } from "./ResetStaffPassword";
import { User, UserRole } from "@/api/auth/types";
import { BadgeColor } from "@/types/types";
import { fDateTime } from "@/lib/formatTime";
import { applySortFilter, getComparator } from "@/lib/utils";

interface StaffsTableProps {
  isLoading: boolean;
  staffs: User[];
}

const StaffsTable = ({ isLoading, staffs }: StaffsTableProps) => {
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");
  const [currentRow, setCurrentRow] = useState<User | null>(null);
  const [openAddStaffsModal, setOpenAddStaffsModal] = useState<boolean>(false);
  const [openToggleStaffAccessModal, setOpenToggleStaffAccessModal] =
    useState<boolean>(false);
  const [openResetStaffPasswordModal, setOpenResetStaffPasswordModal] =
    useState<boolean>(false);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    staffs,
    getComparator(order, orderBy),
    filterTerm
  );

  const handleFilter = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterTerm(event.target.value);
    setPage(1);
  };

  const handleChangePage = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isDataFound = filteredData?.length === 0;

  const handleAddStaffsModal = () => {
    setOpenAddStaffsModal(true);
  };

  const handleToggleStaffModal = (row: User) => {
    setCurrentRow(row);
    setOpenToggleStaffAccessModal(true);
  };

  const handleResetStaffPasswordModal = (row: User) => {
    setCurrentRow(row);
    setOpenResetStaffPasswordModal(true);
  };

  const handleClose = () => {
    setOpenAddStaffsModal(false);
    setOpenToggleStaffAccessModal(false);
    setOpenResetStaffPasswordModal(false);
  };

  const tableActions = (row?: User): TableActions[] => [
    {
      title: "Toggle Status",
      icon: "ic:twotone-toggle-off",
      action: () => handleToggleStaffModal(row!),
      privilege: [2]
    },
    {
      title: "Reset Staff Password",
      icon: "solar:lock-password-bold-duotone",
      action: () => handleResetStaffPasswordModal(row!),
      privilege: [2]
    }
  ];

  const TABLE_HEAD: HeadLabel[] = [
    {
      id: "S/N",
      label: "S/N",
      render: (row) => filteredData?.indexOf(row) + 1
    },
    { id: "fullname", label: "Full Name" },
    {
      id: "username",
      label: "Username"
    },
    {
      id: "email",
      label: "Email"
    },
    {
      id: "role",
      label: "Role",
      render: (row: User) =>
        row?.role === UserRole.OrgAdmin ? "Admin" : "Staff"
    },
    {
      id: "isActive",
      label: "Status",
      render: (row: User) => (
        <Badge
          color={row?.isActive ? BadgeColor.Success : BadgeColor.Danger}
          borderRadius="rounded-md"
        >
          {row?.isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
    {
      id: "createdAt",
      label: "Date Created",
      render: (row: User) => fDateTime(row.createdAt)
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: User) => <TableMoreMenu actions={tableActions(row)} />
    }
  ];

  return (
    <>
      <Card className="z-10">
        <TableToolbar
          filteredData={filteredData!}
          title="Staffs"
          rowsPerPage={rowsPerPage}
          handlePerPage={handleChangeRowsPerPage}
          filterTerm={filterTerm}
          handleFilter={handleFilter}
          buttonName="Create Staff"
          handleAddModal={handleAddStaffsModal}
        />
        <CardBody className="overflow-x-auto overflow-y-hidden p-0">
          <Table
            isLoading={isLoading}
            handleRequestSort={handleRequestSort}
            TABLE_HEAD={TABLE_HEAD}
            order={order}
            orderBy={orderBy}
            filteredData={filteredData}
            page={page}
            rowsPerPage={rowsPerPage}
            filterTerm={filterTerm}
            isDataFound={isDataFound}
          />
        </CardBody>
        <TablePagination
          totalCount={filteredData?.length}
          siblingCount={1}
          currentPage={page}
          pageSize={rowsPerPage}
          onPageChange={handleChangePage}
        />
      </Card>
      {openAddStaffsModal && (
        <CreateStaff isOpen={openAddStaffsModal} handleClose={handleClose} />
      )}
      {openToggleStaffAccessModal && (
        <ToggleStaffAccess
          currentRow={currentRow!}
          isOpen={openToggleStaffAccessModal}
          handleClose={handleClose}
        />
      )}
      {openResetStaffPasswordModal && (
        <ResetStaffPassword
          currentRow={currentRow!}
          isOpen={openResetStaffPasswordModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export { StaffsTable };
