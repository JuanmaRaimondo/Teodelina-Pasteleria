import { useState, useEffect } from 'react';
import axios from 'axios';

// --- PALETA DE MARCA TEODELINA ---
const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';
const FUENTE_SCRIPT = "'Dancing Script', cursive";
const FUENTE_SANS = "'Montserrat', sans-serif";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '', apellido: '', direccion: '', telefono: '', usuarioInstagram: ''
  });

  const traerClientes = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const respuesta = await axios.get('http://localhost:8080/cliente/listarclientes', config);
      setClientes(respuesta.data);
    } catch (error) {
      console.error("Error al traer clientes:", error);
    }
    setCargando(false);
  };

  useEffect(() => { traerClientes(); }, []);

  const clientesFiltrados = clientes.filter(cliente => {
    const termino = busqueda.toLowerCase();
    const nombreCompleto = `${cliente.nombre || ''} ${cliente.apellido || ''}`.toLowerCase();
    return nombreCompleto.includes(termino) || (cliente.telefono && cliente.telefono.includes(termino));
  });

  const manejarCambio = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const abrirFormNuevo = () => {
    setFormulario({ nombre: '', apellido: '', direccion: '', telefono: '', usuarioInstagram: '' });
    setEditandoId(null);
    setMostrarForm(true);
  };

  const abrirFormEditar = (cliente) => {
    setFormulario({
      nombre: cliente.nombre || '', apellido: cliente.apellido || '',
      direccion: cliente.direccion || '', telefono: cliente.telefono || '',
      usuarioInstagram: cliente.usuarioInstagram || ''
    });
    setEditandoId(cliente.id);
    setMostrarForm(true);
  };

  const guardarCliente = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editandoId) {
        await axios.patch(`http://localhost:8080/cliente/editar/${editandoId}`, formulario, config);
      } else {
        await axios.post('http://localhost:8080/cliente/crear', formulario, config);
      }
      setMostrarForm(false);
      traerClientes(); 
    } catch (error) {
      alert("No se pudo guardar el cliente.");
    }
  };

  const borrarCliente = async (id) => {
    if (!window.confirm("¿Seguro que querés borrar este cliente?")) return;
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:8080/cliente/borrar/${id}`, config);
      traerClientes();
    } catch (error) {
      alert("No se pudo borrar al cliente. Tal vez tiene pedidos asociados.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: FUENTE_SANS, paddingBottom: '80px', color: COLOR_CARBON }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700&display=swap');`}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: `2px solid ${COLOR_TERRACOTA}40`, paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontFamily: FUENTE_SCRIPT, fontSize: '38px', color: COLOR_TERRACOTA, margin: '0', letterSpacing: '1px' }}>Clientes</h1>
          <p style={{ color: '#777', fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>Agenda VIP</p>
        </div>
        <button onClick={abrirFormNuevo} style={{ backgroundColor: COLOR_TERRACOTA, color: 'white', border: 'none', padding: '10px 18px', borderRadius: '30px', fontFamily: FUENTE_SANS, fontWeight: '600', cursor: 'pointer', boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50` }}>
          + Nuevo
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarForm && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', marginBottom: '25px' }}>
          <h3 style={{ marginTop: 0, color: COLOR_TERRACOTA, fontFamily: FUENTE_SCRIPT, fontSize: '28px', borderBottom: '1px dashed #eee', paddingBottom: '10px' }}>{editandoId ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
          <form onSubmit={guardarCliente} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} required style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: FUENTE_SANS, backgroundColor: '#FAFAFA' }} />
              <input type="text" name="apellido" placeholder="Apellido" value={formulario.apellido} onChange={manejarCambio} required style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: FUENTE_SANS, backgroundColor: '#FAFAFA' }} />
            </div>
            <input type="text" name="direccion" placeholder="Dirección de entrega" value={formulario.direccion} onChange={manejarCambio} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: FUENTE_SANS, backgroundColor: '#FAFAFA' }} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={manejarCambio} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: FUENTE_SANS, backgroundColor: '#FAFAFA' }} />
              <input type="text" name="usuarioInstagram" placeholder="Instagram (@)" value={formulario.usuarioInstagram} onChange={manejarCambio} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: FUENTE_SANS, backgroundColor: '#FAFAFA' }} />
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', fontFamily: FUENTE_SANS, cursor: 'pointer', boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50` }}>Guardar</button>
              <button type="button" onClick={() => setMostrarForm(false)} style={{ flex: 1, backgroundColor: '#EAEAEA', color: COLOR_CARBON, padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', fontFamily: FUENTE_SANS, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* BUSCADOR ESTILO PÍLDORA */}
      {!mostrarForm && (
        <input 
          type="text" placeholder="🔍 Buscar por nombre o teléfono..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '100%', padding: '15px 20px', borderRadius: '30px', border: '1px solid #ddd', marginBottom: '20px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: FUENTE_SANS, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
        />
      )}

      {/* LISTA */}
      {cargando ? (
        <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>Cargando agenda... ⏳</p>
      ) : clientesFiltrados.length === 0 && !mostrarForm ? (
        <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}><p style={{color: '#888'}}>No se encontraron clientes.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!mostrarForm && clientesFiltrados.map((cliente) => (
            <div key={cliente.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.04)', borderLeft: `5px solid ${COLOR_TERRACOTA}80` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: COLOR_CARBON, fontWeight: '700' }}>{cliente.nombre} {cliente.apellido}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>📍 {cliente.direccion || 'Sin dirección'}</p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    {cliente.telefono && <span style={{ fontSize: '12px', color: COLOR_CARBON, fontWeight: '600', backgroundColor: '#F5F5F5', padding: '4px 10px', borderRadius: '15px' }}>📞 {cliente.telefono}</span>}
                    {cliente.usuarioInstagram && <span style={{ fontSize: '12px', color: COLOR_TERRACOTA, fontWeight: '600', backgroundColor: '#FFF9F8', padding: '4px 10px', borderRadius: '15px' }}>📸 @{cliente.usuarioInstagram}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => abrirFormEditar(cliente)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', opacity: 0.6 }}>✏️</button>
                  <button onClick={() => borrarCliente(cliente.id)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', opacity: 0.6 }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}