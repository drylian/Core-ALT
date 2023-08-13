import path from "path";
import express from 'express';
import flash from 'connect-flash';
import { fileURLToPath } from "url";
import session from 'express-session';
import ViteExpress from "vite-express";
import { log } from './LogsController.mjs';
import fileUpload from 'express-fileupload';
import { config } from './ConfigController.mjs'
import { CsrfController } from '../http/middleware/security/CsrfController.mjs'
import RouterController from '../http/router/routerController.mjs'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações do express e middlewares
app.use(express.json()); // Equivalente ao bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Equivalente ao bodyParser.urlencoded({ extended: true })

// Configuração do express-fileupload (se necessário)
app.use(fileUpload());

// Configuração da sessão e flash (se necessário)
app.use(session({
    secret: config.server.session,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Initialize CSRF protection middleware
await CsrfController(app)
//Sistema de rotas
app.use(RouterController)


if (config.app_mode !== "production") {
    log('Aplicação em modo de desenvolvimento, iniciando...')
    const server = app.listen(config.port, '0.0.0.0', () =>
        log(`Servidor iniciado em ${config.url}:${config.port}.`)
    );
    ViteExpress.bind(app, server);
    log(`Vite iniciado com sucesso.`)
} else {
    log('O Servidor esta inciando...')
    const buildPath = path.join(__dirname, '../http/public');

    // Rota para lidar com todas as outras requisições e redirecionar para o React
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}