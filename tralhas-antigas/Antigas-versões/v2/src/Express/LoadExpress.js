const FrontEndRoutes = require('./Routes/FrontEnd');
const BackEndRoutes = require('./Routes/BackEnd');
const { config, expresss } = require('alter');
const express = require('express');
const path = require('path');

const buildPath = path.join(__dirname, 'Webpanel');

function loadExpress() {
    try {
        // Carrega o Sistema de Rotas
        const app = express();
        // Inicia rotas do BackEnd
        BackEndRoutes(app);
        if (config.express.front === true) {
            // Inicia rotas do FrontEnd
            FrontEndRoutes(express, path, buildPath, app);
        }
        app.listen(config.express.port, () => {
            expresss.log(`O Express foi iniciado em ${config.express.url}:${config.express.port}.`);
        });
    } catch (err) {
        expresss.log(`Erro durante a inicialização: ${err}`);
        process.exit(1);
    }
}

module.exports = loadExpress;