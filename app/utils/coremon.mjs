import { spawn } from "child_process";
import path from "path";
import fs from "fs";

let appProcess;

function startApp(filePath) {
	return new Promise((resolve, reject) => {
		if (appProcess) {
			appProcess.kill();
		}
		appProcess = spawn("node", [filePath], { stdio: "inherit" });

		appProcess.on("close", (code) => {
			if (code === 8) {
				console.error("Erro de sintaxe detectado, não reiniciando.");
				reject();
			} else {
				resolve();
			}
		});
	});
}

function coremon(config) {
	const { folderPath, filePath, ignoredPaths = [] } = config;

	try {
		startApp(filePath).catch((err) => console.error(err));
	} catch (err) {
		console.error(err);
		return;
	}

	const watcher = fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
		console.log(`Evento: ${eventType}, Arquivo: ${filename}`);
		const fullPath = path.join(folderPath, filename);
		if (eventType === "change") {
			if (ignoredPaths.includes(filename)) {
				console.log(`O arquivo ${fullPath} foi modificado, mas foi ignorado.`);
				return;
			}

			console.log(`O arquivo ${fullPath} foi modificado. Reiniciando...`);
			try {
				startApp(filePath).catch((err) => console.error(err));
			} catch (err) {
				console.error(err);
			}
		}
	});

	// Mantendo a função em execução mesmo após o evento de 'exit'.
	process.stdin.resume();

	// Encerrando o watcher quando o processo for encerrado.
	process.on("exit", () => {
		console.log("Encerrando o watcher.");
		watcher.close();
	});

	process.on("SIGINT", () => {
		console.log("Encerrando o watcher.");
		watcher.close();
		process.exit();
	});
}

export default coremon;
