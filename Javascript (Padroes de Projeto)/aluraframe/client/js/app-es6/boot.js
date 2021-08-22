import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.delete.bind(negociacaoController);