package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pasteleria.teodelina.entities.ItemReceta;
import com.pasteleria.teodelina.repository.ItemRecetaRepository;

@Service
public class ItemRecetaService {
    
    @Autowired
    private ItemRecetaRepository itemRecetarepo;

    public ItemReceta crearItemReceta(ItemReceta itemReceta){
        return itemRecetarepo.save(itemReceta);
    }

    public ItemReceta borrarItemReceta(Long id){
        ItemReceta itemABorrar = itemRecetarepo.findById(id).orElse(null);
        if (itemABorrar != null) {
        // 2. Lo borramos de la base de datos
        itemRecetarepo.deleteById(id);
        // 3. Devolvemos el objeto que acabamos de borrar
        return itemABorrar;
    }
        return null;
        }

    public List<ItemReceta> listarRecetas(){
       List<ItemReceta> listaRecetas = itemRecetarepo.findAll();
       return listaRecetas;
    }

    public ItemReceta editarReceta(Long id, ItemReceta itemReceta){
        ItemReceta recetaEncontrada = itemRecetarepo.findById(id).orElse(null);
        if(recetaEncontrada != null){
           if(itemReceta.getCantidad() != null) recetaEncontrada.setCantidad(itemReceta.getCantidad());
            if(itemReceta.getInsumo() != null) recetaEncontrada.setInsumo(itemReceta.getInsumo());
            if(itemReceta.getProducto() != null) recetaEncontrada.setProducto(itemReceta.getProducto());
            return itemRecetarepo.save(recetaEncontrada);
        
        }
        return null;
    }

    public ItemReceta buscarReceta(Long id){
      ItemReceta recetaEncontrada = itemRecetarepo.findById(id).orElse(null);
        return recetaEncontrada;
    }

    public List<ItemReceta> crearRecetaCompleta(List<ItemReceta> items) {
    return itemRecetarepo.saveAll(items);
}

public List<ItemReceta> obtenerRecetaPorProducto(Long productoId) {
    return itemRecetarepo.findByProductoId(productoId);
}
}