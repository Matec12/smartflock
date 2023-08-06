enum UserRole {
  "organization_admin",
  "organization_staff",
  "admin"
}

interface User {
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

type RegisterPayload = {
  username: string;
  fullname: string;
  email: string;
  organizationName: string;
  password: string;
  confirmPassword: string;
};

type LoginPayload = {
  email: string;
  password: string;
};
