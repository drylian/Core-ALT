import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";
import { json } from "alter";
import "colors";
import GenerateMigrations from "./sequelize/controllers/migrations/GenerateMigrations.mjs";
import FunctionMaster from "./sequelize/FunctionMaster.mjs";
import { controller } from "./loggings.mjs";
import Configuractions from "./settings/Default.mjs";
import { config } from "process";
const core = (level, message) => controller[level]("Sequelize", message, "green");

// Scripts especiais no MJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const respose = json(Configuractions.configPATH + "/settings.json");

// if(config.mode !== "production") {
// 	// Armazena o conteúdo gerado pelo sistema em um arquivo bruto
// fs.writeFileSync(
// 	path.join(__dirname, "sequelize/controllers/results/MigrationController.mjs"),
// 	await GenerateMigrations()
// );
// }
fs.writeFileSync(
	path.join(__dirname, "sequelize/controllers/results/MigrationController.mjs"),
	await GenerateMigrations()
);
// Combina as configurações do banco de dados com a opção de logging personalizado
const sequelizeMG = {
	...respose.database,
	logging: (message) => {
		core("debug", message);
	},
};

async function ModelsLoads() {
	const Functionss = await FunctionMaster(sequelize, DataTypes);
	return Functionss();
}

// Cria a instância do Sequelize com as configurações combinadas
const sequelize = new Sequelize(sequelizeMG);

const db = {
	connection: sequelize,
	...(await ModelsLoads()), // Cria a função e executa passando o sequelize e DataTypes
	init: async function () {
		await sequelize.authenticate();
		core("log", "Conexão com o banco de dados estabelecida com sucesso.");
		const initializedModels = await ModelsLoads();
		for (const modelName in initializedModels) {
			if (Object.prototype.hasOwnProperty.call(initializedModels, modelName)) {
				const model = initializedModels[modelName]();
				core("debug", model);
				if (typeof model === "function" && model.sync) {
					model.sync();
					core("log", `Model '${modelName}' sincronizado com o banco de dados.`);
				}
			}
		}

		await sequelize.sync();
	},
};

export default db;
export { db };