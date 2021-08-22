# Angular

## Instalação e configuração de ambiente.

Para utilizar todas as features do Angular8+ será necessario realizar a instalação:

 - NodeJs

 - Node Package Manager (npm)

 - Angular CLI

## Modulos e Componentes

 - **angular.json** - responsavel por definir propriedades/funções de inicialização;

 - **Modulos** -> São limitadores de contexto, ou seja, pode possuir diversos elementou ou componentes, porém, estes serão intrinseco aquela situação.
    > Exemplo: uma casa pode ser um modulo que contem dentro dela diversos comodos, que por sua vez tambem funcionam como modulos limitando seus contextos. O modulo quarto poderá conter elementos como cama, penteadeira, televisão, armário. Todos associados ao contexto quarto.

 - **Componentes** -> São pequenas partes dentro do contexto do modulo que darão a "cara" do modulo, que vão compor o modulo.

### Construindo um Componente

Para construir um componente no Angular, devemos criar um arquivo com extensão .ts e seu nome deve preceder o sufixo .component
>Ex  exemplo-componente.component.ts

Após criação do arquivo devemos criar uma classe exportavél, de acordo com o padrão de modulos do nodejs.
>Ex   export class ExemploComponent {}

##### Hooks
Essa classe pode implementar algumas interfaces como **OnChanges** e **OnInit**

*OnInit* é um hook que aciona após o angular realizar todo carregamento inicial. Deve-se implementar o método *ngOnInit()* e descrever o comportamento que queremos executar quando o hook *OnInit* for acionado.

*OnChanges* é um hook que aciona após o angular observar alguma alteração no componente, normamente utilizado quando o valor do componente depende do retorno de um método assíncrono. Deve-se implementar o método *ngOnChanges()* e descrever o comportamento que queremos executar quando o hook *OnChanges* for acionado.



##### Decorator
Além dessas informações, devemos utilizar um _Decorator **@Component**_ para sinalizar que nossa classe é de fato um componente. Esse decorator necessita de dois atributos (metadados) obrigatórios: o *selector* e o *template*/*templateUrl*. O *selector* deverá conter uma string que será a tag de seu componente, o *template* será como o componente será formado (normalmente utilizado quando o templade não passar de poucas linhas de html) e o *templateUrl* deverá conter o caminho do template do nosso componente.


## Recursos Angular

#### Interpolação

é um recurso que visa acessar o valor de uma propriedade, ou seja, ao chamar a propriedade do componente como uma variavel é possível obter o seu valor como retorno.

Ex.:

.ts

    export class AppComponent {
       title = 'titulo';       
       name: string = 'João'   
    }                          


.html 

    {{ name }} -> João


#### One Way Data Binding

Ligação de única via, só ira exibir os valores da propriedade

Representado pelo modulo dentro de colchetes.

Ex.: `<input [ngModule]="name" name="nome">`

#### Two Way Data Binding

Ligação de duas vias, além de exibir os valores da propriedade também poderá alterar esses valores, exibindo assim, em todos os lugares que usam essa propriedade, o valor a medida que o formulario é atualizado.

Representado pelo modulo dentro de parenteses e colchetes.

Ex.: `<input [(ngModule)]="name" name="nome">`

#### Acessando informações de componentes e templates

Muitas vezes armazenamos informações, nos nossos objetos e variaveis, e queremos acessá-los em outro componente.

Para isso podemos utilizar a interpolação.

Se por acaso quisermos acessar uma variavel dentro de um objeto e passa-lo para um atributo de uma tag em nosso template, devemos utilizar outra feature que não a interpolação.

Neste caso, para informarmos o Angular que estamos acessando o valor de uma variavel de template ou de um proprio componente, deve-se envolver o atributo da tag em colchetes.

> Ex:       <img [src] = "imagem.url">     <~ Neste caso "imagem" é uma variavel que está acessando um componente

Podemos também, criar uma variavel dentro do nosso componente que pode receber informações de outros componentes externos a ele. Para que isso seja possível podemos utilizar a notação **@Input** e nossa variavel se torna elegível para receber o valor de outro componente, virando um atributo da nossa tag (seletor) que referencia nosso componente.

