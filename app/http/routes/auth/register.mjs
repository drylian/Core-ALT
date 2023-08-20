import express from 'express';
import bcrypt from 'bcrypt';
import { db } from '../../../controllers/sequelize.mjs';
import { controller } from '../../../controllers/loggings.mjs';
const core = (level, message) => controller[level]("Express-WEB", message, "gray");
import { genv5 } from '../../../utils/uuidGen.mjs';

const router = express.Router();

// Rota de registro
router.post('/', async (req, res) => {
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
            uuid: genv5(email, "users")
        });


        core("log", `Novo usuário foi criado : "${newUser.username}"`)

        return res.json({ message: "Sucesso ao criar o usuário", ...newUser });
    } catch (error) {
        core("err", `Erro ao tentar registrar um usuário : "${error.stack}"`)
        return res.status(500).json({ message: 'Erro ao registrar' });
    }
});

export default router;
