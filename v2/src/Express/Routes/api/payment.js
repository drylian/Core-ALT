const express = require("express");
const router = express.Router();
const axios = require('axios');
const { config } = require('alter');
const mercadopago = require('mercadopago');
const methodNotAllowed = require("../system/err405");

// Configurar as credenciais do Mercado Pago
mercadopago.configure({
  access_token: config.mpago.access_token,
});


// Rota de exemplo
router.post("/payment", async (req, res) => {
  const { email, price } = req.body;

  try {
    // Verificar se o email existe no Pterodactyl
    const response = await axios.get(config.pterodactyl.url + `/api/application/users?filter[email]=${email}`, {
      headers: {
        'Authorization': 'Bearer ' + config.pterodactyl.token,
        'Accept': 'application/json',
      }
    });

    const users = response.data.data;

    if (users.length > 0) {
      // Obter o ID do usuário
      const userId = users[0].attributes.id;

      // Gerar o token
      const internalToken = generateToken();

      // Criar o pagamento com Mercado Pago
      const preference = {
        back_urls: {
          success: config.pterodactyl.url + '/store',
          failure: config.pterodactyl.url + '/',
          pending: config.pterodactyl.url + '/',
        },
        Notification_url: config.pterodactyl.url + '/mercadopago/listen',
        payer: {
          email: email,
        },
        items: [
          {
            title: config.pterodactyl.name + ' - ' + price + ' |  Creditos',
            quantity: 1,
            unit_price: price * 0.01, // Converter para o valor em centavos
            currency_id: 'BRL',
          },
        ],
        metadata: {
          payment_locale: 'WebSite',
          credit_amount: price,
          user_id: userId,
          user_email: email,
          internal_token: internalToken,
        },
      };

      // Criar a preferência do pagamento
      const response = await mercadopago.preferences.create(preference);
      console.log(response)

      // Obter a URL para redirecionar o usuário ao checkout do Mercado Pago
      const initPoint = response.body.init_point;

      res.send(initPoint);
    } else {
      res.send('Email inválido');
    }
  } catch (error) {
    console.error(error);
    res.send('Erro ao verificar o email');
  }
});

// Middleware para método GET não permitido
router.get("/payment", methodNotAllowed);

function generateToken() {
  // Gerar uma sequência de 20 caracteres aleatórios
  let token = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 20; ++i) {
    token += characters[Math.floor(Math.random() * charactersLength)];
  }

  // Adicionar informações de data no token
  const now = new Date();
  const formattedNow = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  token += '_' + formattedNow;

  return token;
}

module.exports = router;
