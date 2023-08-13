import GenerateMigrations from "./controllers/migrations/GenerateMigrations.mjs";
import { controller } from "../loggings.mjs";
const core = (level, message) => controller[level]("Sequelize", message, "green");
// Função para criar a função dinamicamente e executá-la passando o sequelize e DataTypes
const FunctionMaster = async (sequelize, DataTypes) => {
	try {
		const code = await GenerateMigrations();
		core("debug", code);
		// Executa o código gerado como uma função retornando a função models
		return new Function("sequelize", "DataTypes", `return (${code})`)(sequelize, DataTypes);
	} catch (error) {
		core("err", "Erro ao criar fundir a função dos models:", error);
		throw error;
	}
};

export default FunctionMaster;