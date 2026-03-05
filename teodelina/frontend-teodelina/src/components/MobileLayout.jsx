import { useNavigate, useLocation } from 'react-router-dom';

// Usamos el color de acento principal del logo para la sección activa
const COLOR_ACENTO = '#D95447'; // Rojo Terracota del script
const COLOR_PRINCIPAL = '#3A3A3A'; // Gris Carbón del sans-serif/gorro
const COLOR_FONDO = '#D9CCBB'; // Beige Crema del círculo

export default function MobileLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (ruta) => location.pathname === ruta;

  const estiloBoton = (ruta) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    cursor: 'pointer',
    color: isActive(ruta) ? COLOR_ACENTO : '#888', // Terracota si activo, gris suave inactivo
    transition: 'color 0.2s ease-in-out',
    // Usamos la tipografía sans-serif limpia del logo para el texto del botón
    fontFamily: 'Montserrat, sans-serif' // Ajustá si usás otra específica
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: COLOR_FONDO }}>
      
      {/* EL CONTENIDO DE LA PANTALLA */}
      <div style={{ paddingBottom: '80px' }}>
        {children}
      </div>

      {/* 📱 LA BARRA DE NAVEGACIÓN INFERIOR TOTALMENTE REDISEÑADA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '65px',
        backgroundColor: '#ffffff', // Fondo blanco limpio para la barra
        boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', // Sombra sutil hacia arriba
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        borderTop: '1px solid #eaeaea',
        paddingBottom: 'env(safe-area-inset-bottom)' 
      }}>
        
        <div style={estiloBoton('/dashboard')} onClick={() => navigate('/dashboard')}>
          {/* Reemplazamos emoji por un icono de línea gris */}
          <span style={{ fontSize: '22px', display: 'flex' }}>🏠</span>
          <span style={{ fontSize: '11px', fontWeight: isActive('/dashboard') ? 'bold' : 'normal', marginTop: '3px' }}>Inicio</span>
        </div>

        <div style={estiloBoton('/ventas')} onClick={() => navigate('/ventas')}>
          {/* Reemplazamos emoji por un icono de línea gris */}
          <span style={{ fontSize: '22px', display: 'flex' }}>🛍️</span>
          <span style={{ fontSize: '11px', fontWeight: isActive('/ventas') ? 'bold' : 'normal', marginTop: '3px' }}>Ventas</span>
        </div>

        {/* --- NUEVO BOTÓN DE IA / INSTAGRAM REDISEÑADO --- */}
        <div style={estiloBoton('/instagram')} onClick={() => navigate('/instagram')}>
          {/* Reemplazamos emoji por icono de línea gris con destellos */}
          <span style={{ fontSize: '22px', display: 'flex' }}>📸✨</span>
          <span style={{ fontSize: '11px', fontWeight: isActive('/instagram') ? 'bold' : 'normal', marginTop: '3px' }}>IA Post</span>
        </div>

        <div style={estiloBoton('/produccion')} onClick={() => navigate('/produccion')}>
          {/* --- ¡GOLAZO! Reemplazamos emoji por icono de línea gris (Gorrito de chef del logo style) --- */}
          <span style={{ fontSize: '22px', display: 'flex' }}>👨‍🍳</span>
          <span style={{ fontSize: '11px', fontWeight: isActive('/produccion') ? 'bold' : 'normal', marginTop: '3px' }}>Cocina</span>
        </div>

        <div style={estiloBoton('/clientes')} onClick={() => navigate('/clientes')}>
          {/* Reemplazamos emoji por icono de línea gris */}
          <span style={{ fontSize: '22px', display: 'flex' }}>👥</span>
          <span style={{ fontSize: '11px', fontWeight: isActive('/clientes') ? 'bold' : 'normal', marginTop: '3px' }}>Clientes</span>
        </div>

      </div>
    </div>
  );
}