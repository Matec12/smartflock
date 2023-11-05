import { User } from "../auth/types";

export interface Organization {
  _id: string;
  name: string;
  address: string;
  admin: User;
  gasThreshold: number;
  humThreshold: number;
  tempThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}
