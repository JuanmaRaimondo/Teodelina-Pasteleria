import { useState } from 'react';
import axios from 'axios';

const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';

export default function Instagram() {
  const [producto, setProducto] = useState('');
  const [campania, setCampania] = useState('Post de Venta Regular'); 
  const [tono, setTono] = useState('divertido y alegre');
  const [borrador, setBorrador] = useState(null); 
  const [cargando, setCargando] = useState(false);
  
  // --- NUEVOS ESTADOS PARA EL FEEDBACK ---
  const [feedbackInput, setFeedbackInput] = useState('');
  const [cargandoFeedback, setCargandoFeedback] = useState(false);

  const generarPost = async () => {
    if (!producto) return alert("Escribí el nombre del producto primero.");
    setCargando(true);
    setBorrador(null);
    
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const motivoParaIA = `${campania} (Tono del mensaje: ${tono})`;

      const respuesta = await axios.post(
        `http://localhost:8080/borradorinstagram/generar?campania=${encodeURIComponent(motivoParaIA)}&productos=${encodeURIComponent(producto)}`, 
        {}, 
        config
      );
      
      setBorrador(respuesta.data);
    } catch (error) {
      console.error("Error de IA:", error);
      alert("Hubo un error al conectar con la IA.");
    }
    setCargando(false);
  };

  // --- NUEVA FUNCIÓN DE FEEDBACK ---
  const enviarFeedback = async () => {
    if (!feedbackInput) return alert("Escribí qué querés cambiar del texto.");
    setCargandoFeedback(true);
    
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Apuntamos a tu @PatchMapping("/feedback/{id}") pasando el parámetro por URL
      const respuesta = await axios.patch(
        `http://localhost:8080/borradorinstagram/feedback/${borrador.id}?feedback=${encodeURIComponent(feedbackInput)}`, 
        {}, 
        config
      );
      
      // Actualizamos la tarjeta con la versión mejorada que devuelve Java
      setBorrador(respuesta.data);
      setFeedbackInput(''); // Limpiamos la cajita
    } catch (error) {
      console.error("Error al dar feedback:", error);
      alert("Hubo un error al pedirle la reescritura a la IA.");
    }
    setCargandoFeedback(false);
  };

  const aprobarPost = async () => {
    try {
      const token = localStorage.getItem('tokenTeodelina');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Llamamos a tu ruta /publicar/
      const respuesta = await axios.patch(`http://localhost:8080/borradorinstagram/publicar/${borrador.id}`, {}, config);
      setBorrador(respuesta.data); // Actualiza la tarjetita al nuevo estado
      alert("¡Post aprobado y listo para usar en tus redes! 🎉");
    } catch (error) {
      alert("Error al intentar aprobar el post.");
    }
  };

  const inputStyle = { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '8px', marginBottom: '20px', boxSizing: 'border-box', backgroundColor: '#FAFAFA' };

  return (
    <div style={{ padding: '20px', paddingBottom: '80px', color: COLOR_CARBON }}>
      
      <div style={{ marginBottom: '25px', borderBottom: `2px solid ${COLOR_TERRACOTA}40`, paddingBottom: '15px' }}>
        <h1 className="titulo-teodelina" style={{ fontSize: '38px' }}>IA Marketing</h1>
        <p style={{ color: '#777', fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '5px' }}>Generador de Contenido</p>
      </div>

      {!borrador && (
        <div className="tarjeta-teodelina">
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Configurá tu campaña y dejá que la IA escriba el post perfecto para tus redes sociales. ✨
          </p>

          <label style={{ fontSize: '12px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>1. Motivo / Campaña</label>
          <select value={campania} onChange={(e) => setCampania(e.target.value)} style={inputStyle}>
            <option value="Post de Venta Regular">🗓️ Post de Venta Regular (Día a Día)</option>
            <option value="Campaña Día de la Madre">👩‍👧 Campaña: Día de la Madre</option>
            <option value="Campaña Día del Padre">👨‍👦 Campaña: Día del Padre</option>
            <option value="Campaña Pascuas">🐰 Campaña: Pascuas</option>
            <option value="Campaña Fiestas (Navidad/Año Nuevo)">🎄 Campaña: Fiestas y Fin de Año</option>
            <option value="Lanzamiento de Nuevo Producto">🚀 Lanzamiento de Nuevo Producto</option>
          </select>

          <label style={{ fontSize: '12px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>2. ¿Qué producto/s vas a incluir?</label>
          <input type="text" placeholder="Ej: Promo 2 Lemon Pie..." value={producto} onChange={(e) => setProducto(e.target.value)} style={inputStyle} />

          <label style={{ fontSize: '12px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>3. Tono del mensaje</label>
          <select value={tono} onChange={(e) => setTono(e.target.value)} style={inputStyle}>
            <option value="emotivo y casero">💖 Emotivo y Casero</option>
            <option value="divertido y alegre">🥳 Divertido y Alegre</option>
            <option value="elegante y sofisticado">✨ Elegante y Sofisticado</option>
            <option value="urgencia y promocional">🚨 Urgencia (¡Últimos lugares!)</option>
          </select>

          <button onClick={generarPost} disabled={cargando} style={{ width: '100%', backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '16px', border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '15px', cursor: cargando ? 'not-allowed' : 'pointer', boxShadow: `0 4px 10px ${COLOR_TERRACOTA}50` }}>
            {cargando ? 'La IA está escribiendo... ⏳' : 'Generar Borrador ✨'}
          </button>
        </div>
      )}

      {/* --- RESULTADO Y FEEDBACK --- */}
      {borrador && (
        <div className="tarjeta-teodelina" style={{ borderTop: `4px solid ${COLOR_TERRACOTA}` }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4 style={{ margin: '0', color: COLOR_TERRACOTA, fontSize: '13px', textTransform: 'uppercase' }}>Texto del Post</h4>
            <span style={{ backgroundColor: '#FFF9F8', color: COLOR_TERRACOTA, padding: '4px 10px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>{borrador.estado || 'BORRADOR'}</span>
          </div>
          
          <p style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6', color: COLOR_CARBON, margin: 0, backgroundColor: '#FAFAFA', padding: '15px', borderRadius: '12px', border: '1px solid #EEEEEE' }}>
            {borrador.texto}
          </p>

          <button onClick={() => { navigator.clipboard.writeText(borrador.texto); alert("¡Texto copiado!"); }} style={{ marginTop: '15px', width: '100%', backgroundColor: COLOR_CARBON, color: 'white', border: 'none', padding: '12px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            📋 Copiar Texto
          </button>

          {/* --- SECCIÓN DE FEEDBACK MAGICO --- */}
          <div style={{ marginTop: '25px', borderTop: '1px dashed #DDD', paddingTop: '20px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>¿No te convence? Pedile cambios a la IA</label>
            <textarea 
              value={feedbackInput} 
              onChange={(e) => setFeedbackInput(e.target.value)} 
              placeholder="Ej: Hacelo más corto, agregá más emojis, sacá la palabra 'oferta'..." 
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px', marginTop: '10px', marginBottom: '10px' }} 
            />
            <button onClick={enviarFeedback} disabled={cargandoFeedback} style={{ width: '100%', backgroundColor: '#E6A85B', color: 'white', padding: '14px', border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '14px', cursor: cargandoFeedback ? 'not-allowed' : 'pointer', boxShadow: '0 4px 10px rgba(230, 168, 91, 0.4)' }}>
              {cargandoFeedback ? 'Reescribiendo... ⏳' : '🪄 Reescribir con Feedback'}
            </button>
          </div>

          <button onClick={() => setBorrador(null)} style={{ width: '100%', backgroundColor: 'transparent', color: '#888', border: 'none', padding: '12px', marginTop: '15px', cursor: 'pointer', fontWeight: '600' }}>
            ← Empezar uno nuevo
          </button>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={() => { navigator.clipboard.writeText(borrador.texto); alert("¡Texto copiado!"); }} style={{ flex: 1, backgroundColor: COLOR_CARBON, color: 'white', border: 'none', padding: '12px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              📋 Copiar
            </button>
            <button onClick={aprobarPost} style={{ flex: 1, backgroundColor: '#8BBA8B', color: 'white', border: 'none', padding: '12px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              ✅ Aprobar
            </button>
          </div>
        </div>
        
      )}
    </div>
  );
}