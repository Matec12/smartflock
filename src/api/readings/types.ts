export interface Reading {
  _id: string;
  value: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentReading {
  _id: string;
  tempValue: number;
  humValue: number;
  gasValue: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}
