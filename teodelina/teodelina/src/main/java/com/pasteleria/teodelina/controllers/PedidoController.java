package com.pasteleria.teodelina.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pasteleria.teodelina.entities.Pedido;
import com.pasteleria.teodelina.entities.Usuario;
import com.pasteleria.teodelina.services.ClienteService;
import com.pasteleria.teodelina.services.PedidoService;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ClienteService clienteService;

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
    public List<Pedido> listaPedidos(@AuthenticationPrincipal Usuario usuarioLogueado){
        boolean esAdmin = usuarioLogueado.getAuthorities().stream()
                        .anyMatch(permiso -> permiso.getAuthority().equals("ROLE_ADMIN"));

    if (esAdmin) {
        System.out.println("👨‍🍳 Es ADMIN: Mostrando todos los pedidos de la pastelería.");
        // Devuelve TODOS los pedidos
        return pedidoService.traerPedidos(); 
        
    } else {
        System.out.println("🛍️ Es CLIENTE: Buscando los pedidos personales de: " + usuarioLogueado.getUsername());
        
        // 1. Usamos la herramienta nueva para encontrar el Perfil de Cliente de este usuario
        var clienteActual = clienteService.buscarClientePorUsuario(usuarioLogueado);
        
        // 2. Usamos la otra herramienta nueva para traer solo los pedidos de ese cliente
        return pedidoService.traerPedidosPorCliente(clienteActual);
    }
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

    
    @GetMapping("/ingresos/{estado}")
    public Double obtenerIngresos(@PathVariable("estado") String estado) {
        return pedidoService.calcularIngresosPorEstado(estado);
    }

    @GetMapping("/promedio/{estado}")
    public Double calcularTicket(@PathVariable("estado") String estado) {
        return pedidoService.calcularTicketPromedioPorEstado(estado);
    }

    @GetMapping("/ingresos/desde/{inicio}/hasta/{fin}")
    public Double ingresosPorFecha(
            @PathVariable("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @PathVariable("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        
        return pedidoService.sumarIngresosEntreFechas(inicio, fin);
    }
}
