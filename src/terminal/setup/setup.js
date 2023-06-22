/*
 * Alternight 2023 - Todos os direitos reservados.
 * 
 * Sistema de perguntas do painel, serve para configurar 
 * as partes iniciais e necessarias para o painel funcionar.
 * 
 */

const readline = require('readline');
const { db } = require('../../alter/db/JDB')
function setup() {
    console.clear()
    console.log(`
    Olá, Bem-vindo ao Core, para começar é necessario configurar algumas coisas antes, 
    não se preocupe, essas configuração podem ser mudadas novamente caso precise mudar. \n`);

    console.log('Vamos começar, resposta essas 8 perguntas antes de podermos iniciar o servidor.\n')

    const set = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function dbl() {
        const config = db.get('config');
        return config;
    }

    function per(question, qst) {
        set.question(question, (res) => {
            set.question('Tem certeza? (s/n): ', (confirmation) => {
                if (confirmation.toLowerCase().startsWith('s') || confirmation.toUpperCase().startsWith('S')) {
                    db.set('config', { [qst]: res })
                    config[qst] = res;
                    next_per();
                } else {
                    console.clear(3)
                    per(question, qst);
                }
            });
        });
    }

    function next_per() {
        const config = dbl()
        if (!config.username) {
            console.log('[ token ] Digite qual vai ser o token usado para conectar o bot no discord ?')
            per('Digite o token do bot: ', 'token');
        } else if (!config.email) {
            console.clear(3)
            per('Digite o email do usuário: ', 'email');
        } else if (!config.phone) {
            console.clear(3)
            per('Digite o número de telefone do usuário: ', 'phone');
        } else {
            set.close();
            const jsonConfig = JSON.stringify(config, null, 2);
            console.log(`Configuração final:\n${jsonConfig}`);
        }
    }
}
module.exports = setup