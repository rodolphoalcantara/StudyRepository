//LEMBRANDO QUE DEVE-SE CRIAR ARQUIVOS SEPARADOS PARA ORGANIZAÇÃO DOS CÓDIGOS
/* a pasta src deve conter:
./controllers (onde irá ficar os controllers, recebe uma requisição e devolve uma resposta )
./models (onde irá ficar os arquivos das Entidades)
routes.js (onde vai ficar a criação das rotas)
server.js (onde irá ficar a criação das aplicações)
 */

/**
 * Dependencias:
 * yarn add express (microframework node.js)
 * yarn add nodemon -D (para que ele funcione apenas em ambiente de desenvolvimento)
 * yarn add mongoose (biblioteca para trabalhar com os dados do mongoDB)
 * 
 */



//importando o express
const express = require('express');
//criação da aplicação pelo express
const app = express();

/* GET: USADO PARA BUSCAR INFORMAÇÃO DO BACKEND, 
POST: CRIAR NOVA INFORMAÇÃO NO BACKEND, 
PUT: EDITAR ALGUMA INFORMAÇÃO DO BACKEND, 
DELETE: EXCLUIR INFORMAÇÃO DO BACKEND
 */
 
//ROTA
    //req.query = acessar query params(para filtros)
    //req.params = Acessar route params(para edição, delete)
    //req.body = acessar corpo da requisição (para criação, edição)

	//express precisa declarar o uso de json para conseguir //receber arquivos JSON nas requisições.
app.use(express.json());
 
//exemplo de rota usando um método put passando os parametros
//route, e um método de requisição e resposta(neste caso uma arrow
//function
app.put('/users/:id', (req, res) => {
    return res.json({ message: req.params.id });
});

app.listen(3333);

/**********************************************************************/

//cria uma variavel com o metodo Router do express que é responsavel pela criação de rotas
const routes = express.Router();

//exemplo de rota usando a variavel routes criada acima
routes.post('/sessions', SessionController.store);
// metodo post da variavel routes que recebe os parametros
//route, e o método store de um controller (nesse caso do SessionController)


//exportando routes para que a aplicação conheça as rotas
//basta que outro arquivo importe './routes' com o metodo require
module.exports = routes;
//a aplicação precisa passar o import do './routes' como parametro para a aplicação 
//exemplo:
const routes = require('./routes')
app.use(routes);

//deve-se importar o mongoose no arquivo server e nos models que precisem ser gravados no banco de dados
const mongoose = require('mongoose');
//codigo de conexão com o Banco de Dados mongoDB
//o metodo connect do import para o mongoose recebe um parametro String que é disponibilizado pelo
//site do MongoDB Atlas
//alterar o <username> e <password> criados no MongoDB Atlas
//os parametros: useNewUrlParser: true e useUnifiedTopology: true. Configura algumas opções no mongoDB.
mongoose.connect('mongodb+srv://<username>:<passowrd>@projetostackjs.gpubk.mongodb.net/ProjetoStackJS?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//para definir a estrutura da entidade deve criar um Schema
//exemplo:
const UserSchema = new mongoose.Schema({
	//propriedade: tipo primitivo
	name: String,
	email: String,
	age: Number,
	active: Boolean
})

//metodos disponiveis dentros de um Controller
// index: retorna uma listagem, neste caso de sessões
//show: lista uma unica sessão
//store: criar uma sessão
//update: alterar uma sessão
//destroy: excluir uma sessão
//não se deve usar mais de um desses metodos por controller
//se for preciso criar mais um index por exemplo, deve-se criar outro controller especializado
// exemplo de controller:
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({email});
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};

// express não entende o formato Multipart Form que é utilizado para lidar com arquivos
// deve-se dizer sempre ao express quais formatos ele deve utilizar, assim como foi feito com JSON
//cria-se uma pasta chamada config com um arquivo upload.js
//importa o multer (uma lib que lida com MultipartForm ) e passa as configurações em forma de obj
const multer = require('multer');
const path = require('path')

module.exports = {
	//como será o armazenamento, neste caso será feito o armazenamento nos arquivos fisicos da app
    storage: multer.diskStorage({
		//qual pasta sera armazenado| o metodo path.resolve é um metodo que busca o SO onde ta rodando a 
		//app e retorna uma String com os parametros enviados, que é o caminho para uma pasta.
		//pois o tipo de barra, seja \ ou /, muda de acordo com o SO
		//__dirname infoma o diretorio do arquivo atual
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		// informa como será criado o nome do arquivo
		//passa uma arrow function com os parametros: requisição, file(onde será passada todas as 
		// informações do arquivo) e o callback (função que vai ser chamada quando o nome do arquivo estiver pronto)
        filename: (req, file, cb) => {
			//
			const ext = path.extname(file.originalname)
			//
            const name = path.basename(file.originalname, ext);

			//parametros: null(para passar algum tipo de erro), e o nome do arquivo.
			//neste caso para o nome do arquivo foram utilizadas as constantes acima e um numero equivalente 
			//a uma contagem de tempo
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
};

// deve-se importar o multer e a configuração do multer nas suas rotas
//exemplo:
const multer = require('multer');
const uploadConfig = require('./config/upload');

//e criar uma variavel chamada upload que recebe o multer com as configurações
const upload = multer(uploadConfig);

//essa variavel upload será um parametro a ser passado para a rota
//exemplo:
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
//o método upload.single é para uma unica imagem deve-se passar o campo que terá a imagem neste caso 'thumbnail'
//se quiser mais de uma imagem deve-se usar o metodo upload.array