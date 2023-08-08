import axios from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, isOrganization } from "../auth/types";
import { CreateCyclePayload, Cycle } from "./types";
import { toast } from "react-hot-toast";

/**
 * org get all cycles
 * @returns
 */
const _getCyclesRequest = async (): Promise<
  ApiResponse<{ message: string; cycles: Cycle[] }>
> => {
  const { data } = await axios.get("cycles");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetCyclesQuery = (user: User) =>
  useQuery({
    queryKey: ["cycles"],
    queryFn: () => _getCyclesRequest(),
    enabled: isOrganization(user)
  });

/**
 * org create cycles
 * @returns
 */
const _createCycleRequest = async (
  payload: Omit<CreateCyclePayload, "_id">
): Promise<ApiResponse<{ message: string; organizations: Cycle[] }>> => {
  const { data } = await axios.post("cycles/create", payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreateCycleMutation = () => {
  const createCycleMutation = useMutation(_createCycleRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return createCycleMutation;
};

/**
 * org update cycles
 * @returns
 */
const _updateCycleRequest = async (
  id: string,
  payload: CreateCyclePayload
): Promise<ApiResponse<{ message: string; organizations: Cycle[] }>> => {
  const { data } = await axios.put(`cycles/update/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useUpdateCycleMutation = () => {
  const updateCycleMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: CreateCyclePayload;
    }) => _updateCycleRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return updateCycleMutation;
};

/**
 * org archive cycles
 * @returns
 */
const _archiveCycleRequest = async (
  id: string
): Promise<ApiResponse<{ message: string; organizations: Cycle[] }>> => {
  const { data } = await axios.put(`cycles/archive/${id}`);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useArchiveCycleMutation = () => {
  const archiveCycleMutation = useMutation(_archiveCycleRequest, {
    // mutationFn: ({
    //   id,
    //   payload
    // }: {
    //   id: string;
    //   payload: CreateCyclePayload;
    // }) => _archiveCycleRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return archiveCycleMutation;
};
