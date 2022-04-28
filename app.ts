import app = require("teem");

require("dotenv").config({ encoding: "utf8", path: app.currentDirectoryName() + "/../.env" });

app.run({
	// Configurações de acesso ao banco de dados.
	// Mais informações: https://www.npmjs.com/package/mysql2#using-connection-pools
	sqlConfig: {
		connectionLimit: 30,
		waitForConnections: true,
		charset: "utf8mb4",
		host: process.env.clinicaDBHost,
		port: parseInt(process.env.clinicaDBPort),
		user: process.env.clinicaDBUser,
		password: process.env.clinicaDBPass,
		database: process.env.clinicaDBName
	}
});
