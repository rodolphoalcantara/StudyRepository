class NegociacaoController {

  constructor() {
    // o metodo bind passando document como parametro, faz com que o querySelector continue pertencendo ao
    //document mesmo que agora dentro de uma variavel.
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputAmount = $('#quantidade');
    this._inputValue = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'add', 'clear', 'sortList', 'revertSort');

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'text');

    this._actualOrder = '';

    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listAll())
      .then(negociacoes => 
        negociacoes.forEach(negociacao => 
          this._listaNegociacoes.add(negociacao)))
      .catch(error => {
        console.log(error);
        this._mensagem.text = error;
      })
  }

  add(event) {
    event.preventDefault();

    ConnectionFactory
      .getConnection()
      .then(connection => {
        let negociacao = this._createNegociacao();
        new NegociacaoDao(connection)
          .add(negociacao)
          .then(() => {
            this._listaNegociacoes.add(negociacao);
            this._mensagem.text = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
          })
        })
      .catch(error => this._mensagem.text = error);
    }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ]).then(negociacoes => {
      negociacoes
      .reduce((flatArray, array) => flatArray.concat(array) , [])
      .forEach(negociacao => this._listaNegociacoes.add(negociacao))
      this._mensagem.text = 'Negociações da semana obtida com sucesso.'
    }).catch(
      error => this._mensagem.text = error
    );
  }

  delete() {

    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.clearAll())
      .then(mensagem => {
        this._mensagem.tet = mensagem
        this._listaNegociacoes.clear();
      })
  }

  _createNegociacao() {
    return new Negociacao(
      DateHelper.convertForDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value)
    );

  }
  _limpaFormulario() {
    this._inputDate.value = '';
    this._inputAmount.value = 1;
    this._inputValue.value = 0.0;

    this._inputDate.focus();
  }

  sortList(column){
    if(this._actualOrder == column){
      this._listaNegociacoes.revertSort();
    }else{
      this._listaNegociacoes.sortList((a,b) => a[column] - b[column])
    }
    this._actualOrder = column;
  }
}