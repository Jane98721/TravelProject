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
};
mainMenu();