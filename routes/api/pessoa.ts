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

class PessoaApiRoute {
	@app.http.post()
	public async criar(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let paciente = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!paciente) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!paciente.PaciNom) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!paciente.PaciNum) {
			res.status(400);
			res.json("Numero inválido");
			return;
		}

		if (!paciente.PaciCPF) {
			res.status(400);
			res.json("CPF inválido");
			return;
		}

		if (!paciente.PaciEnd) {
			res.status(400);
			res.json("Endereço inválido");
			return;
		}
		if (!paciente.PaciEma) {
			res.status(400);
			res.json("E-mail inválido");
			return;
		}
		
		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO cadastro_p (PaciNom, PaciNum, PaciCPF, PaciEnd, PaciEma, PaciCon) VALUES (?, ?, ?, ?, ?, ?)", [paciente.PaciNom, paciente.PaciNum, paciente.PaciCPF, paciente.PaciEnd, paciente.PaciEma, paciente.PaciCon]);

		});

		res.json(true);
	}

}

export = PessoaApiRoute;
