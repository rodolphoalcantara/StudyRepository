package br.com.rodolpho.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import br.com.rodolpho.jdbc.dao.CategoriaDAO;
import br.com.rodolpho.jdbc.model.Categoria;
import br.com.rodolpho.jdbc.model.Produto;

public class TestaListagemDeCategorias {

	public static void main(String[] args) throws SQLException {

		try (Connection connection = new ConnectionFactory().recuperarConexao()) {
			CategoriaDAO categoriaDAO = new CategoriaDAO(connection);
			List<Categoria> listaCategoria = categoriaDAO.listarComProdutos();

			listaCategoria.stream().forEach(c -> {
				System.out.println(c.getNome());

				for (Produto produto : c.getProdutos()) {
					System.out.println(c.getNome() + " - " + produto.getNome());
				}

			});
		}
	}

}
