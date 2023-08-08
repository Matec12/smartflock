import axios from "..";
import { useQuery } from "@tanstack/react-query";
import { buildUrlWithParams } from "@/lib/utils";
import { GetUserParams } from "./types";
import { User, isAdmin } from "../auth/types";

/**
 * admin get all users
 * @returns
 */
const _getUsersRequest = async (
  params: GetUserParams
): Promise<ApiResponse<{ message: string; users: User[] }>> => {
  const baseURL = "users";

  const url = buildUrlWithParams(baseURL, { ...params });
  const { data } = await axios.get(url);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetUsersQuery = (user: User | null, params?: GetUserParams) =>
  useQuery({
    queryKey: ["users", { ...params }],
    queryFn: () => _getUsersRequest({ ...params }),
    enabled: user ? isAdmin(user) : false
  });
