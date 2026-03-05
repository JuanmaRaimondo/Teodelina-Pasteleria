import { useState, useEffect } from 'react';
import axios from 'axios';

const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';

export default function Produccion() {
  const [pestanaActiva, setPestanaActiva] = useState('insumos'); 
  
  // Estados Insumos
  const [insumos, setInsumos] = useState([]);
  const [cargandoInsumos, setCargandoInsumos] = useState(false);
  const [mostrarFormInsumo, setMostrarFormInsumo] = useState(false);
  const [editandoInsumoId, setEditandoInsumoId] = useState(null);
  const [formularioInsumo, setFormularioInsumo] = useState({ nombre: '', marca: '', precioUnitario: '', stock: '', unidadDeMedida: '' });

  // Estados Productos
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [formularioProducto, setFormularioProducto] = useState({ nombre: '', descripcion: '', categoria: '', precio: '', sintaac: false });
  
  // Estados Recetas
  const [recetaExpandida, setRecetaExpandida] = useState(null);
  const [productoEditandoReceta, setProductoEditandoReceta] = useState(null);
  const [formularioReceta, setFormularioReceta] = useState({ insumoId: '', cantidad: '' });

  // --- LÓGICA ---
  const traerInsumos = async () => {
    setCargandoInsumos(true);
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      const respuesta = await axios.get('http://localhost:8080/insumo/lista', config);
      setInsumos(respuesta.data);
    } catch (error) { console.error(error); }
    setCargandoInsumos(false);
  };

  const traerProductos = async () => {
    setCargandoProductos(true);
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      const respuesta = await axios.get('http://localhost:8080/producto/traerlista', config);
      setProductos(respuesta.data);
    } catch (error) { console.error(error); }
    setCargandoProductos(false);
  };

  useEffect(() => {
    if (pestanaActiva === 'insumos') traerInsumos();
    if (pestanaActiva === 'productos') traerProductos();
  }, [pestanaActiva]);

  const manejarCambioInsumo = (e) => setFormularioInsumo({ ...formularioInsumo, [e.target.name]: e.target.value });
  const abrirFormNuevoInsumo = () => { setFormularioInsumo({ nombre: '', marca: '', precioUnitario: '', stock: '', unidadDeMedida: '' }); setEditandoInsumoId(null); setMostrarFormInsumo(true); };
  const abrirFormEditarInsumo = (insumo) => { setFormularioInsumo(insumo); setEditandoInsumoId(insumo.id); setMostrarFormInsumo(true); };
  
  const guardarInsumo = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      if (editandoInsumoId) await axios.patch(`http://localhost:8080/insumo/editar/${editandoInsumoId}`, formularioInsumo, config);
      else await axios.post('http://localhost:8080/insumo/crearinsumo', formularioInsumo, config);
      setMostrarFormInsumo(false); traerInsumos();
    } catch (error) { alert("Error al guardar."); }
  };

  const borrarInsumo = async (id) => {
    if (!window.confirm("¿Seguro?")) return;
    try {
      await axios.delete(`http://localhost:8080/insumo/borrarinsumo/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } });
      traerInsumos();
    } catch (error) { alert("Error al borrar."); }
  };

  const manejarCambioProducto = (e) => {
    const { name, value, type, checked } = e.target;
    setFormularioProducto({ ...formularioProducto, [name]: type === 'checkbox' ? checked : value });
  };
  const abrirFormNuevoProducto = () => { setFormularioProducto({ nombre: '', descripcion: '', categoria: '', precio: '', sintaac: false }); setEditandoProductoId(null); setMostrarFormProducto(true); };
  const abrirFormEditarProducto = (producto) => { setFormularioProducto(producto); setEditandoProductoId(producto.id); setMostrarFormProducto(true); };
  
  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      if (editandoProductoId) await axios.patch(`http://localhost:8080/producto/editar/${editandoProductoId}`, formularioProducto, config);
      else await axios.post('http://localhost:8080/producto/crear', formularioProducto, config);
      setMostrarFormProducto(false); traerProductos();
    } catch (error) { alert("Error al guardar."); }
  };

  const borrarProducto = async (id) => {
    if (!window.confirm("¿Seguro?")) return;
    try {
      await axios.delete(`http://localhost:8080/producto/borrar/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } });
      traerProductos();
    } catch (error) { alert("Error al borrar."); }
  };

  const fabricarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Fabricar 1 unidad de ${nombre}?`)) return;
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      const res = await axios.post(`http://localhost:8080/producto/fabricar/${id}`, {}, config);
      alert(res.data); traerProductos();
    } catch (error) { alert("Error al fabricar."); }
  };

  const toggleReceta = (id) => { setRecetaExpandida(recetaExpandida === id ? null : id); setProductoEditandoReceta(null); };
  const abrirFormularioReceta = async (id) => { if (insumos.length === 0) await traerInsumos(); setFormularioReceta({ insumoId: '', cantidad: '' }); setProductoEditandoReceta(id); };
  const guardarItemReceta = async (e, idProducto) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } };
      const payload = [{ cantidad: parseFloat(formularioReceta.cantidad), producto: { id: idProducto }, insumo: { id: parseInt(formularioReceta.insumoId) } }];
      await axios.post('http://localhost:8080/receta/cargarrecetacompleta', payload, config);
      setProductoEditandoReceta(null); traerProductos(); 
    } catch (error) { alert("Error."); }
  };
  const borrarItemReceta = async (id) => {
    if (!window.confirm("¿Quitar ingrediente?")) return;
    try {
      await axios.delete(`http://localhost:8080/receta/borrar/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('tokenTeodelina')}` } });
      traerProductos(); 
    } catch (error) { alert("Error."); }
  };

  const getColorStock = (stock) => {
    if (stock <= 1) return COLOR_TERRACOTA; 
    if (stock <= 5) return '#E6A85B'; 
    return '#8BBA8B'; 
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', boxSizing: 'border-box', backgroundColor: '#FAFAFA' };
  const btnGuardarStyle = { flex: 1, backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' };
  const btnCancelarStyle = { flex: 1, backgroundColor: '#EAEAEA', color: COLOR_CARBON, padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' };

  return (
    <div style={{ padding: '20px', paddingBottom: '80px', color: COLOR_CARBON }}>
      
      <div style={{ marginBottom: '25px', borderBottom: `2px solid ${COLOR_TERRACOTA}40`, paddingBottom: '15px' }}>
        {/* USAMOS LA CLASE DEL CSS PARA LA FUENTE CURSIVA */}
        <h1 className="titulo-teodelina" style={{ fontSize: '38px' }}>Cocina</h1>
        <p style={{ color: '#777', fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '5px' }}>Inventario y Recetas</p>
      </div>

      <div style={{ display: 'flex', backgroundColor: '#EAEAEA', borderRadius: '30px', padding: '5px', marginBottom: '25px' }}>
        <button onClick={() => { setPestanaActiva('insumos'); setMostrarFormInsumo(false); setMostrarFormProducto(false); }}
          style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', backgroundColor: pestanaActiva === 'insumos' ? '#FFFFFF' : 'transparent', color: pestanaActiva === 'insumos' ? COLOR_TERRACOTA : '#888', transition: 'all 0.3s', boxShadow: pestanaActiva === 'insumos' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}>
          📦 Ingredientes
        </button>
        <button onClick={() => { setPestanaActiva('productos'); setMostrarFormProducto(false); setMostrarFormInsumo(false); setRecetaExpandida(null); }}
          style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', backgroundColor: pestanaActiva === 'productos' ? '#FFFFFF' : 'transparent', color: pestanaActiva === 'productos' ? COLOR_TERRACOTA : '#888', transition: 'all 0.3s', boxShadow: pestanaActiva === 'productos' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}>
          🍰 Productos
        </button>
      </div>

      {/* --- PESTAÑA INSUMOS --- */}
      {pestanaActiva === 'insumos' && (
        <div>
          {mostrarFormInsumo ? (
            <div className="tarjeta-teodelina" style={{ marginBottom: '25px' }}>
              <h3 className="titulo-teodelina" style={{ fontSize: '28px', borderBottom: '1px dashed #eee', paddingBottom: '10px', marginBottom: '15px' }}>{editandoInsumoId ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</h3>
              <form onSubmit={guardarInsumo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" name="nombre" placeholder="Nombre (Ej: Harina)" value={formularioInsumo.nombre} onChange={manejarCambioInsumo} required style={inputStyle} />
                <input type="text" name="marca" placeholder="Marca" value={formularioInsumo.marca} onChange={manejarCambioInsumo} required style={inputStyle} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="number" step="0.01" name="precioUnitario" placeholder="Costo Unitario ($)" value={formularioInsumo.precioUnitario} onChange={manejarCambioInsumo} required style={inputStyle} />
                  <input type="number" step="0.01" name="stock" placeholder="Stock Actual" value={formularioInsumo.stock} onChange={manejarCambioInsumo} required style={inputStyle} />
                </div>
                <input type="text" name="unidadDeMedida" placeholder="Unidad (KG, Litro, Unidad)" value={formularioInsumo.unidadDeMedida} onChange={manejarCambioInsumo} required style={inputStyle} />
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" style={btnGuardarStyle}>Guardar</button>
                  <button type="button" onClick={() => setMostrarFormInsumo(false)} style={btnCancelarStyle}>Cancelar</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
                <button onClick={abrirFormNuevoInsumo} style={{ backgroundColor: COLOR_CARBON, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>+ Agregar Stock</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {insumos.map((insumo) => (
                  <div key={insumo.id} className="tarjeta-teodelina">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700' }}>{insumo.nombre}</h3>
                        <span style={{ fontSize: '11px', color: '#888', backgroundColor: '#F5F5F5', padding: '4px 10px', borderRadius: '15px' }}>{insumo.marca || 'Sin marca'}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '20px', fontWeight: '700', color: getColorStock(insumo.stock) }}>
                          {insumo.stock} <span style={{ fontSize: '12px', color: '#888' }}>{insumo.unidadDeMedida}</span>
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', borderTop: '1px solid #F0F0F0', paddingTop: '10px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Costo: <strong style={{color: COLOR_CARBON}}>${insumo.precioUnitario}</strong></p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => abrirFormEditarInsumo(insumo)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>✏️</button>
                        <button onClick={() => borrarInsumo(insumo.id)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* --- PESTAÑA PRODUCTOS --- */}
      {pestanaActiva === 'productos' && (
        <div>
          {mostrarFormProducto ? (
            <div className="tarjeta-teodelina" style={{ marginBottom: '25px' }}>
              <h3 className="titulo-teodelina" style={{ fontSize: '28px', borderBottom: '1px dashed #eee', paddingBottom: '10px', marginBottom: '15px' }}>{editandoProductoId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <form onSubmit={guardarProducto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" name="nombre" placeholder="Nombre de la torta" value={formularioProducto.nombre} onChange={manejarCambioProducto} required style={inputStyle} />
                <textarea name="descripcion" placeholder="Descripción breve" value={formularioProducto.descripcion} onChange={manejarCambioProducto} style={{...inputStyle, resize: 'vertical'}} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input type="text" name="categoria" placeholder="Categoría" value={formularioProducto.categoria} onChange={manejarCambioProducto} required style={inputStyle} />
                  <input type="number" step="0.01" name="precio" placeholder="Precio ($)" value={formularioProducto.precio} onChange={manejarCambioProducto} required style={inputStyle} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#888', fontWeight: '600' }}>
                  <input type="checkbox" name="sintaac" checked={formularioProducto.sintaac} onChange={manejarCambioProducto} style={{ accentColor: COLOR_TERRACOTA, transform: 'scale(1.3)' }} />
                  ¿Es apto para celíacos (Sin TACC)? 🌾
                </label>
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" style={btnGuardarStyle}>Guardar</button>
                  <button type="button" onClick={() => setMostrarFormProducto(false)} style={btnCancelarStyle}>Cancelar</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
                <button onClick={abrirFormNuevoProducto} style={{ backgroundColor: COLOR_CARBON, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>+ Nuevo Producto</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {productos.map((producto) => (
                  <div key={producto.id} className="tarjeta-teodelina" style={{ borderTop: `5px solid ${COLOR_TERRACOTA}` }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '700' }}>{producto.nombre}</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{producto.descripcion}</p>
                        {producto.sintaac && <span style={{ display: 'inline-block', marginTop: '8px', backgroundColor: '#FFF9F8', color: COLOR_TERRACOTA, padding: '4px 10px', borderRadius: '15px', fontSize: '10px', fontWeight: '700', border: `1px solid ${COLOR_TERRACOTA}40` }}>SIN TACC</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => abrirFormEditarProducto(producto)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>✏️</button>
                        <button onClick={() => borrarProducto(producto.id)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#FAFAFA', padding: '15px', borderRadius: '12px', marginTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', border: '1px solid #F0F0F0' }}>
                      <div><span style={{ fontSize: '10px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px' }}>Venta</span><p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLOR_CARBON }}>${producto.precio}</p></div>
                      <div><span style={{ fontSize: '10px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px' }}>Costo</span><p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#D95447' }}>${producto.costoTotal}</p></div>
                      <div><span style={{ fontSize: '10px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px' }}>Ganancia</span><p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#8BBA8B' }}>${producto.gananciaNeta}</p></div>
                      <div><span style={{ fontSize: '10px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px' }}>Rentab.</span><p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLOR_CARBON }}>{producto.rentabilidadPorcentaje}%</p></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', borderBottom: recetaExpandida === producto.id ? 'none' : '1px solid #F0F0F0', paddingBottom: '15px' }}>
                      <button onClick={() => toggleReceta(producto.id)} style={{ background: 'none', border: 'none', color: COLOR_TERRACOTA, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                        {recetaExpandida === producto.id ? '▲ Ocultar Receta' : '▼ Ver Receta'}
                      </button>
                    </div>

                    {recetaExpandida === producto.id && (
                      <div style={{ backgroundColor: '#FFF9F8', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: `1px solid ${COLOR_TERRACOTA}30` }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: COLOR_TERRACOTA, textTransform: 'uppercase' }}>Ingredientes:</h4>
                        {producto.receta && producto.receta.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: 0, listStyleType: 'none', fontSize: '13px' }}>
                            {producto.receta.map(item => (
                              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0E6E6', padding: '8px 0' }}>
                                <span><strong>{item.cantidad}</strong> {item.insumo?.unidadDeMedida} de {item.insumo?.nombre}</span>
                                <button onClick={() => borrarItemReceta(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>🗑️</button>
                              </li>
                            ))}
                          </ul>
                        ) : (<p style={{ margin: 0, fontSize: '12px', color: '#888', fontStyle: 'italic' }}>Receta vacía.</p>)}

                        {productoEditandoReceta === producto.id ? (
                          <form onSubmit={(e) => guardarItemReceta(e, producto.id)} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <select required value={formularioReceta.insumoId} onChange={(e) => setFormularioReceta({...formularioReceta, insumoId: e.target.value})} style={inputStyle}>
                              <option value="">Seleccionar ingrediente...</option>
                              {insumos.map(ins => <option key={ins.id} value={ins.id}>{ins.nombre} ({ins.unidadDeMedida})</option>)}
                            </select>
                            <input type="number" step="0.01" required placeholder="Cantidad" value={formularioReceta.cantidad} onChange={(e) => setFormularioReceta({...formularioReceta, cantidad: e.target.value})} style={inputStyle} />
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button type="submit" style={{...btnGuardarStyle, padding: '10px'}}>Aceptar</button>
                              <button type="button" onClick={() => setProductoEditandoReceta(null)} style={{...btnCancelarStyle, padding: '10px'}}>Cancelar</button>
                            </div>
                          </form>
                        ) : (
                          <button onClick={() => abrirFormularioReceta(producto.id)} style={{ width: '100%', marginTop: '15px', background: 'transparent', color: COLOR_TERRACOTA, border: `1px dashed ${COLOR_TERRACOTA}`, padding: '10px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
                            + Agregar Ingrediente
                          </button>
                        )}
                      </div>
                    )}

                    <button onClick={() => fabricarProducto(producto.id, producto.nombre)} style={{ width: '100%', backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50` }}>
                      Fabricar 1 Unidad
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}