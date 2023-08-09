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
import { HouseRecordLog } from "@/api/cycle/types";
// import { CreateUpdateHouseRecordLog } from "./CreateUpdateHouseRecordLog";

interface HouseRecordLogTableProps {
  isLoading: boolean;
  houseRecordLogs: HouseRecordLog[];
}

const HouseRecordLogTable = ({
  isLoading,
  houseRecordLogs
}: HouseRecordLogTableProps) => {
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");
  const [currentRow, setCurrentRow] = useState<HouseRecordLog | null>(null);
  // const [openAddHouseRecordLogModal, setOpenAddHouseRecordLogModal] =
  //   useState<boolean>(false);
  // const [openUpdateHouseRecordLogModal, setOpenUpdateHouseRecordLogModal] =
  //   useState<boolean>(false);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    houseRecordLogs,
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

  const handleAddHouseRecordLogModal = () => {
    // setOpenAddHouseRecordLogModal(true);
  };

  const handleUpdateHouseRecordLogModal = (row: HouseRecordLog) => {
    setCurrentRow(row);
    // setOpenUpdateHouseRecordLogModal(true);
  };

  const handleViewDetails = (row: HouseRecordLog) => {
    setCurrentRow(row);
  };

  // const handleClose = () => {
  //   setOpenAddHouseRecordLogModal(false);
  //   setOpenUpdateHouseRecordLogModal(false);
  // };

  console.log(currentRow);

  const tableActions = (row?: HouseRecordLog): TableActions[] => [
    {
      title: "View",
      icon: "eva:eye-fill",
      action: () => handleViewDetails(row!),
      privilege: [2]
    },
    {
      title: "Update",
      icon: "eva:edit-fill",
      action: () => handleUpdateHouseRecordLogModal(row!),
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
      render: (row: HouseRecordLog) => fDateTime(row?.date)
    },
    {
      id: "ageOfBirds",
      label: "Age"
    },
    {
      id: "eggsProductionNumber",
      label: "Eggs Produced",
      render: (row: HouseRecordLog) => row.eggsProduction?.number
    },
    {
      id: "stockOfBirdsMortality",
      label: "Stock Mortality",
      render: (row: HouseRecordLog) => row.stockOfBirds?.mortality
    },
    {
      id: "stockOfBirdsMortality",
      label: "Stock Balance",
      render: (row: HouseRecordLog) => row.stockOfBirds?.balance
    },
    {
      id: "drugVaccineUsed",
      label: "Vaccine Used",
      render: (row: HouseRecordLog) => row.stockOfBirds?.balance
    },
    {
      id: "managementRemarks",
      label: "Remarks",
      render: (row: HouseRecordLog) => row.stockOfBirds?.balance
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: HouseRecordLog) => (
        <TableMoreMenu actions={tableActions(row)} />
      )
    }
  ];

  return (
    <>
      <Card className="z-10">
        <TableToolbar
          filteredData={filteredData!}
          title="House Record Log"
          rowsPerPage={rowsPerPage}
          handlePerPage={handleChangeRowsPerPage}
          filterTerm={filterTerm}
          handleFilter={handleFilter}
          buttonName="Log"
          handleAddModal={handleAddHouseRecordLogModal}
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
      {/* {openAddHouseRecordLogModal && (
        <CreateUpdateHouseRecordLog
          isOpen={openAddHouseRecordLogModal}
          handleClose={handleClose}
        />
      )}

      {openUpdateHouseRecordLogModal && (
        <CreateUpdateHouseRecordLog
          currentRow={currentRow!}
          isOpen={openUpdateHouseRecordLogModal}
          handleClose={handleClose}
        />
      )} */}
    </>
  );
};

export { HouseRecordLogTable };
