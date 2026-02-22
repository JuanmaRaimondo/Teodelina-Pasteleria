package com.pasteleria.teodelina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pasteleria.teodelina.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{
    
    


}
