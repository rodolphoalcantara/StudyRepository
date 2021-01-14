# Anotações de Estudos com Java

## JUnit

Ideia por tras dos Testes:

1.*Pensar em um cenário*

2.*Executar uma ação*

3.*Validar saída*

Para validarmos nossas ideias usamos a biblioteca JUnit. Para adicionar como dependencia do projeto, basta adicionarmos *Library* no nosso *Build Path*.

`Botão direito no projeto > Build Path > Add Libraries...`

Para que o JUnit entenda que nossa classe é um teste automatizado, devemos mudar a sua assinatura. O método main não pode ser *static*, não receber argumentos e ter a anotação __@Test__.

Ex.:

`@Test` 

`public void main(){ */Teste Aqui/* }`


## Servlets

O servlet é uma classe Java que serve como um pequeno servidor (por isso o nome) responsável por receber requisições HTTP e dar uma resposta ao cliente.

Existe diversos Servlets Containers no mundo Java, porém o mais famoso é o __*Apache Tomcat*__.

Para que uma classe seja considerada uma Servlet ela deve ser uma classe que herda a classe *HttpServlet* do pacote *javax.servlet* e também precisa implementar o método abstrato `service()`.

O método `service()` recebe como parametro uma `HttpServletRequest request` e  `HttpServletResponse response`. Esses parametros serão utlizados para