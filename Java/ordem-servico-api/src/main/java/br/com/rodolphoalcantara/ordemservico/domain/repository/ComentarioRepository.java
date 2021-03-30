package br.com.rodolphoalcantara.ordemservico.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.rodolphoalcantara.ordemservico.domain.model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
}
