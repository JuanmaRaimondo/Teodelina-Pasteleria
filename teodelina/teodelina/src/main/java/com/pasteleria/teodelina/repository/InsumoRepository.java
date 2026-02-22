package com.pasteleria.teodelina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pasteleria.teodelina.entities.Insumo;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    
}
