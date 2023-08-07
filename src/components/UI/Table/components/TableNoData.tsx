import { EmptyContent } from "./EmptyContent";

interface TableNoDataProps {
  isNotFound: boolean;
}

const TableNoData = ({ isNotFound }: TableNoDataProps) => {
  return (
    <>
      {isNotFound ? (
        <tr>
          <td colSpan={100}>
            <EmptyContent title="No Data" imgClassname="h-32" />
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan={9} className="p-0" />
        </tr>
      )}
    </>
  );
};

export { TableNoData };
