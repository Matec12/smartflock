type QueryParams = {
  [key: string]: string | number | boolean;
};

type TableDataItem = {
  [key: string]: any;
};

type ComparatorFunction = (
  a: TableDataItem,
  b: TableDataItem,
  orderBy: string
) => number;

type ApiPayload = {
  message: string;
};

type ApiResponse<T extends ApiPayload = ApiPayload> = {
  error: string;
  payload: ApiPayload & T;
  status_code: number;
  success: boolean;
};

type RequestError = { data: ApiResponse<null> };

type SelectOptions = {
  value: string;
  label: string;
};

/****************************************************
 *
 *                    TABLE
 *
 ***************************************************/

type HeadLabel = {
  id: string;
  label?: string;
  render?: (row: any, index: any) => string | React.ReactNode;
  alignRight?: boolean;
  align?: "left" | "center" | "right" | "justify" | "char";
};

type TableActions = {
  title: string;
  icon: string;
  action: () => void;
  privilege?: number[];
};
