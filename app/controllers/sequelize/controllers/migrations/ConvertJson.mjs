import fs from "fs";
import path from "path";
import GenerateFunctioner from "./GenerateFunction.mjs";
import Configuractions from "../../../settings/Default.mjs";
import { controller } from "../../../loggings.mjs";
const core = (level, message) => controller[level]("Sequelize", message, "green");

/**
 * Suporte a migrations
 */
const MigrationsPath = Configuractions.modelsPATH + "/migrations";
// Função para ler um arquivo JSON e retornar seu conteúdo como um objeto
const readJSONFile = async (filePath) => {
	const content = await fs.promises.readFile(filePath, "utf8");
	return JSON.parse(content);
};

// Função para carregar os Migrationos de arquivos JSON e retorná-los como um objeto
const ConvertJson = async () => {
	const Migrations = {};
	const files = await fs.promises.readdir(MigrationsPath);

	for (const file of files) {
		if (file.endsWith(".json") && file !== "Template.json") {
			const MigrationPath = path.join(MigrationsPath, file);
			const MigrationName = path.basename(file, ".json");
			const MigrationConfig = await readJSONFile(MigrationPath);

			// Verifica se o Migrationo possui o campo "Configuractions" e "Migration"
			if (MigrationConfig.Configuractions && MigrationConfig.Migration) {
				const MigrationDefinition = GenerateFunctioner(MigrationConfig);
				Migrations[MigrationName] = MigrationDefinition;
				core("debug", `Migration json convertido para função com sucesso: ${MigrationName}`);
			} else {
				core("debug", `Ignorando o Migration ${MigrationName}. Configuração JSON inválida.`);
			}
		}
	}
	return Migrations;
};

export default ConvertJson;