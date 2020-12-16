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
    this._service = new NegociacaoService();
    
    this._init();
  }

  _init(){
    this._service
      .list()
      .then(negociacoes => 
        negociacoes.forEach(negociacao => 
          this._listaNegociacoes.add(negociacao)))
      .catch(error => this._mensagem.text = error)

      setInterval(() => {
        this.importaNegociacoes();
      }, 3000)
  }

  add(event) {
    event.preventDefault();
    let negociacao = this._createNegociacao();

    this._service
      .register(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.add(negociacao)
        this._mensagem.text = mensagem;
        this._limpaFormulario()
      })
      .catch(error => this._mensagem.text = error);
    }

  importaNegociacoes() {
    this._service
    .import(this._listaNegociacoes.negociacoes)
      .then(negociacoes => negociacoes.forEach(negociacao => {
          this._listaNegociacoes.add(negociacao);
          this._mensagem.texto = 'Negociações do período importadas'   
      }))
      .catch(erro => this._mensagem.texto = erro);

  }

  delete() {

    this._service
      .clear()
      .then(msg =>{
        this._mensagem.text = msg
        this._listaNegociacoes.clear();
      })
      .catch(error => this._mensagem.text = error);
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