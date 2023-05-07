const { setIntervalAsync } = require('set-interval-async/fixed');
const Config = require('../../Config/config.json');
const crypto = require('../../Config/crypto.json')
const typeStyles = {
  PLAYING: "Jogando",
  LISTENING: "Escutando",
  WATCHING: "Ouvindo",
};

module.exports = {
  name: 'ready',
  run: async (client) => {
    const statusList = Config.Iniciar.Status.Mensagens.split(',');
    const TypeList = Config.Iniciar.Status.Type.split(',');
    const tempo = parseInt(Config.Iniciar.Status.Tempo);
    let status = 0;
    let index = 0;
    setIntervalAsync(() => {
      if (status >= statusList.length) status = 0;
      const newStatus = statusList[status];

      if (index >= TypeList.length) index = 0;
      const newType = TypeList[index];

      const TypeStyle = typeStyles[newType];

      client.user.setActivity(newStatus, { type: newType });
      console.log(`[ BOT STS ] "${TypeStyle} em ${newStatus}".`);
      index++;
      status++;
    }, tempo);
  }
};
