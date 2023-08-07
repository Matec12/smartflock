import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import {
  CardHeader,
  CardTitle,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Label
} from "../..";
import { clsxm, downloadCSV } from "@/lib/utils";

interface TableToolbarProps {
  filteredData: any[];
  title: string;
  rowsPerPage: number;
  handlePerPage: (e: any) => void;
  filterTerm: string;
  handleFilter: (e: any) => void;
  handleAddModal?: () => void;
  buttonName?: string;
}

const TableToolbar = ({
  filteredData,
  title,
  rowsPerPage,
  handlePerPage,
  filterTerm,
  handleFilter,
  handleAddModal,
  buttonName
}: TableToolbarProps) => {
  return (
    <CardHeader className="p-0">
      <div className="flex w-full flex-col items-center justify-between gap-3  border-b p-6  sm:flex-row">
        <CardTitle className="m-0 w-full md:text-lg">{title}</CardTitle>
        <div className="flex w-full items-center justify-between  gap-4 sm:justify-end">
          <Menu as="div" className="relative">
            <Menu.Button as={Button} outlined className="flex gap-2">
              <Icon icon="material-symbols:file-upload" width={20} />
              <span className="align-middle">Export</span>
            </Menu.Button>
            <Menu.Items
              as="ul"
              className="absolute right-1 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <li
                    className={clsxm(
                      { "bg-gray-100": active },
                      "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => downloadCSV(filteredData, filteredData)}
                  >
                    <Icon icon="" width={15} />
                    <span className="ml-50 align-middle">CSV</span>
                  </li>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <li
                    className={clsxm(
                      { "bg-gray-100": active },
                      "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => downloadCSV(filteredData, filteredData)}
                  >
                    <Icon icon="" width={15} />
                    <span className="ml-50 align-middle">PDF</span>
                  </li>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          {buttonName && (
            <Button
              className="ml-2 gap-2"
              color="primary"
              onClick={handleAddModal}
            >
              <Icon icon="ic:round-plus" width={20} />
              <span className="align-middle">{buttonName}</span>
            </Button>
          )}
        </div>
      </div>

      <div className="mx-0 flex flex-col justify-between gap-3 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 sm:w-1/2">
          <InputGroup merged>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text border-r-0 text-placeholder">
                <Icon icon="basil:search-solid" width={20} />
              </span>
            </InputGroupAddon>
            <Input
              type="text"
              id="search-input"
              placeholder="search..."
              value={filterTerm}
              onChange={handleFilter}
            />
          </InputGroup>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex w-1/2 items-center gap-2 sm:w-auto">
            <Label className="text-sm font-normal" htmlFor="sort-select">
              show
            </Label>
            <select
              className="form-control py-1"
              id="sort-select"
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
            <Label className="text-sm font-normal" htmlFor="sort-select">
              entries
            </Label>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export { TableToolbar };
