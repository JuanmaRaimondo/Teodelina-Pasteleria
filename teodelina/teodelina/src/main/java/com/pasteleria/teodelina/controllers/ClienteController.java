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

import com.pasteleria.teodelina.entities.Cliente;
import com.pasteleria.teodelina.services.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping("/traercliente/{id}")
    public Cliente traerCliente(@PathVariable Long id){
     Cliente clienteEncontrado =  clienteService.encontrarCliente(id);
        return clienteEncontrado;
    }

    @GetMapping("/listarclientes")
    public List<Cliente> listaDeCliente(){
       List<Cliente> listaDeClientes = clienteService.listarClientes();
        return listaDeClientes;
    }

    @PostMapping("/crear")
    public String crearCliente(@RequestBody Cliente cliente){
        clienteService.crearCliente(cliente);
        return "¡Se ha creado exitosamente el cliente!";
    }

    @DeleteMapping("/borrar/{id}")
    public String borrarCliente(@PathVariable Long id){
        clienteService.borrarCliente(id);
        return "¡Se ha borrado exitosamente el cliente!";
    }

    @PatchMapping("/editar/{id}")
    public Cliente editarCliente(@PathVariable Long id, @RequestBody Cliente cliente){
       Cliente clienteEncontrado = clienteService.editarCliente(id, cliente);
       return clienteEncontrado;
    }
}
