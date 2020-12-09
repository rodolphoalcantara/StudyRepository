# Anotações

## API Reflection


objeto Reflect

usado para dar métodos para operações interceptáveis

_Reflect.apply("metodo a ser chamado", "contexto em que quero executar uma função", [qual os parametros que a função recebe (__em um array__])_

ex.:
`Reflect.apply(this._trap, this._context, [this])`



----------------------------------------------------------------------------------------------------

## Proxy


encapsula um objeto sendo possível passar métodos _trap_ que serão executados antes de acessar o objeto original

_new Proxy(__target__,__handler{}__)_

para interceptar uma operação de leitura do meu objetor _target_ de um proxy, devo passar uma função no meu _handler{}_ que receberá três parametros.

_{ get: function(__target__, __prop__, __receiver__){} }_


parameters:

*target*: referencia ao obj original que o proxy está encapsulando

*prop*: a propriedade que está sendo acessada

*receiver*: e uma referencia para o proprio proxy


ex.:

class Exemplo{
    
    let negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {
        //função que será executada quando houver operação de leitura "get"
        get: function(target, prop, receiver){
            console.log(``a propriedade "${prop}" foi interceptada);
            //deverá retornar um Reflect da solicitação de leitura da propriedade, se não o valor retornado é undefined (neste caso)
            return Reflect.get(target, prop, receiver);
        }
    })
    negociacao.quantidade
};

__saída:__ 
a propriedade "quantidade" foi interceptada

a propriedade "_quantidade" foi interceptada

1


`não há uma maneira de interceptar um método/função com o Proxy, somente propriedades que são lidas(get) e atribuidas(set)`

Quando um método é chamado o *Javascript* chama um *getter* lê e chama um *Reflect.apply*.

Sabendo disso podemos utilizar o getter para receber uma string com o nome do método e verificar se contem em nossa classe.

Ao verificar se existe este metodo em nossa classe, o substituimos pela nossa trap.

ex.:

class Exemplo {

    let negociacao = new Proxy(new ListaNegociacoes(), {
        //função que será executada quando houver operação de leitura (get) do nosso método
        get: function(target, prop, receiver){
            //testamos se esta leitura é de um método em nossa classe
            //usamos um array para passar as string dos nomes de métodos que queremos verificar se é igual ao nosso prop
            //e depois comparamos se o tipo da prop do nosso target é igual ao tipo da função Function função presente no javascript
            if(['adiciona', 'esvazia']).includes(prop) && typeof(target[prop]) == typeof(Function)){

                //retornamos uma function para substituir no Proxy o método que estamos lendo pelo get
                return function(){

                    console.log(`interceptando ${prop});
                    //chamamos o metodo apply de Reflect para aplicar o novo método com as mesmas condições do método que queremos substituir.
                    //target[prop]: é o método que queremos chamar | target: é o contexto para a função | arguments: é um array com os parametros passados.
                    Reflect.apply(target[prop], target, arguments)
                }
            }
            //caso não seja um método retorna apenas a leitura
            return Reflect.get(target, prop, receiver);
        }
    })
    negociacao.adiciona(new Negociacao(new Date(), 1, 100))
};


----------------------------------------------------------------------------------------------------

## Programação "Defensiva"

Ao criar um novo objeto passando o valor obtido do metodo getTime do objeto enviado por parametro
do construtor. Evita que esse parametro seja alterado em algum momento, alterando assim a data da 
classe que está sendo criada.

`this._data = new Date(data.getTime());`

"congela" a instancia não deixando alterar diratemente seus atributos.

`Object.freeze(this);`


----------------------------------------------------------------------------------------------------

## Requisição com AJAX

`let xhr = new XMLHttpRequest`

Para instanciar o objt XMLHttpRequest em uma variavel


Para que a requisição AJAX começe deve-se chamar o metodo open e passar como parametro o metodo HTTP e a rota que queremos acessar, *como string*

`xhr.open('GET', 'negociacoes/semana');`


o metodo onreadystatechange executa toda a vez que ocorre uma mudança no estado na requisição AJAX

`xhr.onreadystatechange = () => {}`

*Status da requisição*

*0: req ainda n iniciada*

*1: conexão com o servidos estabelecida*

*2: req recebida*

*3: processando req*

*4: req concluída e resposta pronta*

Para que aconteça de fato o envio da requisição deve-se chamar o metodo sendo sem nenhum parametro



----------------------------------------------------------------------------------------------------

## Promises

a classe *Promise* é utilizada quando queremos processar métodos assíncronos. 

A *Promise* é uma promessa de um resultado futuro, que pode ser resolvido ou rejeitado.

A classe recebe como parametros _resolve_ e _reject_ que irão determinar o que acontecerá.

Para o parâmetro _resolve_ devemos passar exatamente o que queremos que seja realizado caso de certo.

Para o parâmetro _reject_ devemos passar exatamente o que queremos que seja realizado caso de errado.

Para que o método assíncrono seja testado devemos usar os métodos _.then()_ e _.catch()_

O método _.then()_ irá executar caso nossa *Promise* seja `bem` sucedida, e tudo o que foi passado para o parâmetro resolve será executado.

O método _.catch()_ irá executar caso nossa *Promise* seja `mal` sucedida, e tudo o que foi passado para o parâmetro reject será executado.

`Exemplo de código:`

*método que queremos que seja uma Promise*

class NegociacaoService {

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {

                    resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana');
                    }
                }
            };
            xhr.send();
        });
    }
}

*Chamando o método que criamos como Promise*

class Exemplo{

    importaNegociacoes() {

    let service = new NegociacaoService();

    let promise = service.obterNegociacoesDaSemana();
    promise
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociação da semana obtida com sucesso';
        });
    }
}

#### Método estático .all

O método estático _.all()_ da classe *Promise* serve caso você queira executar diversas *Promises* em ordem.

O parâmetro que o método _.all()_ recebe é uma lista de *Promises*, ou seja um array.

Dessa maneira você executa todas suas *Promises* na ordem desejada tratando apenas uma vez o seu _.then()_ e seu _.catch()_


`Exemplo de código`
*Utilizando os mesmos métodos que transformamos em Promise no exemplo anterior*


class Exemplo{

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
}



----------------------------------------------------------------------------------------------------


