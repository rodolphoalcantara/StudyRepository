# Entity

## Instalando Entity Framework

Devemos instalar o Entity Framework a partir do nosso gerenciador de pacotes para que possamos utilizar em nosso projeto.

Para isso, abra o console do gerenciador de pacotes e execute este comando.

```cmd
    Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 1.1
```

Ou 

```cmd
    dotnet add package EntityFramework --version 6.4.4
```

___

## Configurando Entity Framework

Para começarmos a trabalhar com o Entity Framework precisamos configula-lo em nosso projeto.

Para instalarmos no projeto basta utilizar o gerenciador de pacotes NuGet.
PM > Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version *1.1* *(Versao que queira instalar, nao passar o argumento **-Version** faz com que seja instalado o mais recente)*

Depois de instalar, será necessário criar uma classe de contexto para que possamos configurar o Entity com nosso Banco de dados.

Para isto basta criar uma classe que extende *Microsoft.EntityFrameworkCore.**DbContext***.

Esta classe será responsavel por setar nossas tabelas do banco e onde esse banco se encontra, bem como seu provider, ou seja, qual banco estamos nos conectando.

Veja abaixo um exemplo de uma classe de contexto.

```C#
using Microsoft.EntityFrameworkCore;
using System;

namespace Alura.Loja.Testes.ConsoleApp
{
    internal class LojaContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; } //deverá ter o nome da tabela do banco de dados

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=LojaDB;Trusted_Connection=true;");
        }
    }
}
```

Desta forma já estamos aptos a instanciar a classe de contexto e utiliza-la para persistencia de dados nas nossas tabelas.

___

## Operações CRUD

### Create

Para que possamos adicionar um item a uma tabela do nosso banco de dados usando Entity Framework, temos que instanciar nosso contexto e a partir dos metodos do nosso contexto solicitarmos uma operação de persistencia.

Para adicionar um item a nossa tabela basta utilizarmos o exemplo de código a seguir.

```C#
    using(var contexto = new ExemploContext()){
        contexto.TabelaExemplo.Add(produtoExemplo);
        contexto.SaveChanges();
    }
```

Esse código acima instancia um contexto *ExemploContext* e utiliza esse contexto para persistir na tabela *TabelaExemplo* por meio do método *Add* o produto *produtoExemplo*.


É possível também salvar objetos em sequencia sem precisar comandar diversas adições _(Add)_.

Utilizando o _.AddRange(... Object obj)_ é possível passar varios objetos que serão inseridos na tabela.

```C#
    using(var contexto = new ExemploContext()){
        contexto.TabelaExemplo.AddRange(produtoExemplo1, produtoExemplo2, produtoExemplo3);
        contexto.SaveChanges();
    }
```


### Read

Podemos também listar muito facilmente todos os itens de nossa tabela. Basta utilizarmos o exemplo de código a seguir.

```C#
    using(var contexto = new ExemploContext())
    {
        IList<Exemplo> exemplos = contexto.TabelaExemplo.ToList();
        foreach(var item in exemplos)
        {
            Console.WriteLine(item.Nome);
        }
    }
```

Este código utiliza apenas o método *ToList* do nosso contexto para retornar uma lista de exemplos.

É possível retornar o primeiro item da tabela utilizando o seguinte código:

```C#
    using(var contexto = new ExemploContext())
    {
        Exemplo exemplo = contexto.TabelaExemplo.First();
    }
```


### Update

```C#
    using(var contexto = new ExemploContext())
    {
        Exemplo exemplo = contexto.TabelaExemplo.First();

        exemplo.Atributo1 = "Valor editado";

        contexto.TabelaExemplo.Update(exemplo);
        contexto.SaveChanges();
    }
```

### Delete

Para remover itens de nossa tabela podemos usar o método _.Remove(T item)_ da nossa tabela do contexto.

Dessa forma podemos ter um código parecido com este:

```C#
    using(var contexto = new ExemploContext()){
        contexto.TabelaExemplo.Remove(produtoExemplo);
        contexto.SaveChanges();
    }
```

Podemos também remover todos os itens de uma lista e salvar as alterações apenas no final.

```C#
    using(var contexto = new ExemploContext())
    {
        IList<Exemplo> exemplos = contexto.TabelaExemplo.ToList();
        foreach(var item in exemplos)
        {
            contexto.TabelaExemplo.Remove(item);
        }
        contexto.SaveChanges();
    }
```

___

## Estados da Entidade

![Diagrama de Estados da Entidade](diagrama-estados-entidade.png)

### Added
O objeto é novo, foi adicionado ao contexto, e o método SaveChanges ainda não foi executado. Depois que as mudanças são salvas, o estado do objeto muda para Unchanged. Objetos no estado Added não têm seus valores rastreados em sua instância de EntityEntry.

### Deleted
O objeto foi excluído do contexto. Depois que as mudanças foram salvas, seu estado muda para Detached.

### Detached
O objeto existe, mas não está sendo monitorado. Uma entidade fica nesse estado imediatamente após ter sido criada e antes de ser adicionada ao contexto. Ela também fica nesse estado depois que foi removida do contexto através do método Detach ou se é carregada por um método com opção NoTracking. Não existem instâncias de EntityEntry associadas a objetos com esse estado.

### Modified
Uma das propriedades escalares do objeto foi modificada e o método SaveChanges ainda não foi executado. Quando o monitoramento automático de mudanças está desligado, o estado é alterado para Modified apenas quando o método DetectChanges é chamado. Quando as mudanças são salvas, o estado do objeto muda para Unchanged.

### Unchanged
O objeto não foi modificado desde que foi anexado ao contexto ou desde a última vez que o método SaveChanges foi chamado.

___

