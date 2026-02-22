package com.pasteleria.teodelina.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate diaEntrega;
    private LocalTime horarioEntrega;
    private String descripcion;
    private Double senia;
    private Double montoTotal;
    private String estadoDelPedido;
    private String estadoDelPago;
    private String tipoDeEntrega;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
    @ManyToMany
    private List<Producto> listaProductos;
    //Tengo que agregar la relacion entre pedido y cliente.

    public Pedido(){}

    public Pedido(Long id, LocalDate diaEntrega, LocalTime horarioEntrega, String descripcion, Double senia,
            Double montoTotal, String estadoDelPedido, String estadoDelPago, String tipoDeEntrega, Cliente cliente,
            List<Producto> listaProductos) {
        this.id = id;
        this.diaEntrega = diaEntrega;
        this.horarioEntrega = horarioEntrega;
        this.descripcion = descripcion;
        this.senia = senia;
        this.montoTotal = montoTotal;
        this.estadoDelPedido = estadoDelPedido;
        this.estadoDelPago = estadoDelPago;
        this.tipoDeEntrega = tipoDeEntrega;
        this.cliente = cliente;
        this.listaProductos = listaProductos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDiaEntrega() {
        return diaEntrega;
    }

    public void setDiaEntrega(LocalDate diaEntrega) {
        this.diaEntrega = diaEntrega;
    }

    public LocalTime getHorarioEntrega() {
        return horarioEntrega;
    }

    public void setHorarioEntrega(LocalTime horarioEntrega) {
        this.horarioEntrega = horarioEntrega;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getSenia() {
        return senia;
    }

    public void setSenia(Double senia) {
        this.senia = senia;
    }

    public Double getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(Double montoTotal) {
        this.montoTotal = montoTotal;
    }

    public String getEstadoDelPedido() {
        return estadoDelPedido;
    }

    public void setEstadoDelPedido(String estadoDelPedido) {
        this.estadoDelPedido = estadoDelPedido;
    }

    public String getEstadoDelPago() {
        return estadoDelPago;
    }

    public void setEstadoDelPago(String estadoDelPago) {
        this.estadoDelPago = estadoDelPago;
    }

    public String getTipoDeEntrega() {
        return tipoDeEntrega;
    }

    public void setTipoDeEntrega(String tipoDeEntrega) {
        this.tipoDeEntrega = tipoDeEntrega;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Producto> getListaProductos() {
        return listaProductos;
    }

    public void setListaProductos(List<Producto> listaProductos) {
        this.listaProductos = listaProductos;
    }

    
}
