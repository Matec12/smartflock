import { User } from "../auth/types";

export interface Activity {
  _id: string;
  user: User;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GetActivityParams = {
  dateFrom?: string;
  dateTo?: string;
};
