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

import com.pasteleria.teodelina.entities.Producto;
import com.pasteleria.teodelina.services.ProductoService;


@RestController
@RequestMapping("/producto")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/traerlista")
    public List<Producto> traerListaProductos(){
        List<Producto> listaProductos = productoService.listarProductos();
        return listaProductos;
    }

    @GetMapping("/traerProducto/{id}")
    public Producto traerProducto(@PathVariable("id") Long id){
        Producto productoEncontrado = productoService.buscarProducto(id);
        return productoEncontrado;
    }

    @PostMapping("/crear")
    public String crearProducto(@RequestBody Producto producto){
        productoService.crearProducto(producto);
        return "¡Su producto ha sido creado exitosamente!";
    }
    
    @DeleteMapping("/borrar/{id}")
    public String borrarProducto(@PathVariable Long id){
        productoService.borrarProducto(id);
        return "¡Su producto ha sido borrado exitosamente!";
    }

    @PatchMapping("/editar/{id}")
    public String editarProducto(@PathVariable Long id,@RequestBody Producto producto){

        productoService.editarProducto(id, producto);

         return "¡Se ha editado correctamente el producto seleccionado!";
    }
    
}
