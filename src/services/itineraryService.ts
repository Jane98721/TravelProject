import { Trip, Activity} from '../models'

export class ItineraryEngine {
  private trips: Trip[] = [];

  addTrip(trip: Trip){
    this.trips.push(trip)
  }

  addActivity(trip: Trip, activity: Activity): void {
    trip.activities.push(activity);
  }

  getActivitiesByDay(trip: Trip, date: string): Activity[] {
    return trip.activities.filter(a => a.startTime.toISOString().startsWith(date));
  }

  getActivitiesSorted(trip: Trip): Activity[] {
    return [...trip.activities].sort((a, b) =>  
      a.startTime.getTime() - b.startTime.getTime()
    );
  }

  filterActivitiesByCategory(trip: Trip, category: Activity["category"]): Activity[] {
    return trip.activities.filter(a => a.category === category);
  }

  getTrips(): Trip[] {
    return this.trips;
  }
};
