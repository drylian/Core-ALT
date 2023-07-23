import fs from 'fs';

export default function(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
}
