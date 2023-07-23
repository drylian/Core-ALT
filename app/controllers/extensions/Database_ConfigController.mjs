import { envSV } from "../../modules/env.mjs"
import { makeQuestion } from "../../modules/makeQuestion.mjs"
import moment from "moment"

import colors from 'colors';
async function Database_ConfigController(config) {
    const log = x => { console.log(`| ${moment().format("HH:mm:ss")} | ${colors.cyan(config.title)} : ${x}`) };

    if (!process.env.DATABASE_DRIVER) {
        const response = await makeQuestion({ type: 'list', message: 'Qual tipo de banco de dados você deseja usar?', choices: ['Sqlite (Database local)', 'Mysql (Database externo)'] })
        if (response.startsWith('Sqlite')) {
            log(`Você escolheu ${colors.blue('Sqlite')}, iniciando sistema.`);
            envSV('DATABASE_DRIVER', 'Sqlite')
        } else {
            envSV('DATABASE_DRIVER', 'Mysql')
        }
    }
    let db
    if (process.env.DATABASE_DRIVER === "Mysql") {
        log(`${colors.blue('Mysql Controller')} : iniciando verificações das configurações.`);
        db = await DBQuestions()
        log(`${colors.blue('Mysql Controller')} : Verificação completa.`);
    } else {
        db = { type: "Sqlite" }
    }
    return db
}
async function DBQuestions() {
    if (!process.env.DATABASE) {
        const response = await makeQuestion({ type: 'input', message: 'Qual vai ser o banco de dados usado?:' })
        envSV('DATABASE', `"${response}"`)
    }
    if (!process.env.DATABASE_HOST) {
        const response = await makeQuestion({ type: 'input', message: 'Qual vai ser a Host do banco de dados?:', default: 'localhost' })
        envSV('DATABASE_HOST', response)
    }
    if (!process.env.DATABASE_PORT) {
        const response = await makeQuestion({ type: 'input', message: 'Qual vai ser a porta do banco de dados?:', default: '3306' })
        envSV('DATABASE_PORT', response)
    }
    if (!process.env.DATABASE_USERNAME) {
        const response = await makeQuestion({ type: 'input', message: 'Qual é o usuário usado pelo Mysql?:' })
        envSV('DATABASE_USERNAME', `"${response}"`)
    }
    if (!process.env.DATABASE_PASSWORD) {
        const response = await makeQuestion({ type: 'input', message: 'Qual é a senha do banco de dados?:' })
        envSV('DATABASE_PASSWORD', `"${response}"`)
    }
    return {
        type: process.env.DATABASE_DRIVER,
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    }
}

export { Database_ConfigController };
