package br.com.alura.jpa.testes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.alura.jpa.modelo.Categoria;
import br.com.alura.jpa.modelo.Conta;
import br.com.alura.jpa.modelo.Movimentacao;
import br.com.alura.jpa.modelo.TipoMovimentacao;

public class TestaRelacionamentoMovimentacaoCategoria {

	public static void main(String[] args) {

		Categoria cat1 = new Categoria("Viagem");
		Categoria cat2 = new Categoria("Negócios");
		
		Conta conta = new Conta();
		conta.setId(2L);
		
		Movimentacao mov = new Movimentacao();
		mov.setDescricao("Viagem à São Paulo");
		mov.setTipoMovimentacao(TipoMovimentacao.SAIDA);
		mov.setData(LocalDateTime.now());
		mov.setValor(new BigDecimal(300.00));
		mov.setCategoria(Arrays.asList(cat1,cat2));
		mov.setConta(conta);
		
		Movimentacao mov2 = new Movimentacao();
		mov2.setDescricao("Viagem à Rio de Janeiro");
		mov2.setTipoMovimentacao(TipoMovimentacao.SAIDA);
		mov2.setData(LocalDateTime.now());
		mov2.setValor(new BigDecimal(400.00));
		mov2.setCategoria(Arrays.asList(cat1,cat2));
		mov2.setConta(conta);
		

		EntityManagerFactory emf = Persistence.createEntityManagerFactory("contas");
		EntityManager em = emf.createEntityManager();
		
		em.getTransaction().begin();
		
		em.persist(cat1);
		em.persist(cat2);
		
		em.persist(mov);
		em.persist(mov2);
		em.getTransaction().commit();
		em.close();
		
		
		
		
	}

}
