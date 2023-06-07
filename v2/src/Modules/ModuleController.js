const { slash, event, debug, expresss } = require('./codes/Logger');
const { client } = require('./codes/Client');
const { config, category } = require('../../Settings');
const { cores } = require('./codes/Colors');
const { createCustomTable } = require('./codes/Table');
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
}
