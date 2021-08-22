package br.com.caelum.leilao.servico;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import br.com.caelum.leilao.dominio.Lance;
import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Usuario;
import br.com.caelum.leilao.servico.Avaliador;

public class TesteDoAvaliador {

	@Test
	public void deveEntenderLancesEmOrdemCrescente() {

		// parte 1: cenario
		Usuario joao = new Usuario("Jo�o");
		Usuario jose = new Usuario("Jos�");
		Usuario maria = new Usuario("Maria");

		Leilao leilao = new Leilao("Playstation 5 Novo");

		leilao.propoe(new Lance(joao, 250.0));
		leilao.propoe(new Lance(jose, 300.0));
		leilao.propoe(new Lance(maria, 400.0));

		// parte 2: acao
		Avaliador leiloeiro = new Avaliador();
		leiloeiro.avalia(leilao);

		// parte 3: validacao
		// valida��o manual
		// System.out.println(leiloeiro.getMaiorLance());
		// System.out.println(leiloeiro.getMenorLance());

		double maiorEsperado = 400.0;
		double menorEsperado = 250.0;
		// valida��o "automatizada"
		/*
		 * System.out.println(maiorEsperado == leiloeiro.getMaiorLance());
		 * System.out.println(menorEsperado == leiloeiro.getMenorLance());
		 */

		// valida��o com JUnit

		assertEquals(maiorEsperado, leiloeiro.getMaiorLance(), 0.00001);
		assertEquals(menorEsperado, leiloeiro.getMenorLance(), 0.00001);

	}

	@Test
	public void deveEntenderLeilaoComApenasUmLance() {
		Usuario joao = new Usuario("Jo�o");
		Leilao leilao = new Leilao("Playstation 5 Novo");

		leilao.propoe(new Lance(joao, 1000.0));

		Avaliador leiloeiro = new Avaliador();

		leiloeiro.avalia(leilao);

		assertEquals(1000.0, leiloeiro.getMaiorLance(), 0.00001);
		assertEquals(1000.0, leiloeiro.getMenorLance(), 0.00001);
	}

	@Test
	public void deveEncontrarOsTresMaioresLances() {

		Usuario joao = new Usuario("Jo�o");
		Usuario maria = new Usuario("Maria");

		Leilao leilao = new Leilao("Playstation 5 Novo");

		leilao.propoe(new Lance(joao, 100.0));
		leilao.propoe(new Lance(maria, 200.0));
		leilao.propoe(new Lance(joao, 300.0));
		leilao.propoe(new Lance(maria, 400.0));
		leilao.propoe(new Lance(joao, 700.0));

		Avaliador leiloeiro = new Avaliador();
		leiloeiro.avalia(leilao);

		List<Lance> maiores = leiloeiro.getTresMaiores();

		assertEquals(3, maiores.size());
		assertEquals(700.0, maiores.get(0).getValor(), 0.00001);
		assertEquals(400.0, maiores.get(1).getValor(), 0.00001);
		assertEquals(300.0, maiores.get(2).getValor(), 0.00001);

	}

	@Test
	public void deveRetornarTudoCasoN�oTenhaNoMinimoTres() {

		Usuario joao = new Usuario("Jo�o");
		Usuario maria = new Usuario("Maria");

		Leilao leilao = new Leilao("Playstation 5 Novo");

		leilao.propoe(new Lance(joao, 100.0));
		leilao.propoe(new Lance(maria, 200.0));

		Avaliador leiloeiro = new Avaliador();
		leiloeiro.avalia(leilao);

		List<Lance> maiores = leiloeiro.getTresMaiores();

		assertEquals(2, maiores.size());
		assertEquals(200.0, maiores.get(0).getValor(), 0.00001);
		assertEquals(100.0, maiores.get(1).getValor(), 0.00001);
	}

	@Test
	public void deveRetornarListaVazia() {
		
		Leilao leilao = new Leilao("Playstation 5 Novo");
		Avaliador leiloeiro = new Avaliador();
		leiloeiro.avalia(leilao);
		
		List<Lance> maiores = leiloeiro.getTresMaiores();
		
		assertEquals(0, maiores.size());
	}

}
