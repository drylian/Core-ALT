import { controller } from "../../../loggings.mjs";
const core = (level, message) => controller[level]("Sequelize", message, "green");

function GenerateFunction(jsonConfig) {
	// Extraia o objeto de configuração do JSON
	const { Type, Migration, Description, Version, Configuractions } = jsonConfig;

	// Function header
	let code = `/**
 * Function Gerada pelo SequelizeController.
 * Json Migration "${Migration}" convertido para função. 
 * Migration Versão: ${Version}
 * Migration Descrição: ${Description}
 * Migration Tipo: ${Type}
 */\n\n`;

	// Definição do Migration
	code += `const ${Migration} = () => {\n`;

	// Definição do conteúdo do Migration
	code += `  const ${Migration}Content = sequelize.define('${Migration}', {\n`;

	// Percorra as propriedades na configuração e adicione-as ao código
	for (const [fieldName, fieldConfig] of Object.entries(Configuractions)) {
		code += `      ${fieldName}: {\n`;
	
		if (typeof fieldConfig === "object") {
			// If fieldConfig is an object, treat it as a complex field configuration
			for (const [key, value] of Object.entries(fieldConfig)) {
				if (key === "defaultValue") {
					// Convert defaultValue object to a JSON string
					code += `        ${key}: ${JSON.stringify(value)},\n`;
				} else {
					code += `        ${key}: ${value},\n`;
				}
			}
		} else {
			// If fieldConfig is not an object, assume it's the type and treat it accordingly
			code += `        type: ${fieldConfig},\n`;
		}
	
		code += "      },\n";
	}

	// return
	code += " })\n";
	code += `  return ${Migration}Content;\n};\n`;
	core("debug", `A Migration "${Migration}" foi convertida com sucesso :`);
	return code;
}

export default GenerateFunction;
