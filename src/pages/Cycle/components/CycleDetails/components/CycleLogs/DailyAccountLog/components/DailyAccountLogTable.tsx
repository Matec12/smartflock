import { SetStateAction, useState } from "react";
import {
  TableToolbar,
  CardBody,
  Table,
  TablePagination,
  Card,
  TableMoreMenu
} from "@/components/UI";
import { fDateTime } from "@/lib/formatTime";
import { applySortFilter, getComparator } from "@/lib/utils";
import { DailyAccountLog } from "@/api/cycle/types";
// import { CreateUpdateDailyAccountLog } from "./CreateUpdateDailyAccountLog";

interface DailyAccountLogTableProps {
  isLoading: boolean;
  dailyAccountLogs: DailyAccountLog[];
}

const DailyAccountLogTable = ({
  isLoading,
  dailyAccountLogs
}: DailyAccountLogTableProps) => {
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");
  const [currentRow, setCurrentRow] = useState<DailyAccountLog | null>(null);
  // const [openAddDailyAccountLogModal, setOpenAddDailyAccountLogModal] =
  //   useState<boolean>(false);
  // const [openUpdateDailyAccountLogModal, setOpenUpdateDailyAccountLogModal] =
  //   useState<boolean>(false);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    dailyAccountLogs,
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

  const handleAddDailyAccountLogModal = () => {
    // setOpenAddDailyAccountLogModal(true);
  };

  const handleUpdateDailyAccountLogModal = (row: DailyAccountLog) => {
    setCurrentRow(row);
    // setOpenUpdateDailyAccountLogModal(true);
  };

  const handleViewDetails = (row: DailyAccountLog) => {
    setCurrentRow(row);
  };

  // const handleClose = () => {
  //   setOpenAddDailyAccountLogModal(false);
  //   setOpenUpdateDailyAccountLogModal(false);
  // };

  console.log(currentRow);

  const tableActions = (row?: DailyAccountLog): TableActions[] => [
    {
      title: "View",
      icon: "eva:eye-fill",
      action: () => handleViewDetails(row!),
      privilege: [2]
    },
    {
      title: "Update",
      icon: "eva:edit-fill",
      action: () => handleUpdateDailyAccountLogModal(row!),
      privilege: [2]
    }
  ];

  const TABLE_HEAD: HeadLabel[] = [
    {
      id: "S/N",
      label: "S/N",
      render: (row) => filteredData?.indexOf(row) + 1
    },
    {
      id: "date",
      label: "Log Date",
      render: (row: DailyAccountLog) => fDateTime(row?.date)
    },
    {
      id: "eggsProduction",
      label: "Eggs Produced",
      render: (row: DailyAccountLog) => row.eggsProduction.produced
    },
    {
      id: "eggsProductionSold",
      label: "Eggs Sold",
      render: (row: DailyAccountLog) => row.eggsProduction.sold
    },
    {
      id: "eggsProductionBalance",
      label: "Balance C/F",
      render: (row: DailyAccountLog) => row.eggsProduction.balanceCarriedForward
    },
    {
      id: "cashBalance",
      label: "Cash In Hand",
      render: (row: DailyAccountLog) => row.cashBalance.cashInHand
    },
    {
      id: "sales",
      label: "Sales",
      render: (row: DailyAccountLog) => row.cashBalance.sales
    },
    {
      id: "Expenses",
      label: "Expenses",
      render: (row: DailyAccountLog) => row.cashBalance.cashInHand
    },
    {
      id: "remarks",
      label: "Remarks"
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: DailyAccountLog) => (
        <TableMoreMenu actions={tableActions(row)} />
      )
    }
  ];

  return (
    <>
      <Card className="z-10">
        <TableToolbar
          filteredData={filteredData!}
          title="Daily Account Log"
          rowsPerPage={rowsPerPage}
          handlePerPage={handleChangeRowsPerPage}
          filterTerm={filterTerm}
          handleFilter={handleFilter}
          buttonName="Log"
          handleAddModal={handleAddDailyAccountLogModal}
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
      {/* {openAddDailyAccountLogModal && (
        <CreateUpdateDailyAccountLog
          isOpen={openAddDailyAccountLogModal}
          handleClose={handleClose}
        />
      )}

      {openUpdateDailyAccountLogModal && (
        <CreateUpdateDailyAccountLog
          currentRow={currentRow!}
          isOpen={openUpdateDailyAccountLogModal}
          handleClose={handleClose}
        />
      )} */}
    </>
  );
};

export { DailyAccountLogTable };
