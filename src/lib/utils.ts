import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse, isValid, isDate } from "date-fns";

/**
 *
 * @param classNames
 * @returns string
 */
export const clsxm = (...classNames: ClassValue[]): string => {
  return twMerge(clsx(classNames));
};

/**
 *check if window is a browser
 * @returns boolean
 */
export const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/**
 *
 * @param password
 * @returns boolean
 */
export const passwordValidator = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password)
  );
};

/**
 *
 * @param data
 * @param array
 * @returns
 */
export const convertArrayOfObjectsToCSV = (data: any[], array: any[]) => {
  let result: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

/**
 *
 * @param data
 * @param array
 * @returns
 */
export const downloadCSV = (data: any[], array: any[]) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(data, array);
  if (csv === null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

/**
 *
 * @param a
 * @param b
 * @param orderBy
 * @returns
 */
export const descendingComparator: ComparatorFunction = (
  a: TableDataItem,
  b: TableDataItem,
  orderBy: string
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

// export const getComparator = (
//   order: "ascending" | "descending",
//   orderBy: string
// ) => {
//   return order === "descending"
//     ? (a: any, b: any) => descendingComparator(a, b, orderBy)
//     : (a: any, b: any) => -descendingComparator(a, b, orderBy);
// };

/**
 *
 * @param order
 * @returns
 */
export const getComparator = (
  order: "ascending" | "descending",
  orderBy: string
): ComparatorFunction => {
  return order === "descending"
    ? (a: TableDataItem, b: TableDataItem) =>
        descendingComparator(a, b, orderBy)
    : (a: TableDataItem, b: TableDataItem) =>
        -descendingComparator(a, b, orderBy);
};

/**
 *
 * @param array
 * @param comparator
 * @param query
 * @returns
 */ export const applySortFilter = (
  array: TableDataItem[],
  comparator: ComparatorFunction,
  query: string
): TableDataItem[] => {
  if (!array || array.length === 0) return [];

  const parseDate = (value: any): Date | null => {
    const date = parse(value, "MMMM dd, yyyy HH:mm aa", new Date());
    return isValid(date) ? date : null;
  };

  const filterDeep = (data: TableDataItem | string | number): boolean => {
    if (typeof data === "object" && data !== null) {
      for (const value of Object.values(data)) {
        if (filterDeep(value as string)) return true;
      }
    } else if (typeof data === "string") {
      if (isDate(data)) {
        const date = parseDate(data);
        if (date && query !== "" && isValid(date)) {
          return data.toLowerCase().includes(query.toLowerCase());
        }
      } else {
        return data.toLowerCase().includes(query.toLowerCase());
      }
    }
    return false;
  };

  const stabilizedThis: [TableDataItem, number][] = array.map((el, index) => [
    el,
    index
  ]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0], query);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return stabilizedThis.filter((el) => filterDeep(el[0])).map((el) => el[0]);
  }

  return stabilizedThis.map((el) => el[0]);
};

export const buildUrlWithParams = (
  baseURL: string,
  params: QueryParams = {}
): string => {
  let url = baseURL;
  const queryParams = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  return url;
};
