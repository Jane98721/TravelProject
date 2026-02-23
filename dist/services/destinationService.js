"use strict";
//Destination Service 
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
exports.getTrips = exports.createTrip = exports.getDestinationInfo = void 0;
const uuid_1 = require("uuid");
const readline = __importStar(require("readline"));
const models_1 = require("../models");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//const trips: Trip[] = []
const getDestinationInfo = async (countryName) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        return {
            currency: Object.keys(data[0].currencies)[0] ?? 'USD',
            flag: data[0].flag ?? undefined
        };
    }
    catch (error) {
        throw new Error('Could not fetch country data');
    }
};
exports.getDestinationInfo = getDestinationInfo;
const createTrip = async (destination, startDate) => {
    const countryInfo = await (0, exports.getDestinationInfo)(destination);
    const newTrip = {
        id: (0, uuid_1.v4)(),
        destination,
        startDate: new Date(),
        activities: [],
        currency: countryInfo.currency,
        flag: countryInfo.flag
    };
    models_1.trips.push(newTrip);
    return newTrip;
};
exports.createTrip = createTrip;
const getTrips = () => models_1.trips;
exports.getTrips = getTrips;
