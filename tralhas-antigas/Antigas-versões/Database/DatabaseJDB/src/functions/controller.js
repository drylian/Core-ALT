const { saveDBFLD, loadDBFLD, loadField } = require('./FolderDB');

const saveDB = saveDBFLD;
const loadDB = loadDBFLD;

module.exports = { saveDB, loadDB, loadField };
