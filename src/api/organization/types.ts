import { User } from "../auth/types";

export interface Organization {
  _id: string;
  name: string;
  admin: User;
  createdAt: Date;
  updatedAt: Date;
}
