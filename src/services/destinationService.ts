import type {Trip} from '../models'
import {v4 as uuidv4} from 'uuid'
import { ItineraryEngine } from './itineraryService'

export const engine = new ItineraryEngine()

export const getDestinationInfo = async (countryName: string) => {
  try {
    const response = await fetch 
    (`https://restcountries.com/v3.1/name/${countryName}`)
    if(!response.ok) throw new Error ('Country not found')

    const data: any = await response.json()
    return {
      currency: Object.keys(data[0].currencies)[0] ?? 'USD',
      flag: data[0].flag ?? undefined
    }
  } catch (error){
    throw new Error ('Could not fetch country data')
  }
}

export const createTrip = async (destination:string): Promise<Trip> => {
  const countryInfo = await getDestinationInfo(destination)
  const newTrip: Trip = {
    id: uuidv4(),
    destination,
    startDate: new Date().toLocaleDateString(),
    activities: [],
    currency: countryInfo.currency,
    flag: countryInfo.flag
  }
    engine.addTrip(newTrip)
    return newTrip 
}

export const getTrips = (): Trip[] => engine.getTrips()



