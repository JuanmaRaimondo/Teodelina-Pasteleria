import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const COLOR_TERRACOTA = '#D95447';
const COLOR_CARBON = '#3A3A3A';
const COLOR_FONDO = '#D9CCBB';
const FUENTE_SCRIPT = "'Dancing Script', cursive";
const FUENTE_SANS = "'Montserrat', sans-serif";

export default function Login() {
  const [credenciales, setCredenciales] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

 const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      // 1. Apuntamos a la puerta correcta: /usuario/login
      const respuesta = await axios.post('http://localhost:8080/usuario/login', credenciales);
      
      // 2. Agarramos el token con el nombre exacto que manda Java
      localStorage.setItem('tokenTeodelina', respuesta.data.token);
      
      // ¡Adentro!
      navigate('/dashboard'); 
    } catch (error) {
      alert("Credenciales incorrectas. Intentá de nuevo. 🍰");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR_FONDO, fontFamily: FUENTE_SANS, padding: '20px' }}>
      
      {/* TARJETA DE LOGIN ESTILO PREMIUM */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', width: '100%', maxWidth: '350px', textAlign: 'center' }}>
        
        {/* LOGO SIMULADO */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontFamily: FUENTE_SCRIPT, fontSize: '55px', color: COLOR_TERRACOTA, margin: '0', lineHeight: '1' }}>Teodelina</h1>
          <p style={{ fontFamily: FUENTE_SANS, color: COLOR_CARBON, fontSize: '18px', margin: '0', letterSpacing: '2px', textTransform: 'lowercase' }}>pasteleria</p>
        </div>

        <form onSubmit={iniciarSesion} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" name="username" placeholder="Usuario" 
            value={credenciales.username} onChange={manejarCambio} required 
            style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '1px solid #EAEAEA', backgroundColor: '#FAFAFA', fontFamily: FUENTE_SANS, boxSizing: 'border-box', outline: 'none', color: COLOR_CARBON }}
          />
          <input 
            type="password" name="password" placeholder="Contraseña" 
            value={credenciales.password} onChange={manejarCambio} required 
            style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '1px solid #EAEAEA', backgroundColor: '#FAFAFA', fontFamily: FUENTE_SANS, boxSizing: 'border-box', outline: 'none', color: COLOR_CARBON }}
          />
          
          <button type="submit" style={{ width: '100%', backgroundColor: COLOR_TERRACOTA, color: 'white', padding: '16px', border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '15px', fontFamily: FUENTE_SANS, cursor: 'pointer', boxShadow: `0 6px 15px ${COLOR_TERRACOTA}50`, marginTop: '10px', transition: 'transform 0.2s' }}>
            Ingresar a la Cocina
          </button>
        </form>
      </div>

      <p style={{ marginTop: '30px', color: COLOR_CARBON, fontSize: '12px', opacity: 0.6 }}>Sistema de Gestión Exclusivo</p>
    </div>
  );
}