package br.com.rodolphoalcantara.ordemservico.api.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodolphoalcantara.ordemservico.api.model.OrdemServicoInput;
import br.com.rodolphoalcantara.ordemservico.api.model.OrdemServicoModel;
import br.com.rodolphoalcantara.ordemservico.domain.model.OrdemServico;
import br.com.rodolphoalcantara.ordemservico.domain.repository.OrdemServicoRepository;
import br.com.rodolphoalcantara.ordemservico.domain.service.GestaoOrdemServicoService;

@RestController
@RequestMapping("/ordens-servico")
public class OrdemServicoController {
	
	@Autowired
	private GestaoOrdemServicoService gestaoOS;
	
	@Autowired
	private OrdemServicoRepository oSRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED) 
	public OrdemServicoModel criar(@Valid @RequestBody OrdemServicoInput ordemServicoInput) {
		OrdemServico ordemServico = toEntity(ordemServicoInput);
		return toModel(gestaoOS.criar(ordemServico));
	}
	
	@GetMapping
	public List<OrdemServicoModel> listar() {
		return toCollectionModel(oSRepository.findAll());
	}
	
	@GetMapping("/{oSId}")
	public ResponseEntity<OrdemServicoModel> buscar(@PathVariable Long oSId){
		Optional<OrdemServico> os = oSRepository.findById(oSId);
		
		if(os.isPresent()) {
			
			OrdemServicoModel model = toModel(os.get());
			return ResponseEntity.ok(model);
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/{ordemServicoId}/finalizacao")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void finalizar(@PathVariable Long ordemServicoId) {
		gestaoOS.finalizar(ordemServicoId);
	}
	
	
	private OrdemServicoModel toModel(OrdemServico os) {
		return modelMapper.map(os, OrdemServicoModel.class);
	}
	
	private List<OrdemServicoModel> toCollectionModel(List<OrdemServico> ordensServico){
		return ordensServico.stream().map(os -> toModel(os)).collect(Collectors.toList());
	}
	
	private OrdemServico toEntity(OrdemServicoInput ordemServicoInput) {
		return modelMapper.map(ordemServicoInput, OrdemServico.class);
	}
}
