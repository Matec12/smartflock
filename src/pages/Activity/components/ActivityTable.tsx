import { SetStateAction, useState } from "react";
import {
  TableToolbar,
  CardBody,
  Table,
  TablePagination
} from "@/components/UI";
import { fDateTime } from "@/lib/formatTime";
import { applySortFilter, getComparator } from "@/lib/utils";
import { Activity } from "@/api/activity/types";

interface ActivityTableProps {
  isLoading: boolean;
  activities: Activity[];
}

const ActivityTable = ({ isLoading, activities }: ActivityTableProps) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    activities,
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

  const TABLE_HEAD: HeadLabel[] = [
    {
      id: "S/N",
      label: "S/N",
      render: (row) => filteredData?.indexOf(row) + 1
    },
    { id: "action", label: "Action" },
    {
      id: "username",
      label: "Username",
      render: (row: Activity) => row?.user?.username
    },
    {
      id: "email",
      label: "Email",
      render: (row: Activity) => row?.user?.email
    },
    {
      id: "actionTime",
      label: "Action Time",
      render: (row: Activity) => fDateTime(row?.createdAt)
    }
  ];

  return (
    <>
      <TableToolbar
        filteredData={filteredData!}
        title="Activity"
        rowsPerPage={rowsPerPage}
        handlePerPage={handleChangeRowsPerPage}
        filterTerm={filterTerm}
        handleFilter={handleFilter}
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
    </>
  );
};

export default ActivityTable;
