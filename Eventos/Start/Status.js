const { setIntervalAsync } = require('set-interval-async/fixed');
const config = require('../../config.json');

module.exports = {
  name: 'ready',
  run: async (client) => {
    const statusList = config.status.split(',');
    let index = 0;

    setIntervalAsync(() => {
      if (index >= statusList.length) index = 0;
      const newStatus = statusList[index];
      client.user.setActivity(newStatus, { type: config.TypeStatus });
      console.log(`[ STATUS ] O Status do bot foi definido para "${newStatus}".`);
      index++;
    }, 180000); // Tempo

    console.log('[ STATUS ] O Sistema de Status foi iniciado.');
  }
};