const { slash, event, debug, expresss } = require('./bot/Logger');
const { client } = require('./bot/Client')
const db = require('./system/db/JDB')
const { config, category } = require('./system/conf/Settings');
const { cores } = require('./bot/Colors');
const { gen, gex } = require('./system/getToken');
const { createCustomTable } = require('./bot/Table');
const temp = require('./web/Temptokens');
const set = db.config
module.exports = {
    slash,
    event,
    expresss,
    debug,
    config,
    cores,
    client,
    category,
    createCustomTable,
    gen,
    gex,
    db,
    set,
    temp,
}
