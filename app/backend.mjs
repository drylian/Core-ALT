import db from "./controllers/sequelize.mjs";
import { genv5 } from "./utils/uuidGen.mjs";
import bcrypt from 'bcrypt';

async function someFunction() {
	try {
		// Agora você pode usar os modelos
		const User = await db.User();
		// Execute as operações que você precisa fazer com o modelo User
		// Por exemplo, crie um novo usuário no banco de dados:
		const hashedPassword = bcrypt.hashSync("admin", 10);

		const newUser = await User.create({
			permissions: 10,
			username: "admin",
			email: "admin@gmail.com",
			password: hashedPassword,
			uuid: genv5("admin@gmail.com", "users")
		});

		console.log("Novo usuário criado:", newUser.toJSON());
	} catch (error) {
		console.error("Erro ao realizar operações:", error);
	}
}

someFunction();
