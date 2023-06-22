const { set } = require('./db/set')
module.exports = {
    set,
    get,
    del,
    drop,
    dropall,
    exp,
    imp
};