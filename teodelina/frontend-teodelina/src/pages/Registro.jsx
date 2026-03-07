import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const respuesta = await fetch('http://localhost:8080/usuario/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          rol: 'ADMIN' // Por defecto creamos administradores
        })
      });

      if (respuesta.ok) {
        setMensaje({ texto: '¡Usuario creado con éxito! Redirigiendo...', tipo: 'exito' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMensaje({ texto: 'Error al crear el usuario. Tal vez ya existe.', tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ texto: 'Error de conexión con el servidor.', tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <h1 className="titulo-teodelina" style={{ color: COLOR_CARBON, margin: '0 0 5px 0', fontSize: '32px' }}>Teodelina</h1>
        <p style={{ color: '#888', marginBottom: '30px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Nuevo Administrador</p>

        <form onSubmit={manejarRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
          />
          
          <button 
            type="submit" 
            disabled={cargando}
            style={{ 
              backgroundColor: COLOR_TERRACOTA, color: 'white', border: 'none', padding: '12px', borderRadius: '8px', 
              fontSize: '15px', fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer', marginTop: '10px',
              opacity: cargando ? 0.7 : 1
            }}
          >
            {cargando ? 'Creando...' : 'Crear Usuario'}
          </button>
        </form>

        {mensaje.texto && (
          <div style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', fontSize: '13px', backgroundColor: mensaje.tipo === 'exito' ? '#e8f5e9' : '#ffebee', color: mensaje.tipo === 'exito' ? '#2e7d32' : '#c62828' }}>
            {mensaje.texto}
          </div>
        )}

        <div style={{ marginTop: '25px', fontSize: '13px' }}>
          <Link to="/login" style={{ color: COLOR_CARBON, textDecoration: 'none', fontWeight: 'bold' }}>
            ← Volver al Login
          </Link>
        </div>

      </div>
    </div>
  );
}