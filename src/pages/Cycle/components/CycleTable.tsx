import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableToolbar,
  CardBody,
  Table,
  TablePagination,
  Card,
  TableMoreMenu
} from "@/components/UI";
import { Cycle } from "@/api/cycle/types";
import { CreateUpdateCycle } from "./CreateUpdateCycle";
import { fDateTime } from "@/lib/formatTime";
import { applySortFilter, getComparator, slugify } from "@/lib/utils";
interface CycleTableProps {
  isLoading: boolean;
  cycles: Cycle[];
}

const CycleTable = ({ isLoading, cycles }: CycleTableProps) => {
  const navigate = useNavigate();
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("action");
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");
  const [currentRow, setCurrentRow] = useState<Cycle | null>(null);
  const [openAddCycleModal, setOpenAddCycleModal] = useState<boolean>(false);
  const [openUpdateCycleModal, setOpenUpdateCycleModal] =
    useState<boolean>(false);

  const handleRequestSort = (_: any, property: string) => {
    const isAsc = orderBy === property && order === "ascending";
    setOrder(isAsc ? "descending" : "ascending");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(
    cycles,
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

  const handleAddCycleModal = () => {
    setOpenAddCycleModal(true);
  };

  const handleUpdateCycleModal = (row: Cycle) => {
    setCurrentRow(row);
    setOpenUpdateCycleModal(true);
  };

  const handleClose = () => {
    setOpenAddCycleModal(false);
    setOpenUpdateCycleModal(false);
  };

  const handleViewDetails = (row: Cycle) => {
    let defaultTab;
    if (row.birdType.birdId === 1) {
      defaultTab = 0;
    } else if (row.birdType.birdId === 2 || row.birdType.birdId === 5) {
      defaultTab = 1;
    } else {
      defaultTab = 2;
    }

    navigate(
      `/dashboard/system-data/cycles/${row._id}/${slugify(
        row.name
      )}/${defaultTab}`
    );
  };

  const tableActions = (row?: Cycle): TableActions[] => [
    {
      title: "View",
      icon: "eva:eye-fill",
      action: () => handleViewDetails(row!),
      privilege: [2]
    },
    {
      title: "Update",
      icon: "eva:edit-fill",
      action: () => handleUpdateCycleModal(row!),
      privilege: [2]
    }
  ];

  const TABLE_HEAD: HeadLabel[] = [
    {
      id: "S/N",
      label: "S/N",
      render: (row) => filteredData?.indexOf(row) + 1
    },
    { id: "name", label: "Name" },
    {
      id: "description",
      label: "Description"
    },
    {
      id: "birdType",
      label: "Bird Type",
      render: (row: Cycle) => row?.birdType?.name
    },
    {
      id: "numberOfBirds",
      label: "Total Birds",
      render: (row: Cycle) => row?.numberOfBirds
    },
    {
      id: "costOfFeedPerKg",
      label: "Cost of Feed Per Kg",
      render: (row: Cycle) => row?.costOfFeedPerKg
    },
    {
      id: "startDate",
      label: "Start Date",
      render: (row: Cycle) => fDateTime(row?.startDate)
    },
    {
      id: "endDate",
      label: "End Date",
      render: (row: Cycle) => fDateTime(row?.endDate)
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: Cycle) => <TableMoreMenu actions={tableActions(row)} />
    }
  ];

  return (
    <>
      <Card className="z-10">
        <TableToolbar
          filteredData={filteredData!}
          title="Cycle"
          rowsPerPage={rowsPerPage}
          handlePerPage={handleChangeRowsPerPage}
          filterTerm={filterTerm}
          handleFilter={handleFilter}
          buttonName="Create Cycle"
          handleAddModal={handleAddCycleModal}
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
      {openAddCycleModal && (
        <CreateUpdateCycle
          isOpen={openAddCycleModal}
          handleClose={handleClose}
        />
      )}

      {openUpdateCycleModal && (
        <CreateUpdateCycle
          currentRow={currentRow!}
          isOpen={openUpdateCycleModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export { CycleTable };
