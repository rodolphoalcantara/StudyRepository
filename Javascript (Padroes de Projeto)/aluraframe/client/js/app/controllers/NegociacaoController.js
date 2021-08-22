'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
  "use strict";

  var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function currentInstance() {
    return negociacaoController;
  }

  _export('currentInstance', currentInstance);

  return {
    setters: [function (_modelsListaNegociacoes) {
      ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
    }, function (_modelsMensagem) {
      Mensagem = _modelsMensagem.Mensagem;
    }, function (_viewsNegociacoesView) {
      NegociacoesView = _viewsNegociacoesView.NegociacoesView;
    }, function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.MensagemView;
    }, function (_servicesNegociacaoService) {
      NegociacaoService = _servicesNegociacaoService.NegociacaoService;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.DateHelper;
    }, function (_helpersBind) {
      Bind = _helpersBind.Bind;
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

      NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          // o metodo bind passando document como parametro, faz com que o querySelector continue pertencendo ao
          //document mesmo que agora dentro de uma variavel.
          var $ = document.querySelector.bind(document);
          this._inputDate = $('#data');
          this._inputAmount = $('#quantidade');
          this._inputValue = $('#valor');

          this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'clear', 'sortList', 'revertSort');

          this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'text');

          this._actualOrder = '';
          this._service = new NegociacaoService();

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._service.list().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.add(negociacao);
              });
            }).catch(function (error) {
              return _this._mensagem.text = error;
            });

            setInterval(function () {
              _this.importaNegociacoes();
            }, 3000);
          }
        }, {
          key: 'add',
          value: function add(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._createNegociacao();

            this._service.register(negociacao).then(function (mensagem) {
              _this2._listaNegociacoes.add(negociacao);
              _this2._mensagem.text = mensagem;
              _this2._limpaFormulario();
            }).catch(function (error) {
              return _this2._mensagem.text = error;
            });
          }
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            var _this3 = this;

            this._service.import(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                _this3._listaNegociacoes.add(negociacao);
                _this3._mensagem.texto = 'Negociações do período importadas';
              });
            }).catch(function (erro) {
              return _this3._mensagem.texto = erro;
            });
          }
        }, {
          key: 'delete',
          value: function _delete() {
            var _this4 = this;

            this._service.clear().then(function (msg) {
              _this4._mensagem.text = msg;
              _this4._listaNegociacoes.clear();
            }).catch(function (error) {
              return _this4._mensagem.text = error;
            });
          }
        }, {
          key: '_createNegociacao',
          value: function _createNegociacao() {
            return new Negociacao(DateHelper.convertForDate(this._inputDate.value), parseInt(this._inputAmount.value), parseFloat(this._inputValue.value));
          }
        }, {
          key: '_limpaFormulario',
          value: function _limpaFormulario() {
            this._inputDate.value = '';
            this._inputAmount.value = 1;
            this._inputValue.value = 0.0;

            this._inputDate.focus();
          }
        }, {
          key: 'sortList',
          value: function sortList(column) {
            if (this._actualOrder == column) {
              this._listaNegociacoes.revertSort();
            } else {
              this._listaNegociacoes.sortList(function (a, b) {
                return a[column] - b[column];
              });
            }
            this._actualOrder = column;
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map