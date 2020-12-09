class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  /* obterNegociacoes(urls) {

    return Promise.all(
      urls.forEach(url => {
        this._http
        .get(url)
        .then(negociacoes =>{
          return negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
        })
        .catch(error =>{
          console.log(error)
          throw new Error('Não foi possível obter as negociações')
        });
      })
    )
    //.reduce((flat, array) => flat.concat(array), []);
  } */

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


}