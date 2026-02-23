//Menu loop, code given by instructions for the CLI interface, and handling user input. 
// This is where the user will interact with the application and make choices about what they want to do.
import inquirer from 'inquirer';
const mainMenu = async () => {
  const answers = await inquirer.prompt([{  
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Trips', 'Add Activity', 'View Budget', 'Exit']
  }]);
  // Handle user choices here

  try {
    switch (action) {
      case 'Create Trip': {
        const { destination, startDate } =
          await inquirer.prompt<{ destination: string; startDate: string }>([
            { type: 'input', name: 'destination', message: 'Destination:' },
            { type: 'input', name: 'startDate', message: 'Start Date (YYYY-MM-DD):' }
          ]);

        createTrip(destination, new Date(startDate));
        console.log('Trip created successfully!');
        break;
      }

      case 'View Trips':
        if (!trips.length) {
          console.log('No trips created yet.');
          break;
        }

        trips.forEach(trip =>
          console.log(`${trip.destination} (${trip.startDate.toDateString()})`)
        );
        break;

      case 'View Budget':
        if (!trips.length) {
          console.log('No trips to calculate budget.');
          break;
        }

        console.log(`Total cost: ${calculateTotalCost(trips[0])}`);
        break;

      case 'Destination Info': {
        const { country } =
          await inquirer.prompt<{ country: string }>([
            { type: 'input', name: 'country', message: 'Country name:' }
          ]);

        const info = await getDestinationInfo(country);
        console.log(`Currency: ${info.currency}`);
        console.log(`Flag: ${info.flag}`);
        break;
      }

      case 'Exit':
        console.log('Goodbye! 👋');
        process.exit(0);
    }
  } catch (error) {
    console.error('Something went wrong.', error);
  }
  // Return to main menu
  await mainMenu();
};

// Start CLI Menu
mainMenu();


