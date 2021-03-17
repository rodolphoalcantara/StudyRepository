package br.com.alura.gerenciador.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import br.com.alura.gerenciador.acao.Acao;
import br.com.alura.gerenciador.acao.AlteraEmpresa;
import br.com.alura.gerenciador.acao.ListaEmpresas;
import br.com.alura.gerenciador.acao.MostraEmpresa;
import br.com.alura.gerenciador.acao.NovaEmpresa;
import br.com.alura.gerenciador.acao.NovaEmpresaForm;
import br.com.alura.gerenciador.acao.RemoveEmpresa;


//@WebServlet(name = "entrada", urlPatterns = { "/entrada" })
public class UnicaEntradaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String paramAcao = request.getParameter("acao");
		
		/*
		 * HttpSession sessao = request.getSession();
		 * 
		 * boolean usuarioNaoEstaLogado = (sessao.getAttribute("usuarioLogado") ==
		 * null); boolean ehUmaAcaoProtegida = !(paramAcao.equals("Login") ||
		 * paramAcao.equals("LoginForm")); if(ehUmaAcaoProtegida &&
		 * usuarioNaoEstaLogado) { response.sendRedirect("entrada?acao=LoginForm");
		 * return; }
		 */
		
		String nomeDaClasse = "br.com.alura.gerenciador.acao." + paramAcao;
		
		String nome;
		try {
			Class<?> classe = Class.forName(nomeDaClasse);
			Acao acao = (Acao) classe.newInstance();
			nome = acao.executa(request, response);
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | ServletException
				| IOException e) {
			throw new ServletException(e);
		}
		
		String[] tipoEEndereco = nome.split(":");
		if(tipoEEndereco[0].equals("forward")) {
			RequestDispatcher rd = request.getRequestDispatcher("WEB-INF/view/" + tipoEEndereco[1]);
			rd.forward(request, response);
		}else {
			response.sendRedirect(tipoEEndereco[1]);
		}
		
		/* Refatorado acima
		 * 
		 * String nome = null; if(paramAcao.equals("lista-empresas")) { ListaEmpresas
		 * acao = new ListaEmpresas(); nome = acao.executa(request, response);
		 * 
		 * } else if(paramAcao.equals("remove-empresa")) { RemoveEmpresa acao = new
		 * RemoveEmpresa(); nome = acao.executa(request, response);
		 * 
		 * } else if(paramAcao.equals("mostra-empresa")) { MostraEmpresa acao = new
		 * MostraEmpresa(); nome = acao.executa(request, response);
		 * 
		 * } else if(paramAcao.equals("altera-empresa")) { AlteraEmpresa acao = new
		 * AlteraEmpresa(); nome = acao.executa(request, response);
		 * 
		 * } else if(paramAcao.equals("nova-empresa")) { NovaEmpresa acao = new
		 * NovaEmpresa(); nome = acao.executa(request, response);
		 * 
		 * } else if(paramAcao.equals("nova-empresa-form")) { NovaEmpresaForm acao = new
		 * NovaEmpresaForm(); nome = acao.executa(request, response);
		 * 
		 * }
		 */
		
		
		
		
		
	}

}
