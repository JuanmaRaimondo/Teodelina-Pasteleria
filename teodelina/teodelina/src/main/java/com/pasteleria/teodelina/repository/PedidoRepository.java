package com.pasteleria.teodelina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pasteleria.teodelina.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
