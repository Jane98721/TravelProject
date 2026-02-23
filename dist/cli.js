"use strict";
//Menu loop, code given by instructions for the CLI interface, and handling user input. 
// This is where the user will interact with the application and make choices about what they want to do.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// cli.ts
const readline = __importStar(require("readline"));
const models_1 = require("./models");
//import { createTrip } from './services/itineraryService.js';
const budgetService_1 = require("./services/budgetService");
const destinationService_1 = require("./services/destinationService");
// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Helper to wrap rl.question into a promise
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));
// ================= MENU =================
const showMenu = async () => {
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
const handleAction = async (choice) => {
    switch (choice) {
        case '1': {
            const destination = await ask('Destination: ');
            const startDateStr = await ask('Start Date (YYYY-MM-DD): ');
            const startDate = new Date(startDateStr);
            await (0, destinationService_1.createTrip)(destination, startDate);
            console.log('✅ Trip created successfully!');
            break;
        }
        case '2': {
            if (!models_1.trips.length) {
                console.log('No trips created yet.');
            }
            else {
                models_1.trips.forEach((trip) => console.log(`${trip.destination} (${trip.startDate.toDateString()})`));
            }
            break;
        }
        case '3': {
            if (!models_1.trips.length) {
                console.log('No trips to calculate budget.');
            }
            else {
                const trip = models_1.trips[0]; // Example: first trip
                console.log(`Total cost: ${(0, budgetService_1.calculateTotalCost)(trip)}`);
                console.log(`High cost activities (>100): ${(0, budgetService_1.getHighCostActivities)(trip, 100).length}`);
            }
            break;
        }
        case '4': {
            const country = await ask('Country name: ');
            const info = await (0, destinationService_1.getDestinationInfo)(country);
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
