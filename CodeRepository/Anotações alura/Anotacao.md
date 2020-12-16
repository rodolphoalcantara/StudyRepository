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

## Indexed DB - Conceitos

Para salvarmos dados localmente usamos o __Indexed DB__. Para criarmos o banco localmente na maquina do usuario, devemos chamar o método _.open_ que pertence a *indexedDB* de *window*.

`var openRequest = window.indexedDB.open('bancoLocal', 1)` 

O primeiro parametro é o nome do banco que será aberto, já o segundo é o número da versão do banco.

A variavel que armazenamos a abertura de uma banco com nome e versão definido, agora possui propriedades importantes que serão chamados de acordo com o status da requisição. Essas propriedades são handlers de eventos.

*openRequest.onupgradeneeded = event => {}* -> é executado quando criamos ou alteramos um banco existente. Nesse parametro é importante colocar a criação de uma object store, bem como as lógicas por tras dessa store.

*openRequest.onsuccess = event => {}* -> é executado quando se consegue obter conexão com banco de dados

*openRequest.onerror = event => {}* -> é executado quando houver algum problema com a requisição

No nosso handler *.onupgradedneeded* recebemos o resultado do evento e armazenamos dentro de uma variavel. ex.:

`let myConnection = event.target.result;`

E depois usamos o método *.creatObjectStore*, que essa variavel passou a ter, para criarmos nossa Object Store (onde nossos objetos ficarão armazenados, dentro do nosso banco 'bancoLocal');

`myConnection.createObjectStore('obStore', { autoIncrement: true })`

Esse método cria uma objet store com o nome passado em primeiro parametro e em segundo parametro um parametro opcional, nele pode-se passar um keyPath ou um autoIncrement, esse ultimo usado no exemplo anterior serve para definir automaticamente id's para os objetos adicionados.


Para que possamos acessar nossa store que foi criada com o nome de 'obStore' é necessario uma transação. Essa transação é obtida a partir da nossa conexão. ex.:

`let transaction = connection.transaction(['obStore'], 'readwrite');` -> neste caso estamos declarando-a com let por estar dentro de uma function.

Essa transação recebe uma transação com a conexão. Esse método *.transaction* recebe dois parametros. O primeiro parametro é o nome da nossa store criada anteriormente. E o segundo parametro é o tipo de transação que poderá ser *readwrite para ler e escrever; readonly para apenas ler*

A partir desta transação podemos obter nossa objetcStore que armazenamos em outra variavel.

`let store = transaction.objectStore('obStore');`

Com esta variavel podemos, então, realizar transações de persistência(gravar, incluir, alterar e listar).


A nossa variavel *store* agora possui um método chamado *.openCursor()*, o retorno desse método deve ser armazenado em outra variavel para que possamos apontar para cada objeto dentro da nossa store. Essa nossa nova variavel tambem possui os handlers *onsuccess* e *onerror*. A partir do resultado de evento do handler on sucess podemos criar uma variavel que será o evento atual (no exemplo a seguir chamada de *actual*), ou seja, o objeto apontado pelo ponteiro *cursor.* Nossa variavel *actual* terá o valor do nosso objeto, caso haja algum, ou null, caso não haja nenhum. No final podemos chamar o método *.continue()* da nossa *actual* e assim apontarmos para o próximo objeto.

Assim, podemos passar por cada objeto até chegarmos no valor null, ou seja, até acabar nossos objetos dentro da *store*.

exemplo de código de uma listagem de objetos:

class Teste{

    function listAll(){
        let transaction = connection.transaction(['negociacoes'], 'readwrite');
        let store = transaction.objectStore('negociacoes');
        let cursor = store.openCursor();
        let negociacoes = [];
        cursor.onsuccess = event => {
            let actual = event.target.result;
            if(actual){
                let data = actual.value;
                negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));
                actual.continue();
            }else{
                console.log(negociacoes);
            }
        }
        cursor.onerror = event => {
            console.log(event.target.error.name);
        }
    }
}

_________________________________________________________________________

## Monkey Patch

Simplificando, o __Monkey Patch__ é uma padrão no qual substituímos métodos por outros em determinado momento em nosso código para que alteremos a sua função inicial sem modificarmos a classe na qual ela pertence.

Um exemplo é com o método close de uma conexão. Quando não queremos que essa conexão seja fechada pelo método close *(que pode ser chamado por qualquer um)* e queremos criar um método dentro da classe que foi implementada para criar uma conexão *(fazendo com que a classe seja a única responsavel por fechar a conexão)*, podemos substituir o método close, de uma conexão, por um erro.

Ex.:

class Teste{

    var close = null;
    var connection = null;

    /* Códigos foram escondidos */

    close = connection.close.bind(connection);
    connection.close = function (){
        //monkey patch
        throw new Error('Você não pode fechar diretamente a conexão.')
    }

    /* Códigos foram escondidos */

    static closeConnection() {
        close();
        connection = null;
    }
}

Neste exemplo usamos variaveis __close__ e __connection__ iniciadas como *null* para segurar um estado. Para a variavel *close* passamos o método *.close* no contexto de uma *connection*. E logo após substituimos o método *close* de connection por uma função anonima que lança um erro, fazendo com que quem chame o método close se depare com um erro e não possa prosseguir.

Mais embaixo declaramos uma função estática que será a responsável por fechar a conexão. Nela utilizamos a variavel close, que agora é uma função no contexto de connecção responsavel por executar o método close antes do Monkey Patch.


_________________________________________________

## Modules Pattern

Simplificando, o __Module Pattern__ é um padrão no qual encapsulamos uma classe como retorno de uma função com o nome da classe. O objetivo é fazer com que as variaveis que antes eram globais pertençam a função, não podendo ser chamada por ninguem de fora da função.

Ex.:

var ConnectionFactory = (function () {

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';
    var connection = null;
    var close = null;

    return class ConnectionFactory {
        /*
        Código Omitido
        */
    }
})();

O exemplo acima mostra que toda uma *classe*, *viaveis* e *constantes* estão envolvidos por uma função anonima que está dentro da variavel *ConnectionFactory* que é de mesmo nomes da classe que é o retorno da função.

Isso é importante para que as constantes e variaveis não sejam acessadas por ninguem, apenas pela classe de retorno da função.

A função *ConnectionFactory* não poderia ser chamada, ela precisa ser autodeclarada. Para que isso ocorra devemos usar *()* no final da declaração da função, como podemos ver nos exemplos.

`var funcaoAutodeclarada = function (){ implementação da função }()`<--- Esse abre/fecha parenteses é o responsavel por esta autodeclaração. 

_________________________________________

## Padrão DAO

Simplificando, o padrão __DAO__ (*Data Acess Object*) serve para isolar o código responsável por realizar __operações de persistencia__ (*gravar, incluir, alterar e listar*) ou __operações CRUD__ (*Create, Read, Update e Delete*).

A vantagem é que para a manutenção, o desenvolvedor sabe onde encontrar as operações, não precisando conhecer detalhes da *store* ou do *cursor*.

_____________________________________

## Comparando dois Objetos em Javascript

Assim como em outras linguagens, o Javascript não compara os valores de objetos criados *(apenas de tipos literais)*, ou seja, quando instanciamos uma classe e comparamos com outra classe instanciada em outro variavel, mesmo que as propriedades tenham valores iguais, esta comparação será *false*. Veja código abaixo:

class Teste{

    var hoje = new Date();

    n1 = new Negociacao(hoje, 1, 100)
    n2 = new Negociacao(hoje, 1, 100)

    n1 == n2;
    //qual será o retorno ??
}

O retorno para essa comparação será *false*! Mas porque se temos exatamente a mesma negociação ??

Isso acontece porque ao instanciarmos uma nova Negociação com __new__ a referencia é outra. Os objetos *Negociacao* (n1 e n2) estão "apontando" para referencias diferentes!

Mas há um meio de contornarmos isso, usando o método *.stringfy()* do nosso __JSON__.

Quando transformamos um objeto em string com esse método, podemos comparar diretamente. Pois, conseguimos realizar comparações com tipos literais *(String, Number, ...)*

Veja o exemplo de código a seguir:

class Teste{

    var hoje = new Date();

    n1 = new Negociacao(hoje, 1, 100)
    n2 = new Negociacao(hoje, 1, 100)

    JSON.stringfy(n1) == JSON.stringfy(n2);
    //qual será o retorno ??
}

Neste caso, o retorno da comparação será *true*. Pois, estamos comparando tipos literais *String* de objetos que foram convertidos.

Com isso nosso *"objeto"* ganha um novo superpoder. Como o método *.indexOf()*, utilizado para comparar itens de um array, só compara as referencias de objetos, não conseguiremos utilizar nossa nova solução.

Porém, quando convertemos nosso objeto em *String* podemos utilizar um novo método, que irá atuar como um *.forEach()* em nossos arrays de *String*.

O método *.some()* será responsável por varrer nosso array em busca de uma condição. Quando ele achar o que procuramos ele retornará *true* imediatamente e dará um *break* na procura. Porém, se ele não achar, mesmo depois de varrer todo nosso array, ele retornará *false*.

Veja o exemplo de código a seguir:

class Teste{

    var letras = ['a','b','c','d','e'];

    let comp1 = letras.some(letra => letra == 'c');
    //qual será o retorno ?

    let comp2 = letras.some(letra => letra == 'z')
    //qual será o retorno ?
}

Para a primeira comparação *(comp1)* o retorno será *true*, pois quando nosso método estava varrendo nosso array e chegou na terceira posição, ele satifez a condição *(letra == 'c')* e retornou imediatamente o resultado interrompendo a procura.

Já na segunda comparação *(comp2)* o retorno será *false*, pois, mesmo que percorrido todo array, o método não foi capaz de satisfazer a condição *(letra == 'z')*, porque a letra 'z' não existe em nosso array. E por isso, retornou, no final de sua procura, o resultado *false*.





