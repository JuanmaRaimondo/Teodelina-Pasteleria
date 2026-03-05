package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pasteleria.teodelina.entities.Insumo;
import com.pasteleria.teodelina.entities.ItemReceta;
import com.pasteleria.teodelina.entities.Producto;
import com.pasteleria.teodelina.exceptions.RecursoNoEncontradoException;
import com.pasteleria.teodelina.repository.InsumoRepository;
import com.pasteleria.teodelina.repository.ProductoRepository;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepo;

    @Autowired
    private InsumoRepository insumoRepo;

    public Producto crearProducto(Producto producto){
       
        return  productoRepo.save(producto);
    }

    public void borrarProducto(Long id) {
        // En vez de usar productoRepository.deleteById(id); hacemos esto:
        Producto producto = productoRepo.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setActivo(false); // Lo "ocultamos"
        productoRepo.save(producto); // Guardamos el cambio de estado
    }

    public Producto buscarProducto(Long id){
      Producto productoEncontrado = productoRepo.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("No se encontró el producto con el ID: " + id));
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

    public List<Producto> traerLista() {
        return productoRepo.findByActivoTrue(); 
    }

    public String fabricarProducto(Long id){
        Producto producto = productoRepo.findById(id).orElse(null);

        if (producto == null) {
            return "Error: Producto no encontrado.";
        }

        // 2. Control de seguridad: ¿Nos alcanzan los ingredientes?
        // Recorremos la receta para verificar el stock ANTES de tocar nada
        for (ItemReceta item : producto.getReceta()) {
            Insumo insumo = item.getInsumo();
            Double cantidadNecesaria = item.getCantidad();
            
            // Si el stock actual es menor a lo que pide la receta, frenamos todo
            if (insumo.getStock() < cantidadNecesaria) {
                return "Error: No hay stock suficiente de " + insumo.getNombre() + 
                       ". Necesitás " + cantidadNecesaria + " pero solo tenés " + insumo.getStock();
            }
        }

        // 3. Descuento de stock (Si el código llegó hasta acá, es porque hay stock de todo)
       for (ItemReceta item : producto.getReceta()) {
            Insumo insumo = item.getInsumo();
            Double cantidadNecesaria = item.getCantidad();
            
            // Hacemos la resta
            Double nuevoStock = insumo.getStock() - cantidadNecesaria;
            
            // Redondeamos a 2 decimales para evitar el 00000001
            nuevoStock = Math.round(nuevoStock * 100.0) / 100.0;
            
            insumo.setStock(nuevoStock);
            insumoRepo.save(insumo);
        }
        return "¡Producto fabricado con éxito! Se descontó el stock de los insumos.";
    }
}
