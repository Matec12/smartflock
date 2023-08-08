export interface Cycle {
  _id: string;
  name: string;
  description: string;
  organization: string;
  birdType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateCyclePayload = Omit<
  Cycle,
  "isActive" | "isDeleted" | "createdAt" | "updatedAt"
>;
