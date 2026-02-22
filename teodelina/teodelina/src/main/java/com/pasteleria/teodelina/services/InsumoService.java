package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pasteleria.teodelina.entities.Insumo;
import com.pasteleria.teodelina.repository.InsumoRepository;

@Service
public class InsumoService {
    @Autowired
    private InsumoRepository insumoRepo;

    public Insumo crearInsumo(Insumo insumo){
        return insumoRepo.save(insumo);
    }

    public String borrarInsumo(Long id){
       insumoRepo.deleteById(id);
        return "Insumo borrado";
    }

    public Insumo encontrarInsumo(Long id){
        Insumo insumoEncontrado = insumoRepo.findById(id).orElse(null);
        return insumoEncontrado;
    }

    public Insumo editarInsumo(Long id, Insumo insumo){
        Insumo insumoEncontrado = insumoRepo.findById(id).orElse(null);
        if(insumoEncontrado != null){
            insumoEncontrado.setNombre(insumo.getNombre());
            insumoEncontrado.setMarca(insumo.getMarca());
            insumoEncontrado.setPrecioUnitario(insumo.getPrecioUnitario());
            insumoEncontrado.setStock(insumo.getStock());
            insumoEncontrado.setUnidadDeMedida(insumo.getUnidadDeMedida());
            return insumoRepo.save(insumoEncontrado);
        }
        return null;
    }
    
    public List<Insumo> listarInsumos(){
         List<Insumo> listaInsumos = insumoRepo.findAll();
         return listaInsumos;
    }
}
