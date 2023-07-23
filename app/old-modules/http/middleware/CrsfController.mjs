"use strict";
import fs from 'fs';
import { gen } from '../../modules/gerate.mjs'
import { config } from '../../controllers/ConfigController.mjs'
import { fulltimer } from '../../controllers/functions/dateformat.mjs'
import { log } from '../../controllers/LogsController.mjs';

async function CreateCsrf(res, req) {
    try {
        let correntUrl = false
        if (req.originalUrl) {
            correntUrl = req.originalUrl;
        }
        /**
         * Gera o Csrf do alter.
         */
        const csrfgerated = gen(100) + fulltimer();

        /**
         * Csrf que é registrado no servidor, usado para autenticar
         * o caminho do usuario e do servidor
         */
        fs.writeFileSync(config.logs.csrf + `/${csrfgerated}.csrf`, `
    Token Gerado: ${csrfgerated}
    Data gerada: ${fulltimer()}
    Método usado: Geração Unica Gen com data.
    Validade: 1 Hora.
    Chave única após o uso será deletada.`);

        /**
         * Retorna o csrf gerado.
         */
        res.cookie('CSRF-TOKEN-AUTH', csrfgerated, { maxAge: 3600000, httpOnly: true });

        fs.writeFileSync(config.logs.csrf + `/${csrfgerated}.csrf`, '');
        return "OK"
    } catch (e) {
        log('Erro ao tentar gerar token csrf: ' + e, 0, e)
        return "ERROR"
    }
}

async function ValiteCsrf(res, req, token) {
    try {
        if (!token) {
            // Criar a correntUrl com a URL atual
            const correntUrl = req.originalUrl;
            return res.redirect(`/csrf-render/?correntUrl=${correntUrl}`);
        };
        /**
         *  Verifica se o token existe na pasta de tokens
         */
        const tokenFiles = fs.readdirSync(config.logs.csrf);
        if (tokenFiles.includes(`${token}.csrf`)) {
            /**
             * Se o token for encontrado, exclui o token antigo
             */
            tokenFiles.forEach((file) => {
                if (file === token) {
                    fs.unlinkSync(config.logs.csrf + '/' + file);
                }
            });
            /**
             * Remove o cookie antigo (se existir)
             */
            res.clearCookie('CSRF-TOKEN-AUTH');

            /**
             * Cria o token novo, para a proxima solicitação
             */
            await CreateCsrf()

            return 'OK'
        } else {
            return 'CSRF Inválido!';
        }
    } catch (e) {
        log('Erro ao tentar validar um token csrf: ' + e, 0, e)
        return "ERROR"
    }
}

export { CreateCsrf, ValiteCsrf }