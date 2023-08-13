import folder from '../app/modules/folder.mjs';
import { envLD, envSV } from '../app/modules/env.mjs';
import { keyGen } from '../app/controllers/functions/keyGen.mjs'
const prefix = async (valor, ElseValor) => {
    if (process.env.ENV_EXPAND) {
        if (!(valor in process.env) || process.env[valor] === undefined) {
            // Define o valor padrão para a variável de ambiente se ela não existir ou for undefined
            if(ElseValor.startsWith('gen')) {
                
            }

            process.env[valor] = ElseValor;
        }

        envSV()

        return valorReturn
    }
}
/**
 * Sistema para criar as pastas padrões do sistema ,
 * responsavel por criar as pastas normais do sistema 
 * e outros arquivos.
 */
prefix("APP_MODE", "dev");
prefix("APP_URL", "http://localhost");
prefix("APP_PORT", "3000");
prefix("APP_TITLE", "Core");
prefix("APP_ICON", "http://localhost");
prefix("APP_VERSION", "development");
prefix("APP_VERSION", "development");
prefix("APP_TOKEN", keyGen('APP_TOKEN', 'core_key_'));
prefix("APP_STORAGE", "./Armazenamento");
prefix("APP_ROOT", "./app");
prefix("APP_CACHE", "./app/storage");
prefix("APP_CODEC", "./app/.coded");
prefix("CSRF_SECURE", "false");
prefix("CSRF_SECRET", keyGen('CSRF_SECRET', 'csrf_key_'));
prefix("CSRF_SAMESITE", "false");
prefix("CSRF_SIZE", 64);
prefix("CSRF_COOKIE_SECRET", keyGen('CSRF_COOKIE_SECRET', 'csrf_cookie_'));
prefix("DB_TYPE", "sqlite");

if (process.env.DB_TYPE !== "sqlite") {
    await DB_config
}

prefix("DB_HOSTNAME", keyGen('DB_TYPE', 'csrf_cookie_'));
prefix("DB_PORT", keyGen('DB_TYPE', 'csrf_cookie_'));
prefix("DB_PASSWORD", keyGen('DB_TYPE', 'csrf_cookie_'));
prefix("DB_USERNAME", keyGen('DB_TYPE', 'csrf_cookie_'));


export { config }