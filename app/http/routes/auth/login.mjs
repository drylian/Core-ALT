import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../../../controllers/sequelize.mjs';
import { json } from '../../../utils/json.mjs';
import configuractions from "../../../controllers/settings/Default.mjs"
import { controller } from '../../../controllers/loggings.mjs';
const core = (level, message) => controller[level]("Express-WEB", message, "gray");
const router = express.Router();

// Rota de autenticação
router.post('/', async (req, res) => {
    const config = json(configuractions.configPATH + "/settings.json")
    const User = db.User()
    try {
        // Procura o usuário pelo usuário ou email
        const user = await User.findOne({ where: { username: req.body.user } }) || await User.findOne({ where: { email: req.body.user } });;

        // Verifica se o usuário existe e se a senha está correta
        if (user && bcrypt.compareSync(req.body.pwd, user.password)) {
            const AcessToken = jwt.sign({ id: user.id, email: user.email, username: user.username, uuid: user.uuid }, config.server.accessTokenSecret, { expiresIn: 15 * 60 });
            const rememberToken = jwt.sign({ email: user.email, username: user.username }, config.server.refreshTokenSecret, { expiresIn: 7 * 24 * 60 * 60 });

            await User.update({ remember: rememberToken }, { where: { id: user.uuid } });

            return res.json({user ,token: AcessToken, remember: rememberToken });

        } else {
            return res.status(401).json({ message: 'Usuário/email ou senha ínvalidos.' });
        }

    } catch (error) {
        core("err", `Erro ao autenticar um usuário : "${error.stack}"`)

        return res.status(500).json({ message: 'Erro ao autenticar' });
    }
});

export default router;

