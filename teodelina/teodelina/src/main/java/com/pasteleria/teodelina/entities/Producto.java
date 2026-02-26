package com.pasteleria.teodelina.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Producto{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotBlank(message = "El nombre del producto no puede estar vacío")
    private String nombre;
    private String descripcion;
    private String categoria;
    private Boolean sintaac;
    @Min(value = 0, message = "El precio del producto no puede ser negativo")
    private Double precio;
    @OneToMany(mappedBy = "producto")
    private List<ItemReceta> receta;
    
    public Producto(){}

    public Producto(Long id, String nombre, String descripcion, String categoria, Boolean sintaac, Double precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.sintaac = sintaac;
        this.precio = precio;
    }

    public Double getCostoTotal() {
    if (this.receta == null || this.receta.isEmpty()) {
        return 0.0;
    }        
    return this.receta.stream()
            .mapToDouble(item -> item.getInsumo().getPrecioUnitario() * item.getCantidad())
            .sum();
}


    public Double getGananciaNeta() {
        if (this.precio == null) {
            return 0.0;
        }
        
        return this.precio - this.getCostoTotal();
    }

   
    public Double getRentabilidadPorcentaje() {
        Double costo = this.getCostoTotal();
        Double ganancia = this.getGananciaNeta();
        
        if (costo == 0.0 || costo == null) {
            return 0.0;
        }
        
        return Math.round((ganancia / costo) * 100.0 * 100.0) / 100.0; 
        
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Boolean getSintaac() {
        return sintaac;
    }

    public void setSintaac(Boolean sintaac) {
        this.sintaac = sintaac;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public List<ItemReceta> getReceta() {
        return receta;
    }

    public void setReceta(List<ItemReceta> receta) {
        this.receta = receta;
    }

    

}
