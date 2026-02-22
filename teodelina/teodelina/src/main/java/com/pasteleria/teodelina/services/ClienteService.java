package com.pasteleria.teodelina.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pasteleria.teodelina.entities.Cliente;
import com.pasteleria.teodelina.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepo;

    public Cliente crearCliente(Cliente cliente){
        return clienteRepo.save(cliente);
    }

    public String borrarCliente(Long id){
        
        clienteRepo.deleteById(id);
        return "¡Cliente borrado exitosamente!";
    }

    public Cliente encontrarCliente(Long id){
        Cliente clienteEncontrado = clienteRepo.findById(id).orElse(null);
        return clienteEncontrado;
    }

    public List<Cliente> listarClientes(){
        List<Cliente> listaClientes = clienteRepo.findAll();
        return listaClientes;
    }

    public Cliente editarCliente(Long id, Cliente cliente){
        Cliente clienteEncontrado = clienteRepo.findById(id).orElse(null);

        if(clienteEncontrado != null){
            clienteEncontrado.setApellido(cliente.getApellido());
            clienteEncontrado.setNombre(cliente.getNombre());
            clienteEncontrado.setDireccion(cliente.getDireccion());
            clienteEncontrado.setTelefono(cliente.getTelefono());
            clienteEncontrado.setUsuarioInstagram(cliente.getUsuarioInstagram());
            return clienteRepo.save(clienteEncontrado);
        }
        return null;
    }
}
