module.exports = {
    name: 'guildBan',
  };
  
  client.on("guildBan", async (guild, user) => {
    // Aqui você pode adicionar o código para registrar o log no Discord
    const logChannel = guild.channels.cache.get("1112235382248054895");
    if (logChannel) {
      logChannel.send(`Usuário ${user.tag} foi banido do servidor ${guild.name}.`);
    } else {
      console.log(`Canal de log não encontrado no servidor ${guild.name}.`);
    }
  });
  