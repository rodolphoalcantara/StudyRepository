package br.com.testesAula;

import java.util.HashSet;
import java.util.Set;

public class TestaSet {

	public static void main(String[] args) {
		//Conjunto
		//N�o possui ordem, por�m n�o aceita elementos repetidos. Garante que tenhamos objetos unicos
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
		//s� ir� aparecer um "Mauricio Aniche"
		
		System.out.println(alunos);
		alunos.forEach(aluno -> System.out.println(aluno));
		
	}

}
