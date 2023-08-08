import { ComponentPropsWithRef } from "react";

interface TableBodyProps extends ComponentPropsWithRef<"tbody"> {
  filteredData?: any[];
  rowsPerPage?: number;
  page?: number;
  TABLE_HEAD: HeadLabel[];
}

const TableBody = ({
  filteredData,
  rowsPerPage,
  page,
  TABLE_HEAD,
  ...rest
}: TableBodyProps) => {
  const begin = (page! - 1) * rowsPerPage!;
  const end = begin + rowsPerPage!;
  return (
    <tbody
      className="divide-y divide-gray-200 overflow-x-visible bg-white"
      {...rest}
    >
      {filteredData?.slice(begin, end).map((row, index: number) => {
        const { id } = row;

        return (
          <tr key={id} tabIndex={-1} className="first:sm:pl-6">
            {TABLE_HEAD.map((column, i) => {
              const value = row[column.id] ? row[column.id] : null;

              return (
                <td
                  className="whitespace-nowrap py-4 pl-3 pr-3 text-sm font-medium text-gray-700 sm:pl-4"
                  key={i}
                  align={column.align}
                >
                  {column.render ? column.render(row, index) : value}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export { TableBody };
