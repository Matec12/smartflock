import axios from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Organization } from "./types";
import { RegisterPayload, User, UserRole } from "../auth/types";
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
export const useGetOrganizationsQuery = (user: User) =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => _getOrganizationsRequest(),
    enabled: user.role === UserRole.Admin
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
    enabled: user.role === UserRole.Admin
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
    enabled: user.role === UserRole.OrgAdmin
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
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
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
export const useGetOrganizationsStaffsQuery = () =>
  useQuery({
    queryKey: ["staffs"],
    queryFn: () => _getOrganizationStaffsRequest()
  });

// ====================================

/**
 * ord create cycles
 * @returns
 */
const _createOrganizationStaffRequest = async (
  payload: RegisterPayload
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
  const createOrganizationStaffMutation = useMutation(
    _createOrganizationStaffRequest,
    {
      onSuccess: (data) => {
        toast.success(data.payload.message);
      },
      onError: (error: RequestError) => {
        error?.response && toast.error(error.response?.data?.error);
      }
    }
  );

  return createOrganizationStaffMutation;
};

// ====================================

/**
 * current toggle staff access
 * @returns
 */
const _toggleOrganizationStaffRequest = async (): Promise<
  ApiResponse<{ message: string; staffs: User[] }>
> => {
  const { data } = await axios.post(`users/toggle-staff-access`);
  return data;
};

/**
 * hook wrapper
 * @param
 * @returns
 */
export const useToggleOrganizationsStaffsQuery = () => {
  const toggleOrganizationStaffMutation = useMutation(
    _toggleOrganizationStaffRequest,
    {
      onSuccess: (data) => {
        toast.success(data.payload.message);
      },
      onError: (error: RequestError) => {
        error?.response && toast.error(error.response?.data?.error);
      }
    }
  );

  return toggleOrganizationStaffMutation;
};
