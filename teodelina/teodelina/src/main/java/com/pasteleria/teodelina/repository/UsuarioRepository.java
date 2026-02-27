package com.pasteleria.teodelina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pasteleria.teodelina.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);
    
}
