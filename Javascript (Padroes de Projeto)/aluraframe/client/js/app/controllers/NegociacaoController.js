class NegociacaoController {

    constructor(){
        // o metodo bind passando document como parametro, faz com que o querySelector continue pertencendo ao
        //document mesmo que agora dentro de uma variavel.
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputAmount = $('#quantidade');
        this._inputValue = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model)); 
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._createNegociacao());

        this._mensagem.text = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
    }

    delete(){
        this._listaNegociacoes.clear();

        this._mensagem.text = 'Negociações apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

    _createNegociacao(){
        return new Negociacao(
            DateHelper.convertForDate(this._inputDate.value),
            this._inputAmount.value,
            this._inputValue.value
        );

    }
    _limpaFormulario(){
        this._inputDate.value = '';
        this._inputAmount.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}