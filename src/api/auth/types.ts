export enum UserRole {
  OrgAdmin = "organization_admin",
  OrgStaff = "organization_staff",
  Admin = "admin"
}

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

export const isOrganization = (user: User) =>
  user.role === UserRole.OrgAdmin || user.role === UserRole.OrgStaff;

export const isAdmin = (user: User) => user.role === UserRole.Admin;

export const isOrganizationAdmin = (user: User) =>
  user.role === UserRole.OrgAdmin;

export const isOrganizationStaff = (user: User) =>
  user.role === UserRole.OrgStaff;
