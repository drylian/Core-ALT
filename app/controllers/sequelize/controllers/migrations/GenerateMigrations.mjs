import ConvertJson from "./ConvertJson.mjs";

import { controller } from "../../../loggings.mjs";
const core = (level, message) => controller[level]("Sequelize", message, "green");

// Function to format the current date as DAY/MMM/YYYY HH:MM:SS
function getCurrentDateTime() {
	const now = new Date();
	const day = String(now.getDate()).padStart(2, "0");
	const month = now.toLocaleString("default", { month: "short" });
	const year = now.getFullYear();
	const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
	return `${day}/${month}/${year} ${time}`;
}

// Function to merge the Migration definitions into a function called "Migrations"
const GenerateMigrations = async () => {
	const Migrations = await ConvertJson();
	let content = `/**
 * SequelizeController Migrations
 * Controlador de todos os Migrations gerados em ${getCurrentDateTime()}
 * Total de Migrations = ${Object.keys(Migrations).length}
 */

`;

	content += "function Migrations() {\n";

	for (const MigrationName in Migrations) {
		if (Object.prototype.hasOwnProperty.call(Migrations, MigrationName)) {
			const MigrationCode = Migrations[MigrationName];
			content += MigrationCode + "\n\n";
		}
	}

	content += "  return {";
	const MigrationNames = Object.keys(Migrations);
	for (let i = 0; i < MigrationNames.length; i++) {
		const MigrationName = MigrationNames[i];
		content += ` ${MigrationName}`;
		if (i !== MigrationNames.length - 1) {
			content += ",";
		}
	}
	content += " };\n";

	content += "}\n"; 

	core("debug","O MigrationController foi criado :", content);
	return content;
};

export default GenerateMigrations;
