import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    // Función para destruir la llave y volver al login
    const cerrarSesion = () => {
        localStorage.removeItem('tokenTeodelina');
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>🏠 Panel Principal - Teodelina ERP 🥐</h1>
            <p>¡Bienvenido administrador! ¿Qué módulo querés gestionar hoy?</p>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button style={{ padding: '15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>📦 Productos</button>
                <button style={{ padding: '15px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px' }}>👥 Clientes</button>
                <button style={{ padding: '15px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px' }}>📸 Instagram IA</button>
            </div>

            <button 
                onClick={cerrarSesion} 
                style={{ marginTop: '50px', padding: '10px', background: '#95a5a6', color: 'white', border: 'none' }}
            >
                🚪 Cerrar Sesión
            </button>
        </div>
    );
}