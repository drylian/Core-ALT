const { loadDB } = require('../../functions/loadDB');
const { log } = require('../../functions/logmanager');

function get(field, id = null) {
    const database = loadDB();
    
    if (!database[field]) {
        log(`Field '${field}' não existe.`);
        return null;
    } else {
        if (id) {
            const idKeys = id.split(':');
            let objeto = database[field];
            
            for (const key of idKeys) {
                if (!objeto[key]) {
                    log(`Field '${field}.${id}' não existe.`);
                    return null;
                }
                
                objeto = objeto[key];
            }
            
            log(`Field '${field}.${id}' foi desencriptado.`);
            return objeto;
        } else {
            log(`Retornando todo o Field '${field}'.`);
            return database[field];
        }
    }
}

module.exports = { get };
