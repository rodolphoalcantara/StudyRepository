import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;

public class OrdenaStrings {

	public static void main(String[] args) {

		List<String> palavras = new ArrayList<String>();
		palavras.add("java 8");
		palavras.add("Alura");
		palavras.add("Javeiro");

		// lambdas servem para interfaces com apenas um método abstrato. São chamadas de
		// Interfaces Funcionais.
		System.out.println("Utilizando classe anonima como parametro para o metodo sort");
		palavras.sort(new Comparator<String>() {
			@Override
			public int compare(String s1, String s2) {
				if (s1.length() < s2.length()) {
					return -1;
				}
				if (s1.length() > s2.length()) {
					return 1;
				}
				return 0;
			}
		});

		System.out.println(palavras);

		System.out.println("Utilizando lambdas para o metodo sort");
		palavras.sort((s1, s2) -> {
			if (s1.length() < s2.length()) {
				return -1;
			}
			if (s1.length() > s2.length()) {
				return 1;
			}
			return 0;
		});
		// versão reduzida da função anterior
		palavras.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));
		
		//utilizando metodo estatico default de comparação
		//leitura da expressão: palavras . ordene . comparando . tamanho da palavra
		palavras.sort(Comparator.comparing(palavra -> palavra.length()));
		
		//nova sintaxe
		palavras.sort(Comparator.comparing(String::length));

		System.out.println(palavras);

		// classe anonima sendo passada como parametro
		System.out.println("usando classe anonima para o metodo forEach");
		palavras.forEach(new Consumer<String>() {
			@Override
			public void accept(String s) {
				System.out.println(s);
			}
		});

		// usando lambda
		System.out.println("usando lambda para o metodo forEach");
		// não é necessario passar o tipo de "palavra" neste exemplo abaixo
		palavras.forEach(palavra -> System.out.println(palavra));

	}
}

class ComparadorPorTamanho implements Comparator<String> {

	@Override
	public int compare(String s1, String s2) {

		if (s1.length() < s2.length()) {
			return -1;
		}
		if (s1.length() > s2.length()) {
			return 1;
		}
		return 0;
	}

}
