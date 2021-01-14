package br.com.testesAula;

import br.com.gerenciadorDeCursos.Aula;
import br.com.gerenciadorDeCursos.Curso;

public class TestaCurso {

	public static void main(String[] args) {

		Curso javaColecoes = new Curso("Dominando as cole��es Java", "Paulo Silveira");

		// javaColecoes.getAulas().add(new Aula("Trabalhando com ArrayList", 21));
		// lan�a execess�o, pois a responsabilidade de modificar um atributo � da
		// propria classe. Foi usado no metodo getAulas programa��o defensiva.
		
		javaColecoes.adiciona(new Aula("Trabalhando com ArrayList", 21));
		javaColecoes.adiciona(new Aula("Criando uma Aula", 20));
		javaColecoes.adiciona(new Aula("Modelando com cole��es", 22));

		System.out.println(javaColecoes.getAulas());
		
		
	}

}
