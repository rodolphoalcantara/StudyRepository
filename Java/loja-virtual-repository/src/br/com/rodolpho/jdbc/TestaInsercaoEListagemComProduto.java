package br.com.rodolpho.jdbc;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import br.com.rodolpho.jdbc.dao.ProdutoDAO;
import br.com.rodolpho.jdbc.model.Produto;

public class TestaInsercaoEListagemComProduto {

	public static void main(String[] args) throws SQLException {
		Produto comoda = new Produto("Cômoda","Cômoda Vertical");
		
		try(Connection connection = new ConnectionFactory().recuperarConexao()){
			ProdutoDAO pDAO = new ProdutoDAO(connection);
			pDAO.salvar(comoda);
			
			List<Produto> produtos = pDAO.listar();
			
			produtos.stream().forEach(p -> System.out.println(p));
			
		}
	}

}
