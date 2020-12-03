/* GET: USADO PARA BUSCAR INFORMAÇÃO DO BACKEND, 
POST: CRIAR NOVA INFORMAÇÃO NO BACKEND, 
PUT: EDITAR ALGUMA INFORMAÇÃO DO BACKEND, 
DELETE: EXCLUIR INFORMAÇÃO DO BACKEND
 */

//ROTA
    //req.query = acessar query params(para filtros)
    //req.params = Acessar route params(para edição, delete)
    //req.body = acessar corpo da requisição (para criação, edição)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const routes = require('./routes');

//cria aplicação
const app = express();

mongoose.connect('mongodb+srv://rooalcantara:Ro122329@projetostackjs.gpubk.mongodb.net/ProjetoStackJS?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
