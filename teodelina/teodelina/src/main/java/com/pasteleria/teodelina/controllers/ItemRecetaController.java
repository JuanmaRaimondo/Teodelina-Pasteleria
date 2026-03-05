package com.pasteleria.teodelina.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pasteleria.teodelina.entities.ItemReceta;
import com.pasteleria.teodelina.services.ItemRecetaService;

@RestController
@RequestMapping("/receta")
public class ItemRecetaController {

    @Autowired
    private ItemRecetaService recetaService;

    @PostMapping("/cargarrecetacompleta")
    public List<ItemReceta> cargarRecetaCompleta(@RequestBody List<ItemReceta> lista){
        List<ItemReceta> recetaCompleta = recetaService.crearRecetaCompleta(lista);
        return recetaCompleta;
    }

    @GetMapping("/traer")
    public List<ItemReceta> traerLista(){
        // 1. Guardamos la lista que nos trae el service
        List<ItemReceta> listaCompleta = recetaService.listarRecetas();
        // 2. Se la devolvemos a React (o Postman) en formato JSON
        return listaCompleta;
    }

    @DeleteMapping("/borrar/{id}")
    public ItemReceta borrarReceta(@PathVariable Long id) {
       return recetaService.borrarItemReceta(id);
    }

    @PutMapping("/editar/{id}")
    public ItemReceta editarReceta(@PathVariable Long id, @RequestBody ItemReceta itemReceta){
      ItemReceta recetaEditada =  recetaService.editarReceta(id, itemReceta);
        return recetaEditada;
    }

    @GetMapping("/producto/{id}")
public List<ItemReceta> traerPorProducto(@PathVariable Long id) {
    return recetaService.obtenerRecetaPorProducto(id);
}
}
