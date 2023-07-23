import folder from '../modules/folder.mjs';
import { json, jsonsv } from '../modules/json.mjs';
import { gen } from '../modules/gerate.mjs'
import { Logs_ConfigController } from './extensions/Logs_ConfigController.mjs'
import { Database_ConfigController } from './extensions/Database_ConfigController.mjs'
import { keyGen } from './functions/keyGen.mjs'

/**
 * Sistema para criar as pastas padrões do sistema ,
 * responsavel por criar as pastas normais do sistema 
 * e outros arquivos.
 */

const DATABASE_MERGE = process.env.DATABASE_MERGE || false;
const config = (function () {
    
    /**
     * Carrega as configurações da application
     */

    const APP_TITLE = process.env.APP_TITLE || "Core";
    const APP_TOKEN = keyGen('APP_TOKEN', 'core_key_');
    const APP_STORAGE = process.env.APP_STORAGE || "/Armazenamento";
    const APP_ROOT = process.env.APP_ROOT || "/app/config";
    const APP_CACHE = process.env.APP_CACHE || "/app/storage";
    const APP_URL = process.env.APP_URL || "http://localhost";
    const APP_PORT = process.env.APP_PORT || "3000";
    const APP_MODE = process.env.APP_MODE || "dev";

    /**
     * Configurações do Csrf
     */

    const CSRF_COOKIE = process.env.CSRF_COOKIE || 'x-csrf-token';
    const CSRF_SECURE = process.env.CSRF_SECURE || false;
    const CSRF_TOKEN = keyGen('CSRF_SECRET', 'csrf_key_');

    const CSRF_SAMESITE = process.env.CSRF_SAMESITE || false;
    const CSRF_SIZE = process.env.CSRF_SIZE || 64;
    const CSRF_COOKIE_SECRET = keyGen('CSRF_COOKIE_SECRET', 'csrf_cookie_');


    folder('.' + APP_STORAGE)
    folder('.' + APP_ROOT)
    jsonsv('.' + APP_ROOT + '/server.json', { session: gen(64), admin: gen(64), client: gen(64) })
    folder('.' + APP_CACHE)
    folder('.' + APP_CACHE + '/Logs')
    folder('.' + APP_CACHE + '/Logs/Errors')
    folder('.' + APP_CACHE + '/Logs/Register')
    folder('.' + APP_CACHE + '/Tokens')

    const config = {}
    config.title = APP_TITLE
    config.key = APP_TOKEN
    config.app_mode = APP_MODE
    config.storage = '.' + APP_STORAGE
    config.root = '.' + APP_ROOT
    config.url = APP_URL
    config.port = APP_PORT
    config.server = json('.' + APP_ROOT + '/server.json')

    const logs = {
        root: '.' + APP_CACHE + '/Logs',
        errors: '.' + APP_CACHE + '/Logs/Errors',
        register: '.' + APP_CACHE + '/Logs/Register',
        tokens: '.' + APP_CACHE + '/Tokens',
    }

    const csrf = {
        secret: CSRF_SECURE,
        secure: CSRF_TOKEN,
        samesite: CSRF_SAMESITE,
        size: CSRF_SIZE,
        cookie_name: CSRF_COOKIE,
        cookie_secret: CSRF_COOKIE_SECRET
    }
    config.logs = logs
    config.csrf = csrf

    return config;
})();
const databasses = await Database_ConfigController(config)
config.db = databasses
config.db.mergeset = DATABASE_MERGE
const logggers = Logs_ConfigController(config)
config.logs.settings = logggers


export { config }