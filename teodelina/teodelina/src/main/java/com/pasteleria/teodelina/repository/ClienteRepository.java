package com.pasteleria.teodelina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pasteleria.teodelina.entities.Cliente;
import com.pasteleria.teodelina.entities.Usuario;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Spring hace la magia de buscar al cliente usando el usuario
Optional<Cliente> findByUsuario(Usuario usuario);
}
