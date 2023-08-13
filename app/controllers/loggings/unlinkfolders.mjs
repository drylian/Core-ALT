import fs from "fs";
import path from "path";
import { json } from "../../utils/json.mjs";
import configuractions from "../settings/Default.mjs";
import { controllers } from "./controllers.mjs";

const core = (levelsss, message) => controllers("Loggings", message, "green", levelsss);

export function unlinkfolders(logFolderPath, level) {
	const loggings = json(configuractions.configPATH + "/loggings.json");
	const logFilesPattern = new RegExp(`.*_${level.toLowerCase()}.log.txt`);
	const logFiles = fs.readdirSync(logFolderPath)
		.filter(file => logFilesPattern.test(file))
		.sort((a, b) => fs.statSync(path.join(logFolderPath, a)).mtime - fs.statSync(path.join(logFolderPath, b)).mtime);

	const maxLogFileCount = loggings.autodelete || 10; // Use autodelete value from loggings.json, or default to 10

	if (logFiles.length > maxLogFileCount) {
		const filesToDelete = logFiles.slice(0, logFiles.length - maxLogFileCount); // Get the oldest files to delete
		filesToDelete.forEach(file => {
			const filePath = path.join(logFolderPath, file);
			core("Info", `log antiga deletada : ${filePath}`);

			fs.unlinkSync(filePath);
		});
	}
}
