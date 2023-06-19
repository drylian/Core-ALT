const { slash, event, debug, expresss } = require('./codes/Logger');
const { client } = require('./codes/Server')
const db = require('./codes/json')
const { config, category } = require('./conf/Settings');
const { cores } = require('./codes/Colors');
const { getToken } = require('./codes/utils/getToken');
const { createCustomTable } = require('./codes/Table');
const { temp } = require('./codes/utils/TempToken');

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
    getToken,
    temp,
    db,
    set,
}
