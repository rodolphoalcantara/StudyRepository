export class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    add(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    clear() {
        this._negociacoes = [];
    }

    get volumeTotal(){
        return this._negociacoes.reduce((total, neg) => total + neg.volume, 0.0 );
    }

    sortList(criterio){
        this._negociacoes.sort(criterio);
    }
    
    revertSort(){
        this._negociacoes.reverse();
    }
}