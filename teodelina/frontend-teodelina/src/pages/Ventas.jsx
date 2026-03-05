import { useState, useEffect } from 'react';
import axios from 'axios';

// --- PALETA DE MARCA TEODELINA ---
const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';
const FUENTE_SCRIPT = "'Dancing Script', cursive";
const FUENTE_SANS = "'Montserrat', sans-serif";

export default function Ventas() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados para el Formulario
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({
    clienteId: '', productosIds: [], diaEntrega: '', horarioEntrega: '', 
    descripcion: '', senia: '', montoTotal: '', tipoDeEntrega: 'RETIRO'
  });

  // 1. TRAER LOS PEDIDOS
  const traerPedidos = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const respuesta = await axios.get('http://localhost:8080/pedido/listapedido', config);
      setPedidos(respuesta.data);
    } catch (error) {
      console.error("Error al traer los pedidos:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  // 2. PREPARAR EL FORMULARIO
  const abrirFormulario = async () => {
    setMostrarForm(true);
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const resClientes = await axios.get('http://localhost:8080/cliente/listarclientes', config);
      const resProductos = await axios.get('http://localhost:8080/producto/traerlista', config);
      setClientes(resClientes.data);
      setProductos(resProductos.data);
    } catch (error) {
      alert("Hubo un error al cargar los clientes o productos.");
    }
  };

  const manejarCambio = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const manejarCheckboxProducto = (idProducto) => {
    setFormulario((prev) => {
      const ids = prev.productosIds.includes(idProducto)
        ? prev.productosIds.filter(id => id !== idProducto) 
        : [...prev.productosIds, idProducto]; 
      return { ...prev, productosIds: ids };
    });
  };

  // 3. GUARDAR EL NUEVO PEDIDO
  const guardarPedido = async (e) => {
    e.preventDefault();
    if (formulario.productosIds.length === 0) {
      alert("¡Tenés que elegir al menos un producto!");
      return;
    }
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const pedidoNuevo = {
        diaEntrega: formulario.diaEntrega,
        horarioEntrega: formulario.horarioEntrega, 
        descripcion: formulario.descripcion,
        senia: parseFloat(formulario.senia) || 0.0,
        montoTotal: parseFloat(formulario.montoTotal) || 0.0,
        estadoDelPedido: 'PENDIENTE',
        estadoDelPago: parseFloat(formulario.senia) > 0 ? 'SEÑADO' : 'PENDIENTE',
        tipoDeEntrega: formulario.tipoDeEntrega,
        cliente: { id: parseInt(formulario.clienteId) }, 
        listaProductos: formulario.productosIds.map(id => ({ id: id })) 
      };
      await axios.post('http://localhost:8080/pedido/crear', pedidoNuevo, config);
      setMostrarForm(false);
      setFormulario({ clienteId: '', productosIds: [], diaEntrega: '', horarioEntrega: '', descripcion: '', senia: '', montoTotal: '', tipoDeEntrega: 'RETIRO' });
      traerPedidos(); 
    } catch (error) {
      alert("Error al crear el pedido. Revisá la consola.");
    }
  };

  // 4. ACCIONES (Cambiar estado y borrar)
  const cambiarEstado = async (idPedido, nuevoEstado) => {
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const pedidoOriginal = pedidos.find(p => p.id === idPedido);
      const pedidoActualizado = { ...pedidoOriginal, estadoDelPedido: nuevoEstado };
      await axios.patch(`http://localhost:8080/pedido/editar/${idPedido}`, pedidoActualizado, config);
      traerPedidos(); 
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  const borrarPedido = async (idPedido) => {
    if (!window.confirm("¿Estás seguro de borrar este pedido?")) return;
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:8080/pedido/borrar/${idPedido}`, config);
      traerPedidos();
    } catch (error) {
      alert("No se pudo borrar el pedido.");
    }
  };

  // COLORES DE ESTADOS PASTEL (Más elegantes)
  const getColorEstado = (estado) => {
    const est = estado?.toUpperCase() || '';
    if (est === 'PENDIENTE') return '#E6A85B'; // Naranja/Dorado suave
    if (est === 'SEÑADO') return '#62A8AC'; // Verde agua/Teal
    if (est === 'ENTREGADO') return '#8BBA8B'; // Verde salvia
    return '#B0B0B0'; 
  };

  return (
    <div style={{ padding: '20px', fontFamily: FUENTE_SANS, paddingBottom: '80px', color: COLOR_CARBON }}>
      {/* INYECTAMOS LAS FUENTES DE GOOGLE PARA QUE SE VEA COMO EL LOGO */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700&display=swap');`}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: `2px solid ${COLOR_TERRACOTA}40`, paddingBottom: '15px' }}>
        <div>
          {/* TÍTULO CON LA FUENTE DEL LOGO */}
          <h1 style={{ fontFamily: FUENTE_SCRIPT, fontSize: '38px', color: COLOR_TERRACOTA, margin: '0', letterSpacing: '1px' }}>Ventas</h1>
          <p style={{ color: '#777', fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>Gestión de Pedidos</p>
        </div>
        {!mostrarForm && (
          <button onClick={abrirFormulario} style={{ backgroundColor: COLOR_TERRACOTA, color: 'white', border: 'none', padding: '10px 18px', borderRadius: '30px', fontFamily: FUENTE_SANS, fontWeight: '600', cursor: 'pointer', boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50`, transition: 'transform 0.2s' }}>
            + Nuevo Pedido
          </button>
        )}
      </div>

      {/* --- FORMULARIO DE NUEVO PEDIDO --- */}
      {mostrarForm && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', marginBottom: '25px' }}>
          <h3 style={{ marginTop: 0, color: COLOR_TERRACOTA, fontFamily: FUENTE_SCRIPT, fontSize: '28px', borderBottom: '1px dashed #eee', paddingBottom: '10px' }}>Nuevo Encargo</h3>
          <form onSubmit={guardarPedido} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Selector de Cliente */}
            <div>
              <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>1. Cliente</label>
              <select name="clienteId" value={formulario.clienteId} onChange={manejarCambio} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', fontFamily: FUENTE_SANS, color: COLOR_CARBON, backgroundColor: '#FAFAFA' }}>
                <option value="">-- Seleccionar de la agenda --</option>
                {clientes.map(cli => <option key={cli.id} value={cli.id}>{cli.nombre} {cli.apellido}</option>)}
              </select>
            </div>

            {/* Selector de Productos */}
            <div>
              <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>2. Productos solicitados</label>
              <div style={{ backgroundColor: '#FAFAFA', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', maxHeight: '120px', overflowY: 'auto' }}>
                {productos.map(prod => (
                  <label key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formulario.productosIds.includes(prod.id)} onChange={() => manejarCheckboxProducto(prod.id)} style={{ accentColor: COLOR_TERRACOTA, transform: 'scale(1.2)' }} />
                    <span>{prod.nombre} <strong style={{color: COLOR_TERRACOTA}}>${prod.precio}</strong></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fechas y Entregas */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>Día</label>
                <input type="date" name="diaEntrega" value={formulario.diaEntrega} onChange={manejarCambio} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', boxSizing: 'border-box', fontFamily: FUENTE_SANS, color: COLOR_CARBON }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>Hora</label>
                <input type="time" name="horarioEntrega" value={formulario.horarioEntrega} onChange={manejarCambio} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', boxSizing: 'border-box', fontFamily: FUENTE_SANS, color: COLOR_CARBON }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>Modalidad</label>
              <select name="tipoDeEntrega" value={formulario.tipoDeEntrega} onChange={manejarCambio} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', fontFamily: FUENTE_SANS, color: COLOR_CARBON }}>
                <option value="RETIRO">Retira por el local</option>
                <option value="DELIVERY">Envío a domicilio</option>
              </select>
            </div>

            {/* Finanzas */}
            <div style={{ display: 'flex', gap: '15px', backgroundColor: '#FFF9F8', padding: '15px', borderRadius: '10px', border: `1px solid ${COLOR_TERRACOTA}30` }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: COLOR_TERRACOTA, fontWeight: '600', textTransform: 'uppercase' }}>Seña dejada</label>
                <div style={{ position: 'relative', marginTop: '5px' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#888' }}>$</span>
                  <input type="number" name="senia" value={formulario.senia} onChange={manejarCambio} placeholder="0" style={{ width: '100%', padding: '12px 12px 12px 25px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: FUENTE_SANS }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: COLOR_TERRACOTA, fontWeight: '600', textTransform: 'uppercase' }}>Monto TOTAL</label>
                <div style={{ position: 'relative', marginTop: '5px' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#888' }}>$</span>
                  <input type="number" name="montoTotal" value={formulario.montoTotal} onChange={manejarCambio} required placeholder="0" style={{ width: '100%', padding: '12px 12px 12px 25px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: FUENTE_SANS, fontWeight: 'bold' }} />
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div>
              <label style={{ fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' }}>Detalles de decoración / notas</label>
              <textarea name="descripcion" value={formulario.descripcion} onChange={manejarCambio} placeholder="Ej: Pastel con diseño de flores..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px', boxSizing: 'border-box', resize: 'vertical', fontFamily: FUENTE_SANS, minHeight: '80px' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: FUENTE_SANS, boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50` }}>Cargar Pedido</button>
              <button type="button" onClick={() => setMostrarForm(false)} style={{ flex: 1, backgroundColor: '#EAEAEA', color: COLOR_CARBON, padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: FUENTE_SANS }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* --- LISTA DE PEDIDOS --- */}
      {!mostrarForm && cargando ? (
        <p style={{ textAlign: 'center', marginTop: '50px', fontStyle: 'italic', color: '#888' }}>Horneando datos... ⏳</p>
      ) : !mostrarForm && pedidos.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#FFF', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>📋</span>
          <p style={{ margin: 0, color: '#888' }}>La bandeja de pedidos está vacía.</p>
        </div>
      ) : !mostrarForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pedidos.map((pedido) => (
            <div key={pedido.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              
              {/* Línea de color superior según estado */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: getColorEstado(pedido.estadoDelPedido) }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '5px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: '#A0A0A0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Pedido #{pedido.id}</span>
                  <h3 style={{ margin: '5px 0 2px 0', fontSize: '18px', color: COLOR_CARBON, fontWeight: '700' }}>
                    {pedido.cliente?.nombre} {pedido.cliente?.apellido || ''}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    📍 {pedido.tipoDeEntrega === 'DELIVERY' ? 'Envío' : 'Retira local'}
                  </span>
                </div>
                <button onClick={() => borrarPedido(pedido.id)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#CCC', padding: '5px' }}>🗑️</button>
              </div>

              <div style={{ margin: '15px 0', padding: '12px', backgroundColor: '#FAFAFA', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p style={{ margin: '0', fontSize: '13px', color: COLOR_CARBON }}><strong>📅 {pedido.diaEntrega}</strong></p>
                  <p style={{ margin: '0', fontSize: '13px', color: COLOR_CARBON }}><strong>⏰ {pedido.horarioEntrega}</strong></p>
                </div>
                {pedido.descripcion && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#666', fontStyle: 'italic', borderTop: '1px dashed #DDD', paddingTop: '8px' }}>
                    "{pedido.descripcion}"
                  </p>
                )}
              </div>
                
              {/* Mostramos las tortas que compró */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}>
                {pedido.listaProductos?.map(prod => (
                  <span key={prod.id} style={{ backgroundColor: '#F5F5F5', color: COLOR_CARBON, padding: '5px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', border: '1px solid #EAEAEA' }}>
                    🍰 {prod.nombre}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #F0F0F0', paddingTop: '15px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>Total</p>
                  <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: COLOR_TERRACOTA }}>
                    ${pedido.montoTotal}
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#888' }}>Seña: ${pedido.senia || 0}</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ backgroundColor: getColorEstado(pedido.estadoDelPedido), color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {pedido.estadoDelPedido || 'PENDIENTE'}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => cambiarEstado(pedido.id, 'SEÑADO')} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid #62A8AC`, color: '#62A8AC', fontSize: '10px', fontWeight: '700', cursor: 'pointer', background: 'transparent' }}>Señar</button>
                    <button onClick={() => cambiarEstado(pedido.id, 'ENTREGADO')} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid #8BBA8B`, color: '#8BBA8B', fontSize: '10px', fontWeight: '700', cursor: 'pointer', background: 'transparent' }}>Entregar</button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}