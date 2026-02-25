import * as readline from "readline";
import type { Activity, Trip, } from './models';
import {createTrip} from './services/destinationService'
import {engine} from './services/destinationService'
import {v4 as uuidv4} from 'uuid'
import { calculateTotalCost, getHighCostActivities } from './services/budgetService';


const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let currentTrip: Trip | null = null;

function ask(question: string): Promise<string> {
  process.stdout.write(`${question} `);
  return new Promise(resolve => rl.once('line', line => resolve(line)));
};

async function mainMenu() {
  console.log('\n 🌍 Trip Planner Menu ===');
  console.log('1. Create trip');
  console.log('2. Add Activity');
  console.log('3. View Activities by Day');
  console.log('4. View Sorted Activities');
  console.log('5. Filter Activities by Category');
  console.log('6. View Total Trip Cost');
  console.log('7. Show High Cost Activities');
  console.log('8. Show All Trips');
  console.log('9. Exit');
  
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
        await calculateCLI();
        break;
      case '7':
        await highCostActivitiesCLI();
        break;
      case '8':
        console.log("Trips", JSON.stringify(engine.getTrips(), null, 2))
        break;
      case '9':
        console.log('👋 Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Enter a number 1–9.');
    }

    // re-print menu after each action
    console.log('\n 🌍 Trip Planner Menu ===');
    console.log('1. Create trip');
    console.log('2. Add Activity');
    console.log('3. View Activities by Day');
    console.log('4. View Sorted Activities');
    console.log('5. Filter Activities by Category');
    console.log('6. View Total Trip Cost');
    console.log('7. Show High Cost Activities');     
    console.log('8. All trips');
    console.log('9. Exit');
  }
}

const createTripCLI = async () => {
  const destination = await ask("Destination: ")
  const date = await ask("Date (YYYY-MM-DD): ")
  currentTrip = await createTrip(destination.trim(), date.trim())
  console.log('✅ Trip created successfully');
}

const addActivityCLI = async () => {
  if (!currentTrip) {
    console.log('No trip found. Let\'s create one now.');
    createTripCLI()
  }

  const name = await ask('Activity Name:');
  const costStr = await ask('Cost:');
  const cost = Number(costStr);
  if (isNaN(cost)) {
    console.log('❌ Invalid cost.');
    return;
  }

  const category = (await ask('Category (food/transport/sightseeing):'))
  .trim() as Activity['category'];
  const time = await ask('Time (HH:MM):');
  const date = await ask('Date (YYYY-MM-DD):');

  const startTime = new Date (`${date.trim()}T${time.trim()}`);
  
  const activity: Activity = {
    id: uuidv4(), 
    name: name.trim(), 
    cost, 
    category, 
    startTime
  };

  engine.addActivity(currentTrip!, activity)
  console.log('✅ Activity added')
};

const viewByDayCLI = async () => {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const date = await ask('Enter date (YYYY-MM-DD):');
  const activities = engine.getActivitiesByDay(currentTrip, date.trim());
  console.log('Activities:', activities);
}

const viewSortedCLI = async() => {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const sorted = engine.getActivitiesSorted(currentTrip);
  console.log('Sorted Activities:', sorted);
}

const filterByCategoryCLI = async() => {
  if (!currentTrip) {
    console.log('Create a trip first.');
    return;
  }

  const category = 
  (await ask('Category (food/transport/sightseeing):')).trim() as Activity['category'];
  const filtered = engine.filterActivitiesByCategory(currentTrip, category);
  console.log('Filtered Activities:', filtered);
}

const calculateCLI = () =>{
  if(!currentTrip){
    console.log('Create a trip first')
    return
  }

  const total = calculateTotalCost(currentTrip)
  console.log(`\n 💰 Total Trip Cost: $${total}`)
}

const highCostActivitiesCLI = async () => {
  if(!currentTrip){
    console.log('Create a trip first')
    return;
  }

  const thresholdStr = await ask('Enter cost threshold: ');
  const threshold = Number(thresholdStr);

  if (isNaN(threshold)) {
  console.log('❌ Invalid number');
  return
  } 

  const highCostActivities = getHighCostActivities(currentTrip, threshold);
  console.log(`\n🔥 Activities above $${threshold}:`);
  highCostActivities.forEach(a =>
  console.log(`- ${a.name} ($${a.cost})`)
  );
  console.log(`💰 Total: ${highCostActivities.length}`);
  }

mainMenu().catch(err => {
  console.error(err);
  rl.close();
});
