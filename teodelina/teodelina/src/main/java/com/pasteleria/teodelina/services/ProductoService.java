package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pasteleria.teodelina.entities.Producto;
import com.pasteleria.teodelina.repository.ProductoRepository;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepo;

    public Producto crearProducto(Producto producto){
       
        return  productoRepo.save(producto);
    }

    public String borrarProducto(Long id){
        productoRepo.deleteById(id);
        return "¡Producto borrado exitosamente!";
    }

    public Producto buscarProducto(Long id){
      Producto productoEncontrado = productoRepo.findById(id).orElse(null);
        return productoEncontrado;
    }

    public Producto editarProducto(Long id, Producto producto){
        Producto productoEncontrado = productoRepo.findById(id).orElse(null);
        if(productoEncontrado != null){
             productoEncontrado.setNombre(producto.getNombre());
            productoEncontrado.setCategoria(producto.getCategoria());
            productoEncontrado.setDescripcion(producto.getDescripcion());
            productoEncontrado.setPrecio(producto.getPrecio());
            productoEncontrado.setSintaac(producto.getSintaac());
            return productoRepo.save(productoEncontrado);
        }       
        
        return null;
    }

    public List<Producto> listarProductos(){
        List<Producto> listaProductos = productoRepo.findAll();

        return listaProductos;
    }
}
