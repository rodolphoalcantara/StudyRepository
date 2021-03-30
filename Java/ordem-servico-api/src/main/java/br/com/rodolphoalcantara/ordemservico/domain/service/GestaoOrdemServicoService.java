package br.com.rodolphoalcantara.ordemservico.domain.service;

import java.time.OffsetDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.rodolphoalcantara.ordemservico.domain.exception.EntidadeNaoEncontradaException;
import br.com.rodolphoalcantara.ordemservico.domain.exception.NegocioException;
import br.com.rodolphoalcantara.ordemservico.domain.model.Cliente;
import br.com.rodolphoalcantara.ordemservico.domain.model.Comentario;
import br.com.rodolphoalcantara.ordemservico.domain.model.OrdemServico;
import br.com.rodolphoalcantara.ordemservico.domain.model.StatusOrdemServico;
import br.com.rodolphoalcantara.ordemservico.domain.repository.ClienteRepository;
import br.com.rodolphoalcantara.ordemservico.domain.repository.ComentarioRepository;
import br.com.rodolphoalcantara.ordemservico.domain.repository.OrdemServicoRepository;

@Service
public class GestaoOrdemServicoService {
	
	@Autowired
	private OrdemServicoRepository osRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ComentarioRepository comentarioRepository;
	
	
	public OrdemServico criar(OrdemServico os) {
		
		Cliente cliente = clienteRepository.findById(os.getCliente().getId()).orElseThrow(() -> new NegocioException("Cliente não encontrado!"));
		
		os.setCliente(cliente);
		os.setStatus(StatusOrdemServico.ABERTA);
		os.setDataAbertura(OffsetDateTime.now());

		return osRepository.save(os);
	}
	
	public void finalizar(Long ordemServicoId) {
		OrdemServico ordemServico = buscar(ordemServicoId);
		
		ordemServico.finalizar();
		
		osRepository.save(ordemServico);
	}

	
	public Comentario adicionarComentario(Long ordemServicoId, String descricao) {
		OrdemServico ordemServico = buscar(ordemServicoId);
		
		Comentario comentario = new Comentario();
		comentario.setDataEnvio(OffsetDateTime.now());
		comentario.setDescricao(descricao);
		comentario.setOrdemServico(ordemServico);
		
		return comentarioRepository.save(comentario);
	}
	
	private OrdemServico buscar(Long ordemServicoId) {
		return osRepository.findById(ordemServicoId).orElseThrow(() -> new EntidadeNaoEncontradaException("Ordem de serviço não encontrada"));
	}

}
