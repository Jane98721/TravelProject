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
const readline = __importStar(require("readline"));
const models_1 = require("./models");
const budgetService_1 = require("./services/budgetService");
// ================= READLINE =================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (question) => new Promise(resolve => rl.question(question, resolve));
// ================= MENU =================
const showMenu = async () => {
    console.log('\n💰 Budget Menu');
    console.log('1. Add Activity');
    console.log('2. View Total Trip Cost');
    console.log('3. Show High Cost Activities');
    console.log('4. Exit');
    const choice = await ask('\nChoose an option: ');
    await handleAction(choice);
};
// ================= ACTIONS =================
const handleAction = async (choice) => {
    if (!models_1.trips.length) {
        // create a default trip automatically
        models_1.trips.push({
            id: '1',
            destination: 'My Trip',
            startDate: new Date(),
            activities: [],
            currency: '',
            flag: ''
        });
    }
    const trip = models_1.trips[0];
    switch (choice.trim()) {
        // Adding activity to the trip, with default values for category and start time, as per instructions.
        case '1': {
            const name = await ask('Activity name: ');
            const cost = Number(await ask('Cost: '));
            if (isNaN(cost)) {
                console.log('❌ Invalid cost');
                break;
            }
            trip.activities.push({
                id: crypto.randomUUID(),
                name,
                cost,
                category: 'sightseeing', // default value
                startTime: new Date() // default value
            });
            console.log('✅ Activity added!');
            break;
        }
        case '2': {
            const total = (0, budgetService_1.calculateTotalCost)(trip);
            console.log(`\n✅ Total Cost: ${total}`);
            break;
        }
        case '3': {
            const value = await ask('Enter cost threshold: ');
            const threshold = Number(value);
            if (isNaN(threshold)) {
                console.log('❌ Invalid number');
                break;
            }
            const activities = (0, budgetService_1.getHighCostActivities)(trip, threshold);
            console.log(`\n🔥 Activities above ${threshold}:`);
            activities.forEach(a => console.log(`- ${a.name} ($${a.cost})`));
            console.log(`Total: ${activities.length}`);
            break;
        }
        case '4':
            console.log('\nGoodbye 👋');
            rl.close();
            process.exit(0);
        default:
            console.log('❌ Invalid option');
    }
    await showMenu();
};
// ================= START =================
console.log('🌍 Travel Planner Budget CLI');
showMenu();
