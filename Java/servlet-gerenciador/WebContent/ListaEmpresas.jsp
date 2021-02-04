<%@page import="java.util.List"%>
<%@page import="br.com.alura.gerenciador.model.Empresa"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%>

    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Lista de Empresas</title>
</head>
<body>

	Lista de empresas: <br />
	
	
	<ul>
		<c:forEach items="${ empresas }" var="empresa">
		
		<li>
			${ empresa.nome } - <fmt:formatDate value="${ empresa.dataAbertura }" pattern="dd/MM/yyyy"/> 
			<a href="/servlet-gerenciador/entrada?acao=mostra-empresa&id=${ empresa.id }">editar</a> 
			<a href="/servlet-gerenciador/entrada?acao=remove-empresa&id=${ empresa.id }">remover</a>
		</li>
		</c:forEach>
	</ul>
	
	
	
	<%-- <ul>
	
		<%
			List<Empresa> lista = (List<Empresa>)request.getAttribute("empresas");
			for (Empresa empresa : lista) {
		%>
			<li><%= empresa.getNome() %></li>
		<%
			}
		%>
	
	</ul>
 --%>
 
</body>
</html>