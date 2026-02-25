package com.pasteleria.teodelina.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pasteleria.teodelina.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    @Query("SELECT SUM(p.montoTotal) FROM Pedido as p WHERE p.estadoDelPago = :estado")
    Double sumarIngresosPorEstado(@Param("estado") String estado);

    @Query("SELECT AVG(p.montoTotal) FROM Pedido as p WHERE p.estadoDelPago = :estado ")
    Double calcularTicketPromedioPorEstado(@Param("estado") String estado);

    @Query("SELECT SUM(p.montoTotal) FROM Pedido as p WHERE p.diaEntrega BETWEEN :inicio AND :fin")
     Double sumarIngresosEntreFechas(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
