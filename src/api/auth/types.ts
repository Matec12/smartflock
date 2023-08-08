export enum UserRole {
  OrgAdmin = "organization_admin",
  OrgStaff = "organization_staff",
  Admin = "admin"
}

export const isOrganization = (user: User) =>
  user.role === UserRole.OrgAdmin || user.role === UserRole.OrgStaff;

export interface User {
  id: string;
  email: string;
  username: string;
  fullname: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  organizationName: string;
  organizationId: string;
}

export type RegisterPayload = {
  username: string;
  fullname: string;
  email: string;
  organizationName: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordPayload = {
  token: string;
} & Pick<RegisterPayload, "password" | "confirmPassword">;

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
