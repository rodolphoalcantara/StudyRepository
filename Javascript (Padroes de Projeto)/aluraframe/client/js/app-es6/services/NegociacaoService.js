import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
  ]).then(periodos => {
      let negociacoes = periodos
          .reduce((dados, periodo) => dados.concat(periodo), [])
          .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

      return negociacoes;
  }).catch(erro => {
      throw new Error(erro);
  });
} 

  obterNegociacoesDaSemana() {
      return this._http
        .get('negociacoes/semana')
        .then(negociacoes => {
          return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
        })
        .catch(error => {
          console.log(error);
          throw new Error('Não foi possível obter as negociações da semana.');
        })
    };

  obterNegociacoesDaSemanaAnterior() {
      return this._http
        .get('negociacoes/anterior')
        .then(negociacoes => {
          return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
        })
        .catch(error => {
          console.log(error);
          throw new Error('Não foi possível obter as negociações da semana anterior.');
        })
    };

  obterNegociacoesDaSemanaRetrasada() {
      return this._http
        .get('negociacoes/retrasada')
        .then(negociacoes => {
          return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
        })
        .catch(error => {
          console.log(error);
          throw new Error('Não foi possível obter as negociações da semana retrasada.');
        })
  };

  register(negociacao){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.add(negociacao))
      .then(() => 'Negociação adicionada com sucesso')
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível adicionar a negociação')
      })
  }

  list(){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listAll())
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível obter as negociacoes');
      })
  }

  clear(){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.clearAll())
      .then(() => 'Negociações apagadas com sucesso')
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível apagar as negociações')
      })
  }

  import(actualList){
    return this.obterNegociacoes()
      .then(negociacoes => 
        negociacoes.filter(negociacao => 
          !actualList.some(negociacaoExistente => negociacao.isEquals(negociacaoExistente))))
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível buscar negociações para importar')
      })
  }



}