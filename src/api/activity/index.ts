import axios from "..";
import { useQuery } from "@tanstack/react-query";
import { buildUrlWithParams } from "@/lib/utils";
import { User, UserRole } from "../auth/types";
import { Activity, GetActivityParams } from "./types";

/**
 *
 * @param payload
 * @returns
 */
const _getAllActivitiesRequest = async (
  params: GetActivityParams
): Promise<ApiResponse<{ message: string; activities: Activity[] }>> => {
  const baseURL = "activities";

  const url = buildUrlWithParams(baseURL, { ...params });

  const { data } = await axios.get(url);
  return data;
};

export const useGetAllActivitiesQuery = (
  user: User,
  params?: GetActivityParams
) =>
  useQuery({
    queryKey: [
      "activities",
      { dateFrom: params?.dateFrom, dateTo: params?.dateTo }
    ],
    queryFn: () => _getAllActivitiesRequest({ ...params }),
    enabled: user.role === UserRole.OrgAdmin
  });

/**
 *
 * @param payload
 * @returns
 */
const _getCurrentUserActivitiesRequest = async (
  params?: GetActivityParams
): Promise<ApiResponse<{ message: string; activities: Activity[] }>> => {
  const baseURL = "activities/me";

  const url = buildUrlWithParams(baseURL, { ...params });
  const { data } = await axios.get(url);
  return data;
};

export const useGetCurrentUserActivitiesQuery = (params?: GetActivityParams) =>
  useQuery({
    queryKey: ["user_activities", { ...params }],
    queryFn: () => _getCurrentUserActivitiesRequest({ ...params })
  });
