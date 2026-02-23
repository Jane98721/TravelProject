"use strict";
//Itinerary Service 
/*import * as readline from "readline";
import { ItineraryEngine } from './services/itineraryService';
import type { Activity, Trip } from '../models';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const engine = new ItineraryEngine();
let currentTrip: Trip | null = null;

function ask(question: string): Promise<string> {
  process.stdout.write(`${question} `);
  return new Promise(resolve => rl.once('line', line => resolve(line)));
}

async function mainMenu() {
  console.log('\nTrip Planner Menu ===');
  console.log('1. Add Activity');
  console.log('2. View Activities by Day');
  console.log('3. View Sorted Activities');
  console.log('4. Filter Activities by Category');
  console.log('5. Exit');

  while (true) {
    const choice = (await ask('\nChoose an option:')).trim();

    switch (choice) {
      case '1':
        await addActivityCLI();
        break;
      case '2':
        await viewByDayCLI();
        break;
      case '3':
        await viewSortedCLI();
        break;
      case '4':
        await filterByCategoryCLI();
        break;
      case '5':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Enter a number 1–5.');
    }

    // re-print menu after each action
    console.log('\nTrip Planner Menu ===');
    console.log('1. Add Activity');
    console.log('2. View Activities by Day');
    console.log('3. View Sorted Activities');
    console.log('4. Filter Activities by Category');
    console.log('5. Exit');
  }
}

async function createTripCLI() {
  const destination = await ask('Destination:');
  const startDate = await ask('Start Date (YYYY-MM-DD):');
  currentTrip = engine.createTrip(destination.trim(), startDate.trim());
  console.log('Trip created successfully!');
}

async function addActivityCLI() {
  if (!currentTrip) {
    console.log('No trip found. Let\'s create one now.');
    const destination = await ask('Destination:');
    const startDate = await ask('Start Date (YYYY-MM-DD):');
    currentTrip = engine.createTrip(destination.trim(), startDate.trim());
    console.log('Trip created successfully!');
  }

  const name = await ask('Activity Name:');
  const costStr = await ask('Cost:');
  const cost = Number(costStr);
  if (isNaN(cost)) {
    console.log('Invalid cost.');
    return;
  }
  const category = (await ask('Category (food/transport/sightseeing):')).trim() as Activity['category'];
  const time = await ask('Time (HH:MM):');
  const date = await ask('Date (YYYY-MM-DD):');

  engine.addActivity(currentTrip, { name: name.trim(), cost, category, time: time.trim(), date: date.trim() });
  console.log('Activity added!');
}

async function viewByDayCLI() {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const date = await ask('Enter date (YYYY-MM-DD):');
  const activities = engine.getActivitiesByDay(currentTrip, date.trim());
  console.log('Activities:', activities);
}

async function viewSortedCLI() {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const sorted = engine.getActivitiesSorted(currentTrip);
  console.log('Sorted Activities:', sorted);
}

async function filterByCategoryCLI() {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const category = (await ask('Category (food/transport/sightseeing):')).trim() as Activity['category'];
  const filtered = engine.filterActivitiesByCategory(currentTrip, category);
  console.log('Filtered Activities:', filtered);
}

mainMenu().catch(err => {
  console.error(err);
  rl.close();
});*/ 
