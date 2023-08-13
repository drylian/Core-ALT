import inquirer from "inquirer";
async function question(questionConfig) {
	return inquirer.prompt([
		{
			...questionConfig,
			name: "userInput"
		}
	]).then(answers => {
		return answers.userInput;
	});
}
export default question;