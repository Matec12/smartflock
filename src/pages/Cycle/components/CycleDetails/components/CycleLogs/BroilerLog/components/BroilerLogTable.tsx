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
import { BroilerLog } from "@/api/cycle/types";
// import { CreateUpdateBroilerLog } from "./CreateUpdateBroilerLog";

interface BroilerLogTableProps {
  isLoading: boolean;
  broilerLogs: BroilerLog[];
}

const BroilerLogTable = ({ isLoading, broilerLogs }: BroilerLogTableProps) => {
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");
  const [currentRow, setCurrentRow] = useState<BroilerLog | null>(null);
  // const [openAddBroilerLogModal, setOpenAddBroilerLogModal] =
  //   useState<boolean>(false);
  // const [openUpdateBroilerLogModal, setOpenUpdateBroilerLogModal] =
  //   useState<boolean>(false);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    broilerLogs,
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

  const handleAddBroilerLogModal = () => {
    // setOpenAddBroilerLogModal(true);
  };

  const handleUpdateBroilerLogModal = (row: BroilerLog) => {
    setCurrentRow(row);
    // setOpenUpdateBroilerLogModal(true);
  };

  const handleViewDetails = (row: BroilerLog) => {
    setCurrentRow(row);
  };

  // const handleClose = () => {
  //   setOpenAddBroilerLogModal(false);
  //   setOpenUpdateBroilerLogModal(false);
  // };

  console.log(currentRow);

  const tableActions = (row?: BroilerLog): TableActions[] => [
    {
      title: "View",
      icon: "eva:eye-fill",
      action: () => handleViewDetails(row!),
      privilege: [2]
    },
    {
      title: "Update",
      icon: "eva:edit-fill",
      action: () => handleUpdateBroilerLogModal(row!),
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
      render: (row: BroilerLog) => fDateTime(row?.date)
    },
    {
      id: "numberOfBirds",
      label: "No of Birds"
    },
    {
      id: "mortality",
      label: "Mortality"
    },
    {
      id: "culls",
      label: "Culls"
    },
    {
      id: "feed",
      label: "Feed(KG)"
    },
    {
      id: "cumulativeFeed",
      label: "Cumulative Feed"
    },
    {
      id: "weeklyWeightGain",
      label: "Weekly Weight Gain"
    },
    {
      id: "drugsVaccinationCost",
      label: "Vaccination Cost"
    },
    {
      id: "costOfFeeding",
      label: "Cost of Feeding"
    },
    {
      id: "costOfLabour",
      label: "Cost of Labour"
    },
    {
      id: "remarks",
      label: "Remarks"
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: BroilerLog) => <TableMoreMenu actions={tableActions(row)} />
    }
  ];

  return (
    <>
      <Card className="z-10">
        <TableToolbar
          filteredData={filteredData!}
          title="Non Layer Log"
          rowsPerPage={rowsPerPage}
          handlePerPage={handleChangeRowsPerPage}
          filterTerm={filterTerm}
          handleFilter={handleFilter}
          buttonName="Log"
          handleAddModal={handleAddBroilerLogModal}
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
      {/* {openAddBroilerLogModal && (
        <CreateUpdateBroilerLog
          isOpen={openAddBroilerLogModal}
          handleClose={handleClose}
        />
      )}

      {openUpdateBroilerLogModal && (
        <CreateUpdateBroilerLog
          currentRow={currentRow!}
          isOpen={openUpdateBroilerLogModal}
          handleClose={handleClose}
        />
      )} */}
    </>
  );
};

export { BroilerLogTable };
