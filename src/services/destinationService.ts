//Destination Service 

import type {Trip} from '../models';
import {v4 as uuidv4} from 'uuid';
import * as readline from 'readline'
import { trips } from '../models';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout 
})

//const trips: Trip[] = []

export const getDestinationInfo = async (countryName: string) => {
  try {
    const response = await fetch 
    (`https://restcountries.com/v3.1/name/${countryName}`)
    const data = await response.json()
    return {
      currency: Object.keys(data[0].currencies)[0] ?? 'USD',
      flag: data[0].flag ?? undefined
    }
  } catch (error){
    throw new Error ('Could not fetch country data')
  }
}

export const createTrip = async (destination: string, startDate?: Date): Promise<Trip> => {
  const countryInfo = await getDestinationInfo(destination)
  const newTrip: Trip = {
    id: uuidv4(),
    destination,
    startDate: new Date(),
    activities: [],
    currency: countryInfo.currency,
    flag: countryInfo.flag
  }
    trips.push(newTrip)
    return newTrip 
}

export const getTrips = (): Trip[] => trips