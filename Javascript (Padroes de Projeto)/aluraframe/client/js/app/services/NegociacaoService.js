'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpService) {
      HttpService = _HttpService.HttpService;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }],
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

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: 'obterNegociacoes',
          value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
              var negociacoes = periodos.reduce(function (dados, periodo) {
                return dados.concat(periodo);
              }, []).map(function (dado) {
                return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
              });

              return negociacoes;
            }).catch(function (erro) {
              throw new Error(erro);
            });
          }
        }, {
          key: 'obterNegociacoesDaSemana',
          value: function obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
              return negociacoes.map(function (obj) {
                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
              });
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana.');
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaAnterior',
          value: function obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
              return negociacoes.map(function (obj) {
                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
              });
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana anterior.');
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaRetrasada',
          value: function obterNegociacoesDaSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
              return negociacoes.map(function (obj) {
                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
              });
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana retrasada.');
            });
          }
        }, {
          key: 'register',
          value: function register(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.add(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso';
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível adicionar a negociação');
            });
          }
        }, {
          key: 'list',
          value: function list() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.listAll();
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociacoes');
            });
          }
        }, {
          key: 'clear',
          value: function clear() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.clearAll();
            }).then(function () {
              return 'Negociações apagadas com sucesso';
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível apagar as negociações');
            });
          }
        }, {
          key: 'import',
          value: function _import(actualList) {
            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !actualList.some(function (negociacaoExistente) {
                  return negociacao.isEquals(negociacaoExistente);
                });
              });
            }).catch(function (error) {
              console.log(error);
              throw new Error('Não foi possível buscar negociações para importar');
            });
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map