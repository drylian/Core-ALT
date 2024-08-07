import { json } from "../../utils/json.mjs";
import { registerlog } from "./registerlog.mjs";
import { getTimestamp } from "./getTimestamp.mjs";
import configuraction from "../settings/Default.mjs";
import { loggings } from "./params.mjs";
import colors from "colors";

export function log(level, message, color = null) {
	const valoressssss = json(configuraction.configPATH + "/loggings.json");
	const CURRENT_LOG_LEVEL = valoressssss.level || "Debug"; // Altere o nível atual conforme necessário
	const levelConfig = loggings[level] || loggings.Alternative;
	const currentLevelConfig = loggings[CURRENT_LOG_LEVEL];
	if (level === "Core") {
		const { currentHour } = getTimestamp();
		// Mensagens do sistema,  não precisa de logs
		return console.log(`[ ${currentHour} ] [ ${colors[color ? color : levelConfig.color](level)} ] ${(message)}`);
	}

	if (levelConfig.level <= currentLevelConfig.level) {
		const { currentHour, fulltimer } = getTimestamp();
		const ConsoleLog = `[ ${currentHour} ] [ ${colors[color ? color : levelConfig.color](level)} ] ${(message)}`;
		const ArchiveLog = `[ ${fulltimer} ] [ ${level} ] ${message}`;
		console.log(ConsoleLog);
		registerlog(level, ArchiveLog);
	}
}