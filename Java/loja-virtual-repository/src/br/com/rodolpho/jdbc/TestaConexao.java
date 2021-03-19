package br.com.rodolpho.jdbc;
import java.sql.Connection;
import java.sql.SQLException;

public class TestaConexao {

	public static void main(String[] args) throws SQLException {
			
		Connection connection = new ConnectionFactory().recuperarConexao();
		
		
		connection.close();
		
	}

}
