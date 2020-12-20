"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Negociacao", Negociacao = function () {
                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

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


                _createClass(Negociacao, [{
                    key: "isEquals",
                    value: function isEquals(otherNegociacao) {
                        return JSON.stringify(this) == JSON.stringify(otherNegociacao);
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._quantidade * this._valor;
                    }
                }, {
                    key: "data",
                    get: function get() {
                        //programação defensiva para não acessar diretamente a data do objeto
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        return this._valor;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map