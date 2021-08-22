package br.com.gerenciadorDeCursos;

public class Aluno {

	private String nome;
	private int numeroMatricula;

	public Aluno(String nome, int numeroMatricula) {
		if(nome == null) {
			throw new NullPointerException("Nome não pode ser null");
		}
		this.nome = nome;
		this.numeroMatricula = numeroMatricula;
	}

	public String getNome() {
		return nome;
	}

	public int getNumeroMatricula() {
		return numeroMatricula;
	}

	@Override
	public String toString() {
		return "[Aluno: " + this.nome + ", matricula: " + this.numeroMatricula + " ]";
	}
	
	@Override
	public boolean equals(Object obj) {
		Aluno outro = (Aluno)obj;
				
		return (this.nome.equals(outro.nome) && this.numeroMatricula == outro.numeroMatricula);
	}
	
	@Override
	public int hashCode() {
		return this.nome.hashCode();
	}

}
