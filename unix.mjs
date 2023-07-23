import { config } from 'dotenv';
import { dev } from "./app/modules/inicializer/dev.mjs"

await import('./app/controllers/ExportController.js')
// Carrega as variáveis de ambiente do arquivo .env
config();

const APP_MODE = process.env.APP_MODE || "dev";
if(APP_MODE === "dev") {
    dev()
} else {
    await import("./app/modules/inicializer/init.mjs")
}