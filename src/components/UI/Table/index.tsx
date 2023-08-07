import React, { ComponentPropsWithRef } from "react";
import { SearchNotFound } from "./components/SearchNotFound";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";
import { TableNoData } from "./components/TableNoData";

interface TableProps extends ComponentPropsWithRef<"table"> {
  isLoading?: boolean;
  TABLE_HEAD: HeadLabel[];
  filterTerm?: string;
  page?: number;
  rowsPerPage?: number;
  orderBy?: string;
  order?: "ascending" | "descending";
  filteredData?: any[];
  isDataFound?: boolean;
  handleRequestSort: (e: React.MouseEvent, b: string) => void;
}

const Table = ({
  isLoading,
  TABLE_HEAD,
  filterTerm,
  page,
  rowsPerPage,
  orderBy,
  order,
  filteredData,
  isDataFound,
  handleRequestSort,
  ...rest
}: TableProps) => {
  const isNotFound =
    (!filteredData?.length && !!filterTerm) ||
    (!isLoading && !filteredData?.length);

  return (
    <table className="table min-w-full divide-y divide-gray-300" {...rest}>
      <TableHeader
        order={order}
        orderBy={orderBy}
        headLabel={TABLE_HEAD}
        onRequestSort={handleRequestSort}
      />
      {isLoading ? (
        <tbody className="">
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="p-3">
              {TABLE_HEAD?.map((column, i) => {
                return (
                  <td className="" key={i}>
                    <div className="skeleton-loader-gradient text-transparent">
                      {column.id}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      ) : (
        <TableBody
          filteredData={filteredData}
          rowsPerPage={rowsPerPage}
          page={page}
          TABLE_HEAD={TABLE_HEAD}
        />
      )}
      {isDataFound && (
        <tbody>
          <tr>
            <td align="center" colSpan={9} className="py-3">
              <SearchNotFound searchQuery={filterTerm!} />
            </td>
          </tr>
        </tbody>
      )}
      {isNotFound && (
        <tbody>
          <TableNoData isNotFound={isNotFound} />
        </tbody>
      )}
    </table>
  );
};

export { Table };
