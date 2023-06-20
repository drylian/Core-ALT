const fs = require('fs');

module.exports = {
  create: function (folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`[ Folders ] ${folderPath} foi criada.`);
    }
  }
};
