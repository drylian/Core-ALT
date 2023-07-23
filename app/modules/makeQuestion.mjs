import inquirer from 'inquirer';
async function makeQuestion(questionConfig) {
    return inquirer.prompt([
      {
        ...questionConfig,
        name: 'userInput'
      }
    ]).then(answers => {
      return answers.userInput;
    });
  }
export { makeQuestion }