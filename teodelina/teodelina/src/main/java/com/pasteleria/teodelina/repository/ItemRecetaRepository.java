package com.pasteleria.teodelina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pasteleria.teodelina.entities.ItemReceta;

public interface ItemRecetaRepository extends JpaRepository<ItemReceta, Long> {
    List<ItemReceta> findByProductoId(Long productoId);
}
