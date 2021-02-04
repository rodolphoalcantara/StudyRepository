package br.com.alura.gerenciador.acao;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.alura.gerenciador.model.Banco;

public class RemoveEmpresa {
	
	public void executa(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("removendo empresa");
		
		String paramId = request.getParameter("id");
		Integer id = Integer.valueOf(paramId);
		
		Banco banco = new Banco();
		banco.removeEmpresa(id);
		
		response.sendRedirect("entrada?acao=lista-empresas");
		
	}

}
