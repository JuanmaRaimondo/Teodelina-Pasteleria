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

import com.pasteleria.teodelina.entities.Insumo;
import com.pasteleria.teodelina.services.InsumoService;

@RestController
@RequestMapping("/insumo")
public class InsumoController {
    
    @Autowired
    private InsumoService insumoService;

    @PostMapping("/crerinsumo")
    public String crearInsumo(@RequestBody Insumo insumo){
        insumoService.crearInsumo(insumo);
        return "¡Se creo exitosamente el insumo!";
    }

    @GetMapping("/traerinsumo/{id}")
    public Insumo traerInsumo( @PathVariable Long id){
        Insumo insumoEncontrado = insumoService.encontrarInsumo(id);
        return insumoEncontrado;
    }

    @GetMapping("/lista")
    public List<Insumo> traerInsumos(){
        return insumoService.listarInsumos();
    }

    @DeleteMapping("/borrarinsumo/{id}")
    public String borrarInsumo(@PathVariable Long id){
        insumoService.borrarInsumo(id);
        return "¡Se ha borrado exitosamente el insumo!";
    }

    @PatchMapping("/editar/{id}")
    public Insumo editarInsumo(@PathVariable Long id, @RequestBody Insumo insumo){
       Insumo insumoEncontrado = insumoService.editarInsumo(id, insumo);
       return insumoEncontrado;
    }
}
