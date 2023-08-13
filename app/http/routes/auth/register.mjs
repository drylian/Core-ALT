import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../../../controllers/sequelize.mjs';
import { controller } from '../../../controllers/loggings.mjs';
const core = (level, message) => controller[level]("Express-WEB", message, "gray");
import { json } from '../../../utils/json.mjs';
import configuractions from "../../../controllers/settings/Default.mjs"
const router = express.Router();

// Rota de registro
router.post('/', async (req, res) => {
    const config = json(configuractions.configPATH + "/settings.json")
    const { name, email, password } = req.body;
    const User = db.User();

    try {
        // Verifica se o email já está em uso
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        // Cria um hash da senha
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Cria o usuário no banco de dados
        const newUser = await User.create({
            username: name,
            email,
            password: hashedPassword,
        });
        core("log", `Novo usuário foi criado : "${newUser.username}"`)

        // Cria um token JWT para o novo usuário
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, config.server.accessTokenSecret);

        return res.json({ user: newUser, token });
    } catch (error) {
        core("err", `Erro ao tentar registrar um usuário : "${error.stack}"`)
        return res.status(500).json({ message: 'Erro ao registrar' });
    }
});

export default router;
