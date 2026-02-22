// Domain models for the travel planner

export type ActivityCategory = "food" | "transport" | "sightseeing";

export interface Activity {
  name: string;
  cost: number;
  category: ActivityCategory;
  time: string; // HH:MM
  date: string; // YYYY-MM-DD
}

export interface Trip {
  destination: string;
  startDate: string; // YYYY-MM-DD
  activities: Activity[];
}
