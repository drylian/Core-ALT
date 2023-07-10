const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('login')
    .setDescription('Faz login no painel'),
  async execute(interaction) {
    const user = interaction.user;

    // Envia uma mensagem direta para o usuário solicitando email e senha
    await user.send('Olá! Para fazer login no Pterodactyl, por favor, me envie seu email e senha separados por vírgula. Exemplo: `email@example.com, minhaSenha123`');

    const filter = (m) => m.author.id === user.id; // Filtra apenas as mensagens do usuário

    try {
      // Espera a resposta do usuário com o email e senha
      const collected = await user.dmChannel.awaitMessages({
        filter,
        max: 1, // Espera apenas uma mensagem
        time: 60000, // Tempo limite de 60 segundos
        errors: ['time'], // Define erro caso o tempo limite seja excedido
      });

      const message = collected.first(); // Obtém a primeira mensagem coletada

      if (!message) {
        // Caso não haja mensagem, exibe um aviso
        return user.send('Tempo limite expirado. Por favor, execute o comando novamente para fazer login.');
      }

      const [email, password] = message.content.split(',').map((str) => str.trim()); // Divide o conteúdo da mensagem em email e senha

      if (!email || !password) {
        // Caso não haja email ou senha, exibe um aviso
        return user.send('Email ou senha inválidos. Por favor, execute o comando novamente para fazer login.');
      }

      // Chama a função de login no Pterodactyl
      const loginResponse = await login(email, password);

      // Verifica se o login foi bem-sucedido
      if (loginResponse.complete) {
        // Caso seja, exibe uma mensagem de sucesso
        const embed = {
          title: 'Login realizado com sucesso',
          description: `Você fez login no Pterodactyl. Seu token de confirmação é: ${loginResponse.confirmationToken}`,
          color: 0x28a745,
        };

        return user.send({ embeds: [embed] });
      } else {
        // Caso contrário, exibe uma mensagem de erro
        return user.send('Ocorreu um erro durante o login no Pterodactyl. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      console.error('Erro durante o processo de login:', error);
      user.send('Ocorreu um erro durante o processo de login. Por favor, tente novamente mais tarde.');
    }
  },
};

// Função de login no Pterodactyl
async function login(email, password) {
  try {
    const csrfTokenResponse = await axios.get('https://painel.alternight.ml/sanctum/csrf-cookie'); // Obtém o token CSRF

    const csrfTokenCookie = csrfTokenResponse.headers['set-cookie'][0]; // Obtém o valor do cookie CSRF
    console.log(csrfTokenCookie)
    const csrfTokenMatch = /XSRF-TOKEN=([^;]+)/.exec(csrfTokenCookie); // Extrai o valor do token CSRF usando uma expressão regular
    console.log(csrfTokenMatch)
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null; // Atribui o valor do token CSRF ou null caso não seja encontrado
    console.log(csrfToken)

    // Faz a solicitação de login no Pterodactyl
    const loginResponse = await axios.post('https://painel.alternight.ml/auth/login', {
      user: email,
      password: password,
      'X-XSRF-TOKEN': csrfToken,
    });

    return {
      complete: loginResponse.status === 204, // Verifica se o status da resposta é 204 (sem conteúdo)
      intended: loginResponse.data.intended || undefined,
      confirmationToken: loginResponse.data.confirmation_token || undefined,
    };
  } catch (error) {
    console.error('Erro durante o login:', error.response.data);
    return {
      complete: false,
    };
  }
}
