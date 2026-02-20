import type {Trip} from '../models'
import {v4 as uuidv4} from 'uuid'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout 
})

const trips: Trip[] = []

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
    trips.push(newTrip)
    return newTrip 
}

export const getTrips = (): Trip[] => trips

///////////////// Cli ///////////////////

const showMenu = (): void => {

  console.log('Create a trip ', 'List all trips ', 'Exit')
  process.stdout.write("> ")
  rl.question("", (command: string) => {
    handleCommand(command)
  })
}

const handleCommand = (command:string): void => {
  switch(command.trim().toLowerCase()){
    case "create":
      rl.question("Enter destination: ", async (destination: string) => {
      if(destination.trim() === ""){
      console.log('Destionation can not be empty')
      } else {
      const trip = await createTrip(destination)
      console.log('Destination created')
      }
      showMenu()
    })

    break

    case "show":
      const trips = getTrips()
      console.log(trips)
      showMenu()
      break;
      
      case "exit":
      console.log('Goodbye')
      rl.close()
      break;

    default: 
      console.log('Unknown command')
      showMenu()
      break;
  }
}

console.log("Welcome")
showMenu()