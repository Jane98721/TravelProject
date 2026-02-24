import * as readline from "readline";
import type { Activity, Trip } from './models';
import {createTrip} from './services/destinationService'
import {engine} from './services/destinationService'
import {v4 as uuidv4} from 'uuid'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let currentTrip: Trip | null = null;

function ask(question: string): Promise<string> {
  process.stdout.write(`${question} `);
  return new Promise(resolve => rl.once('line', line => resolve(line)));
}

async function mainMenu() {
  console.log('\nTrip Planner Menu ===');
  console.log('1. Create trip');
  console.log('2. Add Activity');
  console.log('3. View Activities by Day');
  console.log('4. View Sorted Activities');
  console.log('5. Filter Activities by Category');
  console.log('6. Show All Trips');
  console.log('7. Exit');

  while (true) {
    const choice = (await ask('\nChoose an option:')).trim();

    switch (choice) {
      case '1':
        await createTripCLI();
        break;
      case '2':
        await addActivityCLI();
        break;
      case '3':
        await viewByDayCLI();
        break;
      case '4':
        await viewSortedCLI();
        break;
      case '5':
        await filterByCategoryCLI();
        break;
      case '6':
        console.log("Trips", JSON.stringify(engine.getTrips(), null, 2))
        break;
      case '7':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Enter a number 1–7.');
    }

    // re-print menu after each action
    console.log('\nTrip Planner Menu ===');
    console.log('1. Create trip');
    console.log('2. Add Activity');
    console.log('3. View Activities by Day');
    console.log('4. View Sorted Activities');
    console.log('5. Filter Activities by Category');    
    console.log('6. All trips');
    console.log('7. Exit');
  }
}

async function createTripCLI(){
  const destination = await ask("Destination: ")
  currentTrip = await createTrip(destination.trim())
  console.log('Trip created succesfully')
}
async function addActivityCLI() {
  if (!currentTrip) {
    console.log('No trip found. Let\'s create one now.');
    createTripCLI()
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

  const startTime = new Date (`${date.trim()}T${time.trim()}`)
  
  const activity: Activity = {
    id: uuidv4(), 
    name: name.trim(), 
    cost, 
    category, 
    startTime,
  } 
  engine.addActivity(currentTrip!, activity)
  console.log('Activity added')
};

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
});