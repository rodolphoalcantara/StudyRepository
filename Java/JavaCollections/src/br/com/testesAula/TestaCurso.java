package br.com.testesAula;

import br.com.gerenciadorDeCursos.Aula;
import br.com.gerenciadorDeCursos.Curso;

public class TestaCurso {

	public static void main(String[] args) {

		Curso javaColecoes = new Curso("Dominando as coleções Java", "Paulo Silveira");

		// javaColecoes.getAulas().add(new Aula("Trabalhando com ArrayList", 21));
		// lança execessão, pois a responsabilidade de modificar um atributo é da
		// propria classe. Foi usado no metodo getAulas programação defensiva.
		
		javaColecoes.adiciona(new Aula("Trabalhando com ArrayList", 21));
		javaColecoes.adiciona(new Aula("Criando uma Aula", 20));
		javaColecoes.adiciona(new Aula("Modelando com coleções", 22));

		System.out.println(javaColecoes.getAulas());
		
		
	}

}
