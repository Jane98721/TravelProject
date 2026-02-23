//Menu loop, code given by instructions for the CLI interface, and handling user input. 
// This is where the user will interact with the application and make choices about what they want to do.

// cli.ts
import * as readline from 'readline';
import { trips, type Trip, type Activity } from './models';
//import { createTrip } from './services/itineraryService.js';
import { calculateTotalCost, getHighCostActivities } from './services/budgetService';
import { createTrip, getDestinationInfo } from './services/destinationService';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper to wrap rl.question into a promise
const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

// ================= MENU =================
const showMenu = async (): Promise<void> => {
  console.clear();
  console.log('🌍 Travel Planner App');
  console.log('Plan your trip step by step');
  console.log('-'.repeat(50));
  console.log(`
1. Create Trip
2. View Trips
3. View Budget
4. Destination Info
5. Exit
`);

  const choice = await ask('Choose an option: ');
  await handleAction(choice.trim());
};

// ================= ACTION HANDLER =================
const handleAction = async (choice: string): Promise<void> => {
  switch (choice) {
    case '1': {
      const destination = await ask('Destination: ');
      const startDateStr = await ask('Start Date (YYYY-MM-DD): ');
      const startDate = new Date(startDateStr);

      await createTrip(destination, startDate);
      console.log('✅ Trip created successfully!');
      break;
    }

    case '2': {
      if (!trips.length) {
        console.log('No trips created yet.');
      } else {
        trips.forEach((trip) =>
          console.log(`${trip.destination} (${trip.startDate.toDateString()})`)
        );
      }
      break;
    }

    case '3': {
      if (!trips.length) {
        console.log('No trips to calculate budget.');
      } else {
        const trip = trips[0]; // Example: first trip
        console.log(`Total cost: ${calculateTotalCost(trip)}`);
        console.log(
          `High cost activities (>100): ${getHighCostActivities(trip, 100).length}`
        );
      }
      break;
    }

    case '4': {
      const country = await ask('Country name: ');
      const info = await getDestinationInfo(country);
      console.log(`Currency: ${info.currency}`);
      console.log(`Flag: ${info.flag}`);
      break;
    }

    case '5':
      console.log('Goodbye! 👋');
      rl.close();
      process.exit(0);

    default:
      console.log('❌ Invalid option. Please choose 1-5.');
  }

  await ask('\nPress Enter to continue...');
  await showMenu();
};

// ================= START APP =================
console.log('Welcome to Travel Planner CLI!');
showMenu();


