package br.com.testesAula;

import java.util.HashSet;
import java.util.Set;

public class TestaSet {

	public static void main(String[] args) {
		//Conjunto
		//Não possui ordem, porém não aceita elementos repetidos. Garante que tenhamos objetos unicos
		Set<String> alunos = new HashSet<>();
		
		alunos.add("Rodrigo Turini");
		alunos.add("Alberto Souza");
		alunos.add("Nico Steppat");
		alunos.add("Sergio Lopes");
		alunos.add("Renan Saggio");
		alunos.add("Mauricio Aniche");
		alunos.add("Mauricio Aniche");
		alunos.add("Mauricio Aniche");
		alunos.add("Mauricio Aniche");
		alunos.add("Mauricio Aniche");
		//só irá aparecer um "Mauricio Aniche"
		
		System.out.println(alunos);
		alunos.forEach(aluno -> System.out.println(aluno));
		
	}

}
