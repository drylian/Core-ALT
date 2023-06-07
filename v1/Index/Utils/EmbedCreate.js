const Discord = require('discord.js');

// Função para criar um embed com base nos dados fornecidos
function criarEmbed(data) {
  const embed = new Discord.MessageEmbed()
    .setTitle(data.title)
    .setDescription(data.description)
    .setColor(data.color);

  if (data.fields && Array.isArray(data.fields)) {
    data.fields.forEach(field => {
      embed.addFields(field.name, field.value, field.inline);
    });
  }

  return embed;
}

// Função para enviar um embed para um canal específico
function enviarEmbed(embed, channel) {
  if (channel && channel.send && typeof channel.send === 'function') {
    channel.send(embed);
  } else {
    console.error("Canal inválido ou método de envio ausente.");
  }
}

// Função para criar um botão
function criarBotao(label, style, customId) {
    return new Discord.MessageButton()
      .setLabel(label)
      .setStyle(style)
      .setCustomId(customId);
  }

// Exportar a função criarEmbed e a função enviarEmbed, juntamente com outras funções opcionais
module.exports = {
  criarEmbed,
  enviarEmbed,
  criarBotao,
  // Outras funções opcionais aqui...
};
