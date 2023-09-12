export interface Reading {
  _id: string;
  value: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface HumTempReading {
  _id: string;
  tempValue: number;
  humValue: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}
