import express from 'express';
import jwt from 'jsonwebtoken';
import { json } from '../../../utils/json.mjs';
import configuractions from "../../../controllers/settings/Default.mjs"
import { controller } from '../../../controllers/loggings.mjs';
const core = (level, message) => controller[level]("Express-WEB", message, "gray");
const router = express.Router();
import { db } from '../../../controllers/sequelize.mjs';
const User = db.User()
// Rota de Verificação , se o token é valido
router.post('/', async (req, res) => {

    const config = json(configuractions.configPATH + "/settings.json")
    console.log(req.headers.alternightuser)
    const { alternightuser } = req.headers;

    if (!alternightuser) {
        return res.sendStatus(401);
    }

    const [, token] = alternightuser.split(' ');

    if (!token) {
        return res.status(401).json({ message: 'Token ausente' });
    }

    jwt.verify(token, config.server.accessTokenSecret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        } else {
            if (decoded.username) {
                const user = await User.findOne({ where: { username: decoded.username } }) || await User.findOne({ where: { email: decoded.email } });;
                return res.json({ user, token });
            }
            return res.status(401).json({ message: 'Informações invalidas' });
        }
    });
});

export default router;