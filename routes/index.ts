import app = require("teem");

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async tabela(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let pessoas: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			pessoas = await sql.query("SELECT PaciCod, PaciNom, PaciNum, PaciEma, PaciCon FROM cadastro_p");
			
		});

		let opcoes = {
			pessoas: pessoas
		};

		res.render("index/tabela", opcoes);
	}

	public async criarPessoa(req: app.Request, res: app.Response) {
		res.render("index/criarPessoa");
	}
}

export = IndexRoute;
