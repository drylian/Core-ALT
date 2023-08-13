import fs from "fs";
import path from "path";

export function dirCR(folderPath) {
	fs.mkdirSync(folderPath, { recursive: true });
}

export function dirEX(folderPath) {
	if (fs.existsSync(folderPath)) {
		return true;
	} else {
		return false;
	}
}

export function dirSC(folderPath) {
	const scannedFiles = [];

	function scanDir(directory) {
		const files = fs.readdirSync(directory);

		files.forEach((file) => {
			const filePath = path.join(directory, file);
			const stat = fs.statSync(filePath);

			const fileInfo = {
				name: file,
				path: filePath,
				isDirectory: stat.isDirectory(),
				size: stat.size,
				createdAt: stat.birthtime,
				modifiedAt: stat.mtime,
				accessedAt: stat.atime,
				//   permissions: {
				// 	owner: {
				// 	  read: !!(stat.mode & 0o400),
				// 	  write: !!(stat.mode & 0o200),
				// 	  execute: !!(stat.mode & 0o100),
				// 	},
				// 	group: {
				// 	  read: !!(stat.mode & 0o40),
				// 	  write: !!(stat.mode & 0o20),
				// 	  execute: !!(stat.mode & 0o10),
				// 	},
				// 	others: {
				// 	  read: !!(stat.mode & 0o4),
				// 	  write: !!(stat.mode & 0o2),
				// 	  execute: !!(stat.mode & 0o1),
				// 	},
				//   },
			};

			scannedFiles.push(fileInfo);

			if (stat.isDirectory()) {
				scanDir(filePath);
			}
		});
	}

	scanDir(folderPath);
	return scannedFiles;
}
