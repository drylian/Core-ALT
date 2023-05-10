const { setIntervalAsync } = require('set-interval-async/fixed');
const { config } = require('../../../Settings');
const colors = require('colors');

const Config = config;
const typeStyles = {
  PLAYING: "Jogando",
  LISTENING: "Escutando",
  WATCHING: "Ouvindo",
};

module.exports = {
  name: 'ready',
  run: async (client) => {
    if (Config.Start.Status.Active === true) {
      console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.green('Status')} Ativando...`);
      const statusList = Config.Start.Status.Mensagens.split(',');
      const TypeList = Config.Start.Status.Type.split(',');
      const tempo = parseInt(Config.Start.Status.Tempo);
      let status = 0;
      let index = 0;
      setIntervalAsync(() => {
        if (status >= statusList.length) status = 0;
        const newStatus = statusList[status];

        if (index >= TypeList.length) index = 0;
        const newType = TypeList[index];

        const TypeStyle = typeStyles[newType];

        client.user.setActivity(newStatus, { type: newType });
        console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.green('Status')} - "${TypeStyle} em ${newStatus}".`);
        index++;
        status++;
      }, tempo);
    } else {
      console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.red('Status')} desativado.`);
    }
  }
};
