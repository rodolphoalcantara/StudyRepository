package br.com.rodolpho.jdbc;
import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class ConnectionFactory {
	
	public DataSource dataSource;
	
	public ConnectionFactory() {
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		cpds.setJdbcUrl("jdbc:mysql://localhost/loja_virtual?useTimezone=true&serverTimezone=UTC");
		cpds.setUser("root");
		cpds.setPassword("root");
		cpds.setMaxPoolSize(15);
		
		this.dataSource = cpds;
	}
	
	
	
	
	
	public Connection recuperarConexao() throws SQLException {
		
		return this.dataSource.getConnection();
			
	}

}
