/**
 * Alternight 2023
 * 
 * Função auxiliar para logs, Deleta logs caso certos processos seja feitos
 * 
 */
import fs from 'fs';
import path from 'path';
function UnlinkerLogs(directory, Limit) {
	const files = fs.readdirSync(directory);

	if (files.length >= Limit) {
		const fileStats = files.map((file) => ({
			file,
			modifiedTime: fs.statSync(path.join(directory, file)).mtime.getTime(),
		}));

		fileStats.sort((a, b) => a.modifiedTime - b.modifiedTime);

		const delfiles = path.join(directory, fileStats[0].file);
		fs.unlinkSync(delfiles);
	}
}

export { UnlinkerLogs };