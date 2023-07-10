const fs = require('fs');
const path = require('path');

module.exports = {
  create: function (folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`[ Folders ] ${folderPath} foi criada.`);
    }
  }
};
