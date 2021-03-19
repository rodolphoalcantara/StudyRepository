package br.com.rodolpho.jdbc;
import java.sql.SQLException;

public class TestaPoolConexoes {

	public static void main(String[] args) throws SQLException {
		
		ConnectionFactory cf = new ConnectionFactory();
		
		for (int i = 0; i < 20; i++) {
			cf.recuperarConexao();
			System.out.println("Conexão de número " + i);
		}

	}

}
