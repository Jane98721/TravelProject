"use strict";
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
exports.selectTrip = selectTrip;
// Cli Budget
const readline = __importStar(require("readline"));
const models_1 = require("./models");
const budgetService_1 = require("./services/budgetService");
const uuid_1 = require("uuid");
// Creating readline interface for user input and output in the console.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (question) => new Promise(resolve => rl.question(question, resolve));
// Creating helper function to select a trip, which is used in multiple actions. 
// It checks if there are any trips available and returns the first one, 
// or throws an error if no trips exist.
function selectTrip() {
    const trip = models_1.trips[0];
    if (!trip) {
        throw new Error('No trips available. Create a trip first.');
    }
    return trip;
}
// Creating main menu function to display options to the user and handle their choice.
async function showMenu() {
    console.log('\n🌍 Travel Planner CLI');
    console.log('1. Create Trip');
    console.log('2. Add Activity');
    console.log('3. View Total Trip Cost');
    console.log('4. Show High Cost Activities');
    console.log('5. Exit \n');
    const choice = await ask('Choose an option: ');
    await handleAction(choice.trim());
}
// ================= ACTIONS =================
const handleAction = async (choice) => {
    switch (choice) {
        case '1': {
            console.clear();
            const destination = await ask('Trip Destination: ');
            const trip = {
                id: (0, uuid_1.v4)(),
                destination: destination.trim(),
                startDate: new Date(), // Date is not a string
                activities: [],
                currency: '',
                flag: ''
            };
            models_1.trips.push(trip);
            console.log('✅ Trip created!');
            break;
        }
        case '2': {
            try {
                const trip = selectTrip();
                const name = await ask('Activity Name: ');
                const costStr = await ask('Activity Cost: ');
                const cost = Number(costStr);
                if (!name.trim() || isNaN(cost)) {
                    console.log('❌ Invalid name or cost');
                    break;
                }
                const activity = {
                    id: (0, uuid_1.v4)(),
                    name: name.trim(),
                    cost,
                    category: 'sightseeing', // default
                    startTime: new Date()
                };
                trip.activities.push(activity);
                console.log('✅ Activity added!');
            }
            catch (error) {
                console.log(`⚠️ ${error.message}`);
            }
            break;
        }
        case '3': {
            try {
                const trip = selectTrip();
                const total = (0, budgetService_1.calculateTotalCost)(trip);
                console.log(`\n💰 Total Trip Cost: $${total}`);
            }
            catch (error) {
                console.log(`⚠️ ${error.message}`);
            }
            break;
        }
        case '4': {
            try {
                const trip = selectTrip();
                const thresholdStr = await ask('Enter cost threshold: ');
                const threshold = Number(thresholdStr);
                if (isNaN(threshold)) {
                    console.log('❌ Invalid number');
                    break;
                }
                const highCostActivities = (0, budgetService_1.getHighCostActivities)(trip, threshold);
                console.log(`\n🔥 Activities above $${threshold}:`);
                highCostActivities.forEach(a => console.log(`- ${a.name} ($${a.cost})`));
                console.log(`Total: ${highCostActivities.length}`);
            }
            catch (error) {
                console.log(`⚠️ ${error.message}`);
            }
            break;
        }
        case '5':
            console.log('👋 Goodbye!');
            rl.close();
            process.exit(0);
        default:
            console.log('❌ Invalid option');
    }
    await showMenu();
};
// ================= START APP =================
console.log('Welcome to the Travel Planner CLI!');
showMenu();
