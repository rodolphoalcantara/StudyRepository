<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:url value="/entrada" var="linkEntradaServlet"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<form action="${linkEntradaServlet}" method="post">
	
	Nome: <input type="text" name="nome"/>
	Data de Abertura: <input type="text" name="data"/>
	
	<input type="hidden" value="nova-empresa">

	<input type="submit"/>
	
	
	</form>


</body>
</html>