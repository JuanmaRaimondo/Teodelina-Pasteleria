package com.pasteleria.teodelina.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pasteleria.teodelina.entities.Pedido;
import com.pasteleria.teodelina.entities.Producto;
import com.pasteleria.teodelina.exceptions.RecursoNoEncontradoException;
import com.pasteleria.teodelina.repository.PedidoRepository;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidorepo;

    @Autowired
    private ProductoService productoService;

    public Pedido crearPedido(Pedido pedido){
        Double totalCalculado = 0.0;

        // Si el pedido trae productos, calculamos el total sumando sus precios
        if (pedido.getListaProductos() != null) {
            for (Producto producto : pedido.getListaProductos()) {
                // Buscamos el producto en la BD para saber su precio real actual
                Producto productoReal = productoService.buscarProducto(producto.getId());
                totalCalculado += productoReal.getPrecio();
            }
        }

        // Le asignamos el total que calculó el sistema (ignoramos si el usuario mandó uno a mano)
        pedido.setMontoTotal(totalCalculado);
        return pedidorepo.save(pedido);
    }

    public String borrarPedido(Long id){
        pedidorepo.deleteById(id);
        return"¡Pedido Borrado Exitosamente!";
    }

    public Pedido encontrarPedido(Long id){
        Pedido pedidoEncontrado = pedidorepo.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("No se encontró el pedido con el ID: " + id));
        return pedidoEncontrado;
    } 

    public List<Pedido> traerPedidos(){
        List<Pedido> listaDePedidos = pedidorepo.findAll();
        return listaDePedidos;
    }

    public Pedido editarPedido(Long id, Pedido pedido){

        Pedido pedidoEncontrado = pedidorepo.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("No se encontró el pedido con el ID: " + id));
        if(pedidoEncontrado != null){
            pedidoEncontrado.setCliente(pedido.getCliente());
            pedidoEncontrado.setDescripcion(pedido.getDescripcion());
            pedidoEncontrado.setDiaEntrega(pedido.getDiaEntrega());
            pedidoEncontrado.setEstadoDelPago(pedido.getEstadoDelPago());
            pedidoEncontrado.setEstadoDelPedido(pedido.getEstadoDelPedido());
            pedidoEncontrado.setHorarioEntrega(pedido.getHorarioEntrega());
            pedidoEncontrado.setListaProductos(pedido.getListaProductos());
            pedidoEncontrado.setMontoTotal(pedido.getMontoTotal());
            pedidoEncontrado.setSenia(pedido.getSenia());
            pedidoEncontrado.setTipoDeEntrega(pedido.getTipoDeEntrega());
            return pedidorepo.save(pedidoEncontrado);

        }
        return null;
    }

    public Double calcularIngresosPorEstado(String estado) {
        return pedidorepo.sumarIngresosPorEstado(estado);
    }

    public Double calcularTicketPromedioPorEstado(String estado){
        return pedidorepo.calcularTicketPromedioPorEstado(estado);
    }

    public Double sumarIngresosEntreFechas(LocalDate inicio, LocalDate fin){
        return pedidorepo.sumarIngresosEntreFechas(inicio, fin);
    }
}
