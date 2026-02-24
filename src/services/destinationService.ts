import type {Trip} from '../models'
import {v4 as uuidv4} from 'uuid'
import { ItineraryEngine } from './itineraryService'

export const engine = new ItineraryEngine()

export const getDestinationInfo = async (countryName: string) => {
  try {
    const response = await fetch (
      `https://restcountries.com/v3.1/name/${countryName}`
    )

    if(!response.ok) throw new Error ('Country not found')

    const data = (await response.json()) as {currencies?: Record <string, {name: string; symbol:string}>; flag?:string}[]
    const country = data [0]

    const currency = country.currencies?
    Object.keys(country.currencies)[0] : 'USD'

    const flag = country.flag

    return {
      currency,
      flag
    }

  } catch (error){
    console.log('Could not fetch country data')
  }
}

export const createTrip = async (destination:string): Promise<Trip> => {
  const countryInfo = await getDestinationInfo(destination)
  const newTrip: Trip = {
    id: uuidv4(),
    destination,
    startDate: new Date().toLocaleDateString(),
    activities: [],
    currency: countryInfo?.currency,
    flag: countryInfo?.flag
  }
    engine.addTrip(newTrip)
    return newTrip 
}

export const getTrips = (): Trip[] => engine.getTrips()



