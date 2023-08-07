import { Icon } from "@iconify/react";
import { usePagination, DOTS } from "@/hooks";
import { CardFooter, Button, Paragraph } from "../..";
import { clsxm } from "@/lib/utils";

interface TablePaginationProps {
  onPageChange: (p: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}
const TablePagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize
}: TablePaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // if (currentPage === 0 || paginationRange!?.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage;
  if (typeof paginationRange === "object") {
    lastPage = Number(paginationRange[paginationRange?.length - 1]);
  }

  const begin = (currentPage - 1) * pageSize;
  const end = begin + pageSize;

  return (
    <CardFooter className="flex items-center justify-between border-gray-200 bg-white px-4 py-6 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          outlined
          className="py-2"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          outlined
          className="py-2"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalCount > 0 ? (
            <Paragraph className="text-sm text-gray-700">
              Showing <span className="font-medium">{begin + 1}</span> to{" "}
              <span className="font-medium">
                {lastPage === currentPage ? totalCount : end}
              </span>{" "}
              of <span className="font-medium">{totalCount}</span> results
            </Paragraph>
          ) : (
            <Paragraph className="text-sm text-gray-700">
              Showing 0 results
            </Paragraph>
          )}
        </div>
        <div>
          <ul
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <li
              className={clsxm(
                "relative inline-flex cursor-pointer items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20",
                {
                  "pointer-events-none cursor-default hover:bg-transparent":
                    currentPage === 1
                }
              )}
              onClick={onPrevious}
            >
              <span className="sr-only">Previous</span>
              <Icon
                icon="material-symbols:chevron-left-rounded"
                className="h-5 w-5"
                aria-hidden="true"
              />
            </li>

            {paginationRange?.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return (
                  <li
                    key={index}
                    className="pagination-item dots  relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    &#8230;
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className={clsxm(
                    "relative inline-flex cursor-pointer items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20",
                    {
                      "relative z-10 inline-flex items-center border border-primary-90 bg-primary-10 px-4 py-2 text-sm font-medium text-primary focus:z-20":
                        pageNumber === currentPage
                    }
                  )}
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  {pageNumber}
                </li>
              );
            })}

            <li
              className={clsxm(
                "relative inline-flex cursor-pointer items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20",
                {
                  "pointer-events-none hover:cursor-default hover:bg-transparent":
                    currentPage === lastPage
                }
              )}
              onClick={onNext}
            >
              <span className="sr-only">Next</span>
              <Icon
                icon="material-symbols:chevron-right-rounded"
                className="h-5 w-5"
                aria-hidden="true"
              />
            </li>
          </ul>
        </div>
      </div>
    </CardFooter>
  );
};

export { TablePagination };
