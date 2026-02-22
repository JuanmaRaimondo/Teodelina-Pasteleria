package com.pasteleria.teodelina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pasteleria.teodelina.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
