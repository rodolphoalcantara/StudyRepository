# Entity

### Configurando Entity Framework

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
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=LojaDB;Trusted_Connection=true;");
        }
    }
}
```

Desta forma já estamos aptos a instanciar a classe de contexto e utiliza-la para persistencia de dados nas nossas tabelas.



### Operações CRUD


Para que possamos adicionar um item a uma tabela do nosso banco de dados usando Entity Framework, temos que instanciar nosso contexto e a partir dos metodos do nosso contexto solicitarmos uma operação de persistencia.

Para adicionar um item a nossa tabela basta utilizarmos o exemplo de código a seguir.

```C#
    using(var contexto = new ExemploContext()){
        contexto.TabelaExemplo.Add(produtoExemplo);
        contexto.SaveChanges();
    }
```

Esse código acima instancia um contexto *ExemploContext* e utiliza esse contexto para persistir na tabela *TabelaExemplo* por meio do método *Add* o produto *produtoExemplo*.

___


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