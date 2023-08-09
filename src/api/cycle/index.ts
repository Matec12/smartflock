import axios from "..";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BirdType,
  BroilerLog,
  CreateBroilerLogPayload,
  CreateCyclePayload,
  CreateDailyAccountLogPayload,
  CreateHouseRecordLogPayload,
  Cycle,
  DailyAccountLog,
  GetCycleParams,
  HouseRecordLog
} from "./types";
import { buildUrlWithParams } from "@/lib/utils";

/**
 * org get all cycles
 * @returns
 */
const _getBirdTypesRequest = async (): Promise<
  ApiResponse<{ message: string; birds: BirdType[] }>
> => {
  const { data } = await axios.get("birds");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetBirdTypesQuery = () =>
  useQuery({
    queryKey: ["birds"],
    queryFn: () => _getBirdTypesRequest()
  });

/**
 * org get all cycles
 * @returns
 */
const _getCyclesRequest = async (
  params: GetCycleParams
): Promise<ApiResponse<{ message: string; cycles: Cycle[] }>> => {
  const baseURL = "cycles";

  const url = buildUrlWithParams(baseURL, { ...params });
  const { data } = await axios.get(url);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetCyclesQuery = (params?: GetCycleParams) =>
  useQuery({
    queryKey: ["cycles", { ...params }],
    retry: false,
    queryFn: () => _getCyclesRequest({ ...params })
  });

/**
 * org create cycles
 * @returns
 */
const _createCycleRequest = async (
  payload: CreateCyclePayload
): Promise<ApiResponse<{ message: string; cycle: Cycle }>> => {
  const { data } = await axios.post("cycles/create", payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreateCycleMutation = () => {
  const queryClient = useQueryClient();

  const createCycleMutation = useMutation(_createCycleRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["cycles"] });
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
): Promise<ApiResponse<{ message: string; cycle: Cycle }>> => {
  const { data } = await axios.put(`cycles/update/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useUpdateCycleMutation = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["cycles"] });
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

/**
 * org get daily account by cycle
 * @returns
 */
const _getDailyAccountLogsRequest = async (
  cycle: string
): Promise<
  ApiResponse<{ message: string; daily_account_logs: DailyAccountLog[] }>
> => {
  const { data } = await axios.get(`daily_account_logs/${cycle}`);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetDailyAccountLogsQuery = (cycle: string) =>
  useQuery({
    queryKey: ["daily_account_logs", cycle],
    queryFn: () => _getDailyAccountLogsRequest(cycle)
  });

/**
 * org create cycles
 * @returns
 */
const _createDailyAccountLogRequest = async (
  cycle: string,
  payload: CreateDailyAccountLogPayload
): Promise<
  ApiResponse<{ message: string; daily_account_logs: DailyAccountLog }>
> => {
  const { data } = await axios.post(
    `daily_account_logs/create/${cycle}`,
    payload
  );
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreatDailyAccountLogMutation = () => {
  const queryClient = useQueryClient();

  const creatDailyAccountLogMutation = useMutation({
    mutationFn: ({
      cycle,
      payload
    }: {
      cycle: string;
      payload: CreateDailyAccountLogPayload;
    }) => _createDailyAccountLogRequest(cycle, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["daily_account_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return creatDailyAccountLogMutation;
};

/**
 * org update cycles
 * @returns
 */
const _updateDailyAccountLogRequest = async (
  id: string,
  payload: CreateDailyAccountLogPayload
): Promise<ApiResponse<{ message: string; cycle: DailyAccountLog }>> => {
  const { data } = await axios.put(`daily_account_logs/update/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useUpdateDailyAccountLogMutation = () => {
  const queryClient = useQueryClient();

  const updateDailyAccountLogMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: CreateDailyAccountLogPayload;
    }) => _updateDailyAccountLogRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["daily_account_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return updateDailyAccountLogMutation;
};

//==================================================================
/**
 * org get house record by cycle
 * @returns
 */
const _getHouseRecordLogsRequest = async (
  cycle: string
): Promise<
  ApiResponse<{ message: string; house_record_logs: HouseRecordLog[] }>
> => {
  const { data } = await axios.get(`house_record_logs/${cycle}`);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetHouseRecordLogsQuery = (cycle: string) =>
  useQuery({
    queryKey: ["house_record_logs", cycle],
    queryFn: () => _getHouseRecordLogsRequest(cycle)
  });

/**
 * org create house record
 * @returns
 */
const _createHouseRecordLogRequest = async (
  cycle: string,
  payload: CreateHouseRecordLogPayload
): Promise<
  ApiResponse<{ message: string; house_record_logs: HouseRecordLog }>
> => {
  const { data } = await axios.post(
    `house_record_logs/create/${cycle}`,
    payload
  );
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreatHouseRecordLogMutation = () => {
  const queryClient = useQueryClient();

  const creatHouseRecordLogMutation = useMutation({
    mutationFn: ({
      cycle,
      payload
    }: {
      cycle: string;
      payload: CreateHouseRecordLogPayload;
    }) => _createHouseRecordLogRequest(cycle, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["house_record_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return creatHouseRecordLogMutation;
};

/**
 * org update cycles
 * @returns
 */
const _updateHouseRecordLogRequest = async (
  id: string,
  payload: CreateHouseRecordLogPayload
): Promise<ApiResponse<{ message: string; cycle: HouseRecordLog }>> => {
  const { data } = await axios.put(`house_record_logs/update/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useUpdateHouseRecordLogMutation = () => {
  const queryClient = useQueryClient();

  const updateHouseRecordLogMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: CreateHouseRecordLogPayload;
    }) => _updateHouseRecordLogRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["house_record_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return updateHouseRecordLogMutation;
};

//==================================================================

/**
 * org get broiler logs by cycle
 * @returns
 */
const _getBroilerLogsRequest = async (
  cycle: string
): Promise<ApiResponse<{ message: string; broiler_logs: BroilerLog[] }>> => {
  const { data } = await axios.get(`broiler_logs/${cycle}`);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetBroilerLogsQuery = (cycle: string) =>
  useQuery({
    queryKey: ["broiler_logs", cycle],
    queryFn: () => _getBroilerLogsRequest(cycle)
  });

/**
 * org create house record
 * @returns
 */
const _createBroilerLogRequest = async (
  cycle: string,
  payload: CreateBroilerLogPayload
): Promise<ApiResponse<{ message: string; broiler_logs: BroilerLog }>> => {
  const { data } = await axios.post(`broiler_logs/create/${cycle}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreateBroilerLogMutation = () => {
  const queryClient = useQueryClient();

  const creatBroilerLogMutation = useMutation({
    mutationFn: ({
      cycle,
      payload
    }: {
      cycle: string;
      payload: CreateBroilerLogPayload;
    }) => _createBroilerLogRequest(cycle, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["broiler_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return creatBroilerLogMutation;
};

/**
 * org update cycles
 * @returns
 */
const _updateBroilerLogRequest = async (
  id: string,
  payload: CreateBroilerLogPayload
): Promise<ApiResponse<{ message: string; cycle: BroilerLog }>> => {
  const { data } = await axios.put(`broiler_logs/update/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useUpdateBroilerLogMutation = () => {
  const queryClient = useQueryClient();

  const updateBroilerLogMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: CreateBroilerLogPayload;
    }) => _updateBroilerLogRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["broiler_logs"] });
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return updateBroilerLogMutation;
};
