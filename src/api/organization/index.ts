import axios from "..";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Organization } from "./types";
import {
  LoginPayload,
  RegisterPayload,
  User,
  isAdmin,
  isOrganizationAdmin
} from "../auth/types";
import { toast } from "react-hot-toast";

/**
 * admin get all orgs
 * @returns
 */
const _getOrganizationsRequest = async (): Promise<
  ApiResponse<{ message: string; organizations: Organization[] }>
> => {
  const { data } = await axios.get("organizations");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetOrganizationsQuery = (user: User | null) =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => _getOrganizationsRequest(),
    enabled: user ? isAdmin(user) : false
  });

// ====================================

/**
 * admin get org details
 * @param organizationId
 * @returns
 */
const _adminGetOrganizationsDetailsRequest = async (
  organizationId: string
): Promise<ApiResponse<{ message: string; organization: Organization }>> => {
  const { data } = await axios.get(`organizations/${organizationId}`);
  return data;
};

/**
 *hook wrapper
 * @param user
 * @param organization
 * @returns
 */
export const useAdminGetOrganizationsDetailsQuery = (
  user: User,
  organization: string
) =>
  useQuery({
    queryKey: ["organization", organization],
    queryFn: () => _adminGetOrganizationsDetailsRequest(organization),
    enabled: user ? isAdmin(user) : false
  });

// ====================================

/**
 * org get org details
 * @returns
 */
const _orgGetOrganizationsDetailsRequest = async (): Promise<
  ApiResponse<{ message: string; organizations: Organization }>
> => {
  const { data } = await axios.get(`organizations/my-organization`);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useOrgGetOrganizationsDetailsQuery = (user: User) =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => _orgGetOrganizationsDetailsRequest(),
    enabled: user ? isOrganizationAdmin(user) : false
  });

// ====================================

/**
 * current user get my org
 * @returns
 */
const _userGetOrganizationsDetailsRequest = async (): Promise<
  ApiResponse<{ message: string; organizations: Organization }>
> => {
  const { data } = await axios.get(`organizations/current`);
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useUserGetOrganizationsDetailsQuery = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => _userGetOrganizationsDetailsRequest()
  });

// ====================================

/**
 * org update org
 * @returns
 */
const _updateOrganizationRequest = async (
  id: string,
  payload: Pick<Organization, "name">
): Promise<ApiResponse> => {
  const { data } = await axios.put(`organizations/${id}`, payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useUpdateOrganizationMutation = () => {
  const updateOrganizationMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: Pick<Organization, "name">;
    }) => _updateOrganizationRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (err: RequestError) => {
      err.response && toast.error(err?.response?.data.error);
    }
  });

  return updateOrganizationMutation;
};

// ====================================

/**
 * get org staffs
 * @returns
 */
const _getOrganizationStaffsRequest = async (): Promise<
  ApiResponse<{ message: string; staffs: User[] }>
> => {
  const { data } = await axios.get(`organizations/get-staffs`);
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useGetOrganizationsStaffsQuery = (user: User | null) =>
  useQuery({
    queryKey: ["staffs"],
    queryFn: () => _getOrganizationStaffsRequest(),
    enabled: user ? isOrganizationAdmin(user) : false
  });

// ====================================

/**
 * ord create cycles
 * @returns
 */
const _createOrganizationStaffRequest = async (
  payload: Omit<RegisterPayload, "organizationName">
): Promise<ApiResponse<{ message: string; staff: User }>> => {
  const { data } = await axios.post("organizations/add-staff", payload);
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useCreateOrganizationStaffMutation = () => {
  const queryClient = useQueryClient();

  const createOrganizationStaffMutation = useMutation(
    _createOrganizationStaffRequest,
    {
      onSuccess: (data) => {
        toast.success(data.payload.message);
        queryClient.invalidateQueries({ queryKey: ["staffs"] });
      },
      onError: (err: RequestError) => {
        err.response && toast.error(err?.response?.data.error);
      }
    }
  );

  return createOrganizationStaffMutation;
};

// ====================================

/**
 * current reset staff password
 * @returns
 */
const _resetOrganizationStaffPasswordRequest = async (
  userId: string,
  payload: Pick<LoginPayload, "email">
): Promise<ApiResponse<{ message: string; staffs: User[] }>> => {
  const { data } = await axios.post(
    `password/reset-staff-password/${userId}`,
    payload
  );
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useResetOrganizationsStaffPasswordsQuery = () => {
  const queryClient = useQueryClient();

  const resetOrganizationStaffPasswordMutation = useMutation({
    mutationFn: ({
      userId,
      payload
    }: {
      userId: string;
      payload: Pick<LoginPayload, "email">;
    }) => _resetOrganizationStaffPasswordRequest(userId, payload),
    onSuccess: (data) => {
      toast.success(data.payload.message);
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
    onError: (err: RequestError) => {
      err.response && toast.error(err?.response?.data.error);
    }
  });

  return resetOrganizationStaffPasswordMutation;
};

// ====================================

/**
 * current toggle staff access
 * @returns
 */
const _toggleOrganizationStaffRequest = async (
  userId: string
): Promise<ApiResponse<{ message: string; staffs: User[] }>> => {
  const { data } = await axios.put(`users/toggle-staff-access/${userId}`);
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useToggleOrganizationsStaffQuery = () => {
  const queryClient = useQueryClient();

  const toggleOrganizationStaffMutation = useMutation(
    _toggleOrganizationStaffRequest,
    {
      // mutationFn: ({ userId }: { userId: string }) =>
      //   _toggleOrganizationStaffRequest(userId),
      onSuccess: (data) => {
        toast.success(data.payload.message);
        queryClient.invalidateQueries({ queryKey: ["staffs"] });
      },
      onError: (err: RequestError) => {
        err.response && toast.error(err?.response?.data.error);
      }
    }
  );

  return toggleOrganizationStaffMutation;
};
