import db from "./controllers/sequelize.mjs";

async function someFunction() {
	try {

		// Agora você pode usar os modelos
		const User = await db.User();
		// Execute as operações que você precisa fazer com o modelo User
		// Por exemplo, crie um novo usuário no banco de dados:
		const newUser = await User.create({
			permissions: 10,
			username: "admin",
			email: "admin@gmail.com",
			password: "admin",
		});

		console.log("Novo usuário criado:", newUser.toJSON());
	} catch (error) {
		console.error("Erro ao realizar operações:", error);
	}
}

someFunction();
