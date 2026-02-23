package com.pasteleria.teodelina.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pasteleria.teodelina.entities.BorradorInstagram;
import com.pasteleria.teodelina.services.BorradorInstagramService;

@RestController
@RequestMapping("/borradorinstagram")
public class BorradorInstagramControllers {
    @Autowired
    private BorradorInstagramService borradorservice;

    @PostMapping("/crear")
    public String crearBorrador(@RequestBody BorradorInstagram borrador){
        borradorservice.crearBorradorInstagram(borrador);
        return "¡Se ha creado exitosamente el borrador de Instagram!";
    }

    @GetMapping("/traer/{id}")
    public BorradorInstagram traerBorrador(@PathVariable Long id){
       BorradorInstagram borradorEncontrado = borradorservice.encontrarBorrador(id);
        return borradorEncontrado;
    }

    @GetMapping("/listaborradores")
    public List<BorradorInstagram> listaDeBorradores(){
       return borradorservice.listarBorradores();
    }

    @DeleteMapping("/borrar/{id}")
    public String borrarBorrador(@PathVariable Long id){
        borradorservice.borrarBorradorInsta(id);
        return "¡Se ha borrado exitosamente el borrador!";
    }

    @PatchMapping("/editar/{id}")
    public BorradorInstagram editarBorrador(@PathVariable Long id, @RequestBody BorradorInstagram borrador){
        return borradorservice.editarBorrador(id, borrador);
    }
}
