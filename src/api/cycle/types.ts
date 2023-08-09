export interface BirdType {
  _id: string;
  name: string;
  description: string;
  birdId: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Cycle {
  _id: string;
  name: string;
  description?: string;
  organization: string;
  birdType: BirdType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetCycleParams = {
  cycleId?: string;
  startDate?: string;
  endDate?: string;
};

export type CreateCyclePayload = Omit<
  Cycle,
  "_id" | "isActive" | "isDeleted" | "createdAt" | "updatedAt" | "birdType"
> & {
  birdType: string;
};

export interface EggsProduction {
  produced: number;
  sold: number;
  balanceCarriedForward: number;
}

export interface CashBalance {
  cashInHand: number;
  sales: number;
  expenses: number;
  balance: number;
}

export interface DailyAccountLog {
  _id: string;
  date: string;
  eggsProduced: number;
  eggsStock: number;
  eggsProduction: EggsProduction;
  cashBalance: CashBalance;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseRecordEggsProduction {
  number: number;
  percentage: number;
}

export interface StockOfBirds {
  mortality: number;
  balance: number;
}

export interface HouseRecordLog {
  _id: string;
  cycle: string;
  date: string;
  ageOfBirds?: number;
  eggsProduction?: HouseRecordEggsProduction;
  feedConsumption?: number;
  stockOfBirds?: StockOfBirds;
  drugVaccineUsed?: string;
  managementRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BroilerLog {
  _id: string;
  cycle: string;
  date: string;
  numberOfBirds: number;
  mortality: number;
  culls: number;
  feed: number;
  cumulativeFeed: number;
  weeklyWeightGain: number;
  drugsVaccinationCost: number;
  costOfFeeding: number;
  costOfLabour: number;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateDailyAccountLogPayload = Omit<
  Cycle,
  "_id" | "createdAt" | "updatedAt"
>;

export type CreateHouseRecordLogPayload = Omit<
  Cycle,
  "_id" | "createdAt" | "updatedAt"
>;

export type CreateBroilerLogPayload = Omit<
  Cycle,
  "_id" | "createdAt" | "updatedAt"
>;
