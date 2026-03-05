import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Guardamos en qué tarjeta estamos (empezamos en la 0)
  const [indiceActual, setIndiceActual] = useState(0);

  // Nuestra lista de pantallas
  const tarjetas = [
    { id: 'ventas', titulo: 'Ventas', icono: '🛍️', desc: 'Gestionar pedidos, señas y entregas.', color: COLOR_TERRACOTA, ruta: '/ventas' },
    { id: 'produccion', titulo: 'Cocina', icono: '👨‍🍳', desc: 'Control de inventario y recetas.', color: '#E6A85B', ruta: '/produccion' },
    { id: 'clientes', titulo: 'Agenda VIP', icono: '👥', desc: 'Toda la información de tus clientes.', color: '#8BBA8B', ruta: '/clientes' },
    { id: 'instagram', titulo: 'IA Marketing', icono: '📸✨', desc: 'Generá posteos para tus redes sociales.', color: COLOR_CARBON, ruta: '/instagram' }
  ];

  const irSiguiente = () => {
    // Si estamos en la última, volvemos a la primera. Si no, avanzamos una.
    setIndiceActual((prev) => (prev === tarjetas.length - 1 ? 0 : prev + 1));
  };

  const irAnterior = () => {
    // Si estamos en la primera, vamos a la última. Si no, retrocedemos una.
    setIndiceActual((prev) => (prev === 0 ? tarjetas.length - 1 : prev - 1));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('tokenTeodelina');
    navigate('/login');
  };

  const tarjetaActiva = tarjetas[indiceActual];

  return (
    <div style={{ padding: '20px', paddingBottom: '80px', color: COLOR_CARBON, maxWidth: '600px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <div>
          <p style={{ color: '#888', fontSize: '13px', margin: '0', textTransform: 'uppercase', letterSpacing: '1px' }}>Bienvenida a</p>
          <h1 className="titulo-teodelina" style={{ fontSize: '42px' }}>Teodelina</h1>
        </div>
        <button onClick={cerrarSesion} style={{ background: 'none', border: `1px solid ${COLOR_CARBON}30`, color: COLOR_CARBON, padding: '8px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      <h3 style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', textAlign: 'center' }}>
        ¿Qué hacemos hoy?
      </h3>
      
      {/* CARRUSEL CENTRAL */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* BOTÓN ANTERIOR */}
        <button 
          onClick={irAnterior} 
          style={{ background: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', fontSize: '20px', color: COLOR_TERRACOTA, flexShrink: 0 }}
        >
          ◀
        </button>

        {/* TARJETA GRANDE ACTIVA */}
        <div 
          className="tarjeta-teodelina" 
          onClick={() => navigate(tarjetaActiva.ruta)}
          style={{ 
            flex: 1, 
            borderTop: `6px solid ${tarjetaActiva.color}`, 
            cursor: 'pointer', 
            padding: '40px 20px', 
            textAlign: 'center', 
            minHeight: '220px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center'
          }} 
        >
          <span style={{ fontSize: '65px', marginBottom: '15px', display: 'block' }}>{tarjetaActiva.icono}</span>
          <h2 style={{ margin: '0 0 10px 0', color: COLOR_CARBON, fontSize: '26px', fontWeight: '700' }}>{tarjetaActiva.titulo}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#888', lineHeight: '1.4' }}>{tarjetaActiva.desc}</p>
          
          <span style={{ marginTop: '20px', backgroundColor: '#FAFAFA', padding: '8px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: COLOR_TERRACOTA, border: '1px solid #EEE' }}>
            Ingresar
          </span>
        </div>

        {/* BOTÓN SIGUIENTE */}
        <button 
          onClick={irSiguiente} 
          style={{ background: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', fontSize: '20px', color: COLOR_TERRACOTA, flexShrink: 0 }}
        >
          ▶
        </button>

      </div>

      {/* PUNTITOS INDICADORES */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '25px' }}>
        {tarjetas.map((_, index) => (
          <div 
            key={index} 
            style={{ 
              width: index === indiceActual ? '25px' : '10px', 
              height: '10px', 
              backgroundColor: index === indiceActual ? COLOR_TERRACOTA : '#ddd', 
              borderRadius: '10px',
              transition: 'all 0.3s ease'
            }} 
          />
        ))}
      </div>

    </div>
  );
}