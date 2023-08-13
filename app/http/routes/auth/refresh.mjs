import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../../controllers/sequelize.mjs';
import { controller } from '../../../controllers/loggings.mjs';
const core = (level, message) => controller[level]("Express-WEB", message, "gray");
import { json } from '../../../utils/json.mjs';
import configuractions from "../../../controllers/settings/Default.mjs"
const router = express.Router();

router.post('/', (req, res) => {
    const User = db.User();
    const config = json(configuractions + "/settings.json");
    const refreshToken = req.headers.remember_me?.split(' ')[1];

    if (!refreshToken) {
        return res.status(401).json({ message: 'Token de atualização ausente.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.server.refreshTokenSecret);
        const user = User.find(user => user.id === decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Token de atualização inválido.' });
        }

        const accessToken = jwt.sign({ userId: user.id }, config.server.accessTokenSecret, { expiresIn: '15m' });
        res.json({ accessToken });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token de atualização expirado.' });
        }

        core("err","Erro interno :" + error);
        return res.status(500).json({ message: 'Erro na verificação do token de atualização.' });
    }
});

export default router;
