//Menu loop, code given by instructions for the CLI interface, and handling user input. 
// This is where the user will interact with the application and make choices about what they want to do.
import inquirer from 'inquirer';
//import { calculateTotalCost } from './services/budgetService';

  console.log('🌍 Travel Planner App');
  console.log('Plan your trip step by step');
  console.log('-'.repeat(50));

  // Main Menu
const mainMenu = async () => {
  const answers = await inquirer.prompt([{  
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Trips', 'Add Activity', 'View Budget', 'Exit']
  }]);
  // Handle user choices here

  /*try {
    switch (answers.action) {
       case 'View Budget':
        if (!trips.length) {
          console.log('No trips to calculate budget.');
          break;
        }

        console.log(`Total cost: ${calculateTotalCost(trips[0])}`);
        break;

      case 'Exit':
    }
  } catch (error) {
    console.error('Something went wrong.', error);
  }
  // Return to main menu
  await mainMenu();*/
};

// Start CLI Menu
mainMenu();

