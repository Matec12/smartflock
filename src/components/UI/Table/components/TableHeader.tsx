import React, { ComponentPropsWithRef } from "react";
import { TableSortLabel } from "./TableSortLabel";

interface TableHeaderProps extends ComponentPropsWithRef<"thead"> {
  order?: "ascending" | "descending";
  orderBy?: string;
  headLabel: HeadLabel[];
  onRequestSort: (e: React.MouseEvent, b: string) => void;
}

const TableHeader = ({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  ...rest
}: TableHeaderProps) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };

  return (
    <thead className="bg-gray-50" {...rest}>
      <tr className="first:sm:pl-6">
        {headLabel.map((headCell) => (
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            aria-sort={orderBy === headCell.id ? order : "none"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "ascending"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <div className="hidden">
                  {order === "descending"
                    ? "sorted descending"
                    : "sorted ascending"}
                </div>
              ) : null}
            </TableSortLabel>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export { TableHeader };
