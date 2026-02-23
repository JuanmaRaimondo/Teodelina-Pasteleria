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

import com.pasteleria.teodelina.entities.Pedido;
import com.pasteleria.teodelina.services.PedidoService;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/crear")
    public String crearPedido(@RequestBody Pedido pedido){
        pedidoService.crearPedido(pedido);
        return"¡Su pedido ha sido creado exitosamente! ";
    }

    @GetMapping("/traerpedido/{id}")
    public Pedido traerPedido(@PathVariable Long id){
      Pedido pedidoEncontrado = pedidoService.encontrarPedido(id);
        return pedidoEncontrado; 
    }

    @GetMapping("/listapedido")
    public List<Pedido> listaPedidos(){
        List<Pedido> listaDePedidos = pedidoService.traerPedidos();
        return listaDePedidos;
    }

    @PatchMapping("/editar/{id}")
    public Pedido editarPedido(@PathVariable Long id, @RequestBody Pedido pedido){
        return pedidoService.editarPedido(id, pedido);
    }

    @DeleteMapping("/borrar/{id}")
    public String borrarPedido(@PathVariable Long id){
        pedidoService.borrarPedido(id);
        return "¡Se ha borrado exitosamente el pedido!";
    }
}
