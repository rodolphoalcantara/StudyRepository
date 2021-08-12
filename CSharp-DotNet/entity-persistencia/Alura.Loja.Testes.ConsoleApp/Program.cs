using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alura.Loja.Testes.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            //GravarUsandoAdoNet();
            //GravarUsandoEntity();
            //RecuperarProdutos();
            //ExcluirProdutos();
            //RecuperarProdutos();
            AtualizarProduto();
        }

        private static void AtualizarProduto()
        {
            //incluir um produto
            GravarUsandoEntity();
            RecuperarProdutos();

            //atualizar o produto
            using (var contexto = new ProdutoDAOEntity())
            {
                Produto primeiro = contexto.Produtos.First();
                primeiro.Nome = "Harry Potter e O prisioneiro de Azkaban";
                contexto.Produtos.Update(primeiro);
                contexto.SaveChanges();
            }
            RecuperarProdutos();
        }

        private static void ExcluirProdutos()
        {
            using (var contexto = new ProdutoDAOEntity())
            {
                IList<Produto> produtos = contexto.Produtos();
                foreach (var item in produtos)
                {
                    contexto.Remover(item);
                }
                contexto.SaveChanges();
            }
        }

        private static void RecuperarProdutos()
        {
            using(var contexto = new LojaContext())
            {
                IList<Produto> produtos = contexto.Produtos.ToList();
                Console.WriteLine("Foram encontrados {0} produto(s).", produtos.Count);
                foreach(var item in produtos)
                {
                    Console.WriteLine(item.Nome);
                }
            }
        }

        private static void GravarUsandoEntity()
        {
            Produto p = new Produto();
            p.Nome = "Harry Potter e a Ordem da Fênix";
            p.Categoria = "Livros";
            p.Preco = 19.89;

            using (var contexto = new LojaContext())
            {
                contexto.Produtos.Add(p);
                contexto.SaveChanges();
            }
        }

        private static void GravarUsandoAdoNet()
        {
            Produto p = new Produto();
            p.Nome = "Harry Potter e a Ordem da Fênix";
            p.Categoria = "Livros";
            p.Preco = 19.89;

            using (var repo = new ProdutoDAO())
            {
                repo.Adicionar(p);
            }
        }
    }
}
