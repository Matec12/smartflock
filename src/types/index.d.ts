type ApiPayload = {
  message: string;
};

type ApiResponse<T extends ApiPayload = ApiPayload> = {
  error: string;
  payload: ApiPayload & T;
  status_code: number;
  success: boolean;
};

type RequestError = { response: { data: ApiResponse<null> } };

/****************************************************
 *
 *                    NAV
 *
 ***************************************************/

type SidebarConfigProps = {
  subheader: string;
  items: NavItemProps[];
};

type NavItemProps = {
  title: string;
  path: string;
  icon?: string;
  permissions?: number[];
  children?: NavItemProps[];
};
