import fs from "fs";
import path from "path";
import { unlinkfolders } from "./unlinkfolders.mjs";
import { dirCR } from "../../utils/folder.mjs";
import configuraction from "../settings/Default.mjs";
import { getTimestamp } from "./getTimestamp.mjs";
import { resolve } from "path";
const LOG_STORAGE_PATH = configuraction.loggingsPATH; // Path das logs

export function registerlog(level, message, Sublevel) {
	const logFileName = `${getTimestamp().dayTimer}_${level.toLowerCase()}.log.txt`;
	const logFolderPath = resolve(LOG_STORAGE_PATH, level, Sublevel || "");
	const logFilePath = path.join(logFolderPath, logFileName);

	dirCR(logFolderPath);
	fs.appendFileSync(logFilePath, message + "\n");

	// Verifica e deleta o arquivo mais antigo
	unlinkfolders(logFolderPath, level);
}