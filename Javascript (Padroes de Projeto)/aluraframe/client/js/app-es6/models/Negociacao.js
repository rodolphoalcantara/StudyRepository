export class Negociacao {

    constructor(data, quantidade, valor) {

        /* programação defensiva
        Ao criar um novo objeto passando o valor obtido do metodo getTime do objeto enviado por parametro
        do construtor. Evita que esse parametro seja alterado em algum momento, alterando assim a data da 
        classe que está sendo criada. */
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;


        //"congela" a instancia não deixando alterar diratemente seus atributos.
        Object.freeze(this);
    }

    // getVolume(){
    get volume(){
        return this._quantidade * this._valor;
    }
    // getData()
    get data(){
        //programação defensiva para não acessar diretamente a data do objeto
        return new Date(this._data.getTime());
    }
    // getQuantidade()
    get quantidade(){
        return this._quantidade;
    }
    // getValor()
    get valor(){
        return this._valor;
    }

    isEquals(otherNegociacao){
        return JSON.stringify(this) == JSON.stringify(otherNegociacao);
    }

}