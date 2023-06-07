const express = require('express');
const { join } = require('path');
const colors = require('colors');
const { config } = require('../../../Settings');

const Config = config;

module.exports = {
  name: 'ready',
  run: async function (client) {
    if (Config.Start.Express.Active === true) {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Express')} Iniciando http...`);
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use('/public', express.static(join(__dirname, 'Setup/Express/public')));

      const server = app.listen(Config.Start.Express.Porta, () => {
        console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Express')} iniciado em HTTP://localhost:${server.address().port}`);
      });

      app.client = client;
    } else {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.red('Express')} desativado. http não iniciado.`);
    }
  },
};
