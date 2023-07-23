const { QuickDB } = require('quick.db');
let db =  {};
db = new QuickDB({ filePath: './src/alter/modules/system/Core.sqlite' });
module.exports = { db };