package com.pasteleria.teodelina.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pasteleria.teodelina.entities.BorradorInstagram;
import com.pasteleria.teodelina.repository.BorradorInstagramRepository;



@Service
public class BorradorInstagramService {
    @Autowired
    private BorradorInstagramRepository borradorInstagramRepo;

    @Autowired
    private AsistenteFinancieroService asistenteService;

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

    public BorradorInstagram generarBorradorInstagram(String campania, String productos){
        BorradorInstagram borradorNuevo = new BorradorInstagram();

        String promptContexto = "Tenes que actuar como Community Manager de Teodelina pasteleria.Es Una pasteleria pequeña en Yerba Buena tucuman que hace todo de manera artesanal. " +          
        "La campania que vamos a vender es: " + campania + "." 
        +
        "Los productos a vender son: " + productos + "." +  
        "  Quiero que crees solo el texto del posteo para publicaciones en instagram con un tono calido que incluya emojis" + "IMPORTANTE: No incluyas saludos, introducciones, ni explicaciones. Devuelve ÚNICAMENTE el texto del posteo de Instagram y los hashtags, nada más.";
        String respuestaIA =  asistenteService.consultorIA(promptContexto);

        borradorNuevo.setFechaCreacion(LocalDate.now());
        borradorNuevo.setTexto(respuestaIA);
        borradorNuevo.setEstado("pendiente");
        borradorNuevo.setCampania(campania);
        return borradorInstagramRepo.save(borradorNuevo);
        
    }

    public BorradorInstagram aprobarBorrador(Long id){
       BorradorInstagram borradorEncontrado = borradorInstagramRepo.findById(id).orElse(null);

       if(borradorEncontrado != null){
        if(borradorEncontrado.getEstado().equalsIgnoreCase("publicado")){
            System.out.println("El borrador ya fue publicado");
            return borradorEncontrado;
        }else{
            borradorEncontrado.setEstado("PUBLICADO");
            borradorEncontrado.setFechaPublicacionSugerida(LocalDateTime.now());
             BorradorInstagram borradorCambiado = borradorInstagramRepo.save(borradorEncontrado);
             return borradorCambiado;
        }
        
       }
       return null;
    }

    public BorradorInstagram feedBackBorrador(Long id, String feedback){

        BorradorInstagram borradorEncontrado = borradorInstagramRepo.findById(id).orElse(null);

        if(borradorEncontrado != null && !borradorEncontrado.getEstado().equalsIgnoreCase("publicado") ){

            String promptContexto = "Actua como Community manager de Teodelina. Escribiste este borrador para una publicacion de instagram" +
             borradorEncontrado.getTexto() + " El dueño del local quiere te dio el siguiente feedback: " + feedback + "Reescribí el posteo aplicando ese feedback. IMPORTANTE: Devolvé ÚNICAMENTE el texto corregido, sin saludos ni introducciones";
            
             String respuestaIA =  asistenteService.consultorIA(promptContexto);


            borradorEncontrado.setTexto(respuestaIA); 
            borradorEncontrado.setFeedBack(feedback);
            return borradorInstagramRepo.save(borradorEncontrado);
            }else{ 
                return null;
            }
            
    }
}
