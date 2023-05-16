'use strict'
const logEmbed = require('../functions/embedLog');

module.exports = async function (fastify, opts) {
  fastify.post(`/webhook`, async function (request, reply) {

    const { user, name, price, guild, productId } = request.body;

    const data = request.body;
      
    console.log(request.body)

    if (!user) return reply.code(400).send({ execution: 'Error', code: 400, response: undefined, error: 'Missing user' });
    if (!name) return reply.code(400).send({ execution: 'Error', code: 400, response: undefined, error: 'Missing name' });
    if (!price) return reply.code(400).send({ execution: 'Error', code: 400, response: undefined, error: 'Missing price' });
    if (!guild) return reply.code(400).send({ execution: 'Error', code: 400, response: undefined, error: 'Missing guild' });
    if (!productId) return reply.code(400).send({ execution: 'Error', code: 400, response: undefined, error: 'Missing productId' });
    
    try {
      await logEmbed.run(data);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ execution: 'Error', code: 500, response: undefined, error: 'Internal Server Error' });
    }

    return true

  })
  fastify.get(`/webhook`, async function (request, reply) {
    // retorna uma resposta de erro com o código 405 (Método não permitido) e o cabeçalho Allow definido como "POST"
    reply.code(405).header('Allow', 'POST').send({ execution: 'Error', code: 405, response: undefined, error: 'Método não permitido. Somente o método post é permitido.' })
  })
}
