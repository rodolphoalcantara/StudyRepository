# HTML5 e CSS3

## HTML5

### Estrutura Básica

A primeira linha do arquivo HTML deverá ser `<!DOCTYPE html>`, esta tag diz ao navegador que o arquivo que está sendo lido é do tipo HTML5.

 - `<html>`
    > A tag html é a raiz do seu documento, nela deverá conter todos os elementos HTML. É nesta tag que passamos o atributo lang e informamos qual o idioma do nosso documento. No caso do Brasil o valor do atributo lang será "pt-BR"

 - `<head>`
    > É a tag que contém os elementos lidos pelo navegador, como os metadados. Um exemplo de metadados é expressado pela tag charset que define o conjunto de caracteres do documento, o mais comum é a UTF-8, além do charset também temos a tag script onde podemos linkar, por exemplo, scripts em Javascript, as tags style e link onde podemos linkar nosso documento a arquivos CSS, e a tag title onde colocamos o titulo da página (O que irá aparecer na aba do navegador). 

    > OBS.: Podemos abrir e fechar as tags script e style, e escrever nosso código dentro caso não queiramos criar um outro arquivo. 

 - `<body>`
    > É dentro desta tag que colocamos todo o conteúdo visível que será apresentado ao nosso usuário. Como por exemplo: texto, imagens, vídeos.


### Semântica

Para que não haja mais documentos cheios de divs (div é uma tag genérica para uma divisão) o HTML5 trouxe algumas tags semânticas para que possamos descrever precisamente nosso conteúdo.

 - `<section>`
    > representa uma seção genérica de conteúdo.

 - `<header>`
    > representa o cabeçalho, seja da página ou de uma seção, e normalmente contém logotipos, menus, campos de busca.

 - `<article>`
    > representa um conteúdo idependente e com um grau de importancia maior, como um post de blog ou uma notícia.

 - `<aside>`
    > representa uma seção que engloba conteúdos relacionados ao conteúdo principal. Normalmente são representadas como barras laterais.

 - `<footer>`
    > representa o rodapé, seja da pagina ou de uma seção, normalmente nele contém informações do autor e links relacionados.