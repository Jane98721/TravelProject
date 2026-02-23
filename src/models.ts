//Just the basic types given by the instructions of the project
export type Activity = {
  id: string;
  name: string;
  cost: number;
  category: 'food' | 'transport' | 'sightseeing';
  startTime: Date;
};
export type Trip = {
  id: string;
  destination: string;
  startDate: Date;
  activities: Activity[];
  currency: string;
  flag: string;
};

export const trips: Trip[] = []

