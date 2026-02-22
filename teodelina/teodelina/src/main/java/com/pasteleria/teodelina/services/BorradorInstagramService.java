package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pasteleria.teodelina.entities.BorradorInstagram;
import com.pasteleria.teodelina.repository.BorradorInstagramRepository;



@Service
public class BorradorInstagramService {
    @Autowired
    private BorradorInstagramRepository borradorInstagramRepo;

    public BorradorInstagram crearBorradorInstagram(BorradorInstagram borradorInsta){
       return borradorInstagramRepo.save(borradorInsta);
    }

    public String borrarBorradorInsta(Long id){
        borradorInstagramRepo.deleteById(id);
        return "¡Se ha borrado exitosamente el borrador!";
    }

    public List<BorradorInstagram> listarBorradores(){
        List<BorradorInstagram> listadoDeBorradores = borradorInstagramRepo.findAll();
        return listadoDeBorradores;
    }

    public BorradorInstagram editarBorrador(Long id, BorradorInstagram borrador){
        BorradorInstagram borradorEncontrado = borradorInstagramRepo.findById(id).orElse(null);
        if(borradorEncontrado != null){
            borradorEncontrado.setEstado(borrador.getEstado());
            borradorEncontrado.setFechaCreacion(borrador.getFechaCreacion());
            borradorEncontrado.setFechaPublicacionSugerida(borrador.getFechaPublicacionSugerida());
            borradorEncontrado.setFeedBack(borrador.getFeedBack());
            borradorEncontrado.setPromptImagen(borrador.getPromptImagen());
            borradorEncontrado.setTexto(borrador.getTexto());
            return borradorInstagramRepo.save(borradorEncontrado);

        }
    return null;
    }
    public BorradorInstagram encontrarBorrador(Long id){
        return borradorInstagramRepo.findById(id).orElse(null);
    }
}
