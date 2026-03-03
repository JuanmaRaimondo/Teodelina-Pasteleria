package com.pasteleria.teodelina.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BorradorInstagram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String texto;
    private String promptImagen;
    private String estado; 
    private String feedBack;
    private String campania;
    private LocalDate fechaCreacion;
    private LocalDateTime fechaPublicacionSugerida;

    public BorradorInstagram(){
    
    
    }

    public BorradorInstagram(Long id, String texto, String promptImagen, String estado, String feedBack,
            LocalDate fechaCreacion, LocalDateTime fechaPublicacionSugerida, String campania) {
        this.id = id;
        this.texto = texto;
        this.promptImagen = promptImagen;
        this.estado = estado;
        this.feedBack = feedBack;
        this.fechaCreacion = fechaCreacion;
        this.fechaPublicacionSugerida = fechaPublicacionSugerida;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getPromptImagen() {
        return promptImagen;
    }

    public void setPromptImagen(String promptImagen) {
        this.promptImagen = promptImagen;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaPublicacionSugerida() {
        return fechaPublicacionSugerida;
    }

    public void setFechaPublicacionSugerida(LocalDateTime fechaPublicacionSugerida) {
        this.fechaPublicacionSugerida = fechaPublicacionSugerida;
    }

    public String getCampania() {
        return campania;
    }

    public void setCampania(String campania) {
        this.campania = campania;
    }

    
}
