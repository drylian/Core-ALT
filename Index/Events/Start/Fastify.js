'use strict';

const { join } = require('path');
const AutoLoad = require('fastify-autoload');
const Cors = require('fastify-cors');
const colors = require('colors');
const rateLimit = require('fastify-rate-limit');
const FastifyStatic = require('fastify-static');
const FastifyMultipart = require('fastify-multipart');
const { config } = require('../../../Settings');

const Config = config;

module.exports = {
  name: 'ready',
  run: async function (client) {
    if (Config.Start.Fastify.Active === true) {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Fastify')} Iniciando http...`);
      const fastify = require('fastify')();
      await fastify
        .register(Cors)
        .register(rateLimit, {
          max: 100,
          timeWindow: '1 minute'
        })
        .register(FastifyMultipart)
        .register(FastifyStatic, {
          root: join(__dirname, 'Setup/Fastify', 'public'),
          prefix: '/public/',
        })
        .register(AutoLoad, {
          dir: join(__dirname, 'Setup/Fastify', 'routes'),
        });

      fastify.listen({
        port: Config.Start.Fastify.Porta,
        host: '0.0.0.0',
      }),
        function (err) {
          if (err) {
            fastify.log.error(err)
            process.exit(1)
          }

          fastify.client = client;
        }
        console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Fastify')} iniciado em HTTP://localhost:${Config.Start.Fastify.Porta}`);
    } else {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.red('Fastify')} desativado. http não iniciado.`);
    }
  },
};
