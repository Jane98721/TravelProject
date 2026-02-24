"use strict";
//BUDGET SERVICE
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHighCostActivities = exports.calculateTotalCost = void 0;
//Function receive the object trip and return the number with the cost of the trip.
// Function to calculate the total cost of a trip by summing up the cost of all activities.
//Export is used the function to be used in other files. 
// It uses the reduce method reduce array in one value.
//Trip.activities is the array of Activity.
const calculateTotalCost = (trip) => {
    return trip.activities.reduce((sum, activity) => sum + activity.cost, 0);
};
exports.calculateTotalCost = calculateTotalCost;
// Function that receive a trip, one value limit (treshold), and return of an array of Activity.
//Filter to return only the activities that have a cost higher than the threshold.
const getHighCostActivities = (trip, threshold) => {
    return trip.activities.filter((activity) => activity.cost > threshold);
};
exports.getHighCostActivities = getHighCostActivities;
//console.log('Budget service loaded \n');
//console.log(`Total Cost is: ${calculateTotalCost(trips[0])}\n`);
//console.log('High cost activities: ' + getHighCostActivities(trips[0], 100).length + '\n');
