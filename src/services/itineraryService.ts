import { Trip, Activity } from "../models";

export class ItineraryEngine {
  private trips: Trip[] = [];

  createTrip(destination: string, startDate: string): Trip {
    const newTrip: Trip = { destination, startDate, activities: [] };
    this.trips.push(newTrip);
    return newTrip;
  }

  addActivity(trip: Trip, activity: Activity): void {
    trip.activities.push(activity);
  }

  getActivitiesByDay(trip: Trip, date: string): Activity[] {
    return trip.activities.filter(a => a.date === date);
  }

  getActivitiesSorted(trip: Trip): Activity[] {
    return [...trip.activities].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  filterActivitiesByCategory(trip: Trip, category: Activity["category"]): Activity[] {
    return trip.activities.filter(a => a.category === category);
  }

  getTrips(): Trip[] {
    return this.trips;
  }
}
