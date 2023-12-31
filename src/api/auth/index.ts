import axios from "..";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RegisterPayload, ResetPasswordPayload } from "./types";

/**
 * communicates with resend email service.
 * @route "/user/verify_email"
 * @param payload
 */

const _resendEmailRequest = async (
  payload: Pick<RegisterPayload, "email">
): Promise<ApiResponse> => {
  const { data } = await axios.post("users/resend-verification-token", payload);
  return data;
};

/**
 * mutation wrapper hook for request
 * @returns
 */

export const useResendEmailMutation = () => {
  const resendEmailMutation = useMutation(_resendEmailRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (error: RequestError) => {
      error.response && toast.error(error.response?.data.error);
    }
  });

  return resendEmailMutation;
};

/**
 * communicates with verify email service.
 * @route "/user/verify_email"
 * @param token
 * @returns {ApiResponse}
 */

const _verifyEmailRequest = async (token: string): Promise<ApiResponse> => {
  const { data } = await axios.get(`users/confirm/${token}`);
  return data;
};

/**
 * mutation wrapper hook for request
 * @returns
 */

export const useVerifyEmailMutation = () => {
  const verifyEmailMutation = useMutation(_verifyEmailRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
      setTimeout(() => {
        window.location.pathname = "/dashboard/overview";
      }, 2000);
    },
    onError: (error: RequestError) => {
      error.response && toast.error(error.response?.data.error);
    }
  });

  return verifyEmailMutation;
};

/**
 * communicates with forgot password service.
 * @route "/user/forgot_password"
 * @param payload
 */

const _forgotPasswordRequest = async (
  payload: Pick<RegisterPayload, "email">
): Promise<ApiResponse> => {
  const { data } = await axios.post("password", payload);
  return data;
};
/**
 * mutation wrapper hook for request
 * @returns
 */

export const useForgotPasswordMutation = () => {
  const forgotPasswordMutation = useMutation(_forgotPasswordRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return forgotPasswordMutation;
};

/**
 * communicates with forgot password service.
 * @route "/user/forgot_password"
 * @param payload
 */

const _resetPasswordRequest = async (
  payload: ResetPasswordPayload
): Promise<ApiResponse> => {
  const { data } = await axios.post(`password/reset`, payload);
  return data;
};
/**
 * mutation wrapper hook for request
 * @returns
 */

export const useResetPasswordMutation = () => {
  const resetPasswordMutation = useMutation(_resetPasswordRequest, {
    onSuccess: (data) => {
      toast.success(data.payload.message);
      setTimeout(() => {
        window.location.pathname = "/auth/login";
      }, 2000);
    },
    onError: (error: RequestError) => {
      error?.response && toast.error(error.response?.data?.error);
    }
  });

  return resetPasswordMutation;
};
