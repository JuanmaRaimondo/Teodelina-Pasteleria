// Importamos la "memoria" de React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Esto es como tu "public class LoginController"
export default function Login() {
    
    // 1. LOS ESTADOS (Equivale a declarar tus variables privadas)
    // username es el valor, setUsername es el "setter"
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

   // Le agregamos "async" porque vamos a hacer una llamada a internet
    const manejarLogin = async (evento) => {
        evento.preventDefault(); 
        
        try {
            // El Postman de React: Hacemos un POST a tu ruta de login
            const respuesta = await axios.post('http://localhost:8080/usuario/login', {
                username: username,
                password: password
            });

            // Si Spring Boot nos deja pasar, imprimimos lo que nos devuelve
            console.log("¡ÉXITO! Spring Boot respondió:", respuesta.data);

            // Acá guardamos la llave mágica en la caja fuerte del navegador
            // OJO: Ajustá "respuesta.data.token" según cómo te devuelva el JSON tu backend
            localStorage.setItem("tokenTeodelina", respuesta.data.token); 
            
            localStorage.setItem("tokenTeodelina", respuesta.data.token); 
            navigate('/dashboard'); // 

        } catch (error) {
            // Si el Patovica nos rebota (403 o Bad Credentials), caemos acá
            console.error("ERROR DE LOGIN:", error);
            alert("Usuario o contraseña incorrectos ❌");
        }
    };

    // 3. LA VISTA (El HTML que se dibuja en la pantalla)
    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Ingresar a Teodelina</h2>
            
            {/* Cuando el formulario hace 'submit', llama a tu método */}
            <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Cada vez que tipeás, actualiza el estado
                />
                
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button type="submit" style={{ padding: '10px', background: '#e67e22', color: 'white', border: 'none' }}>
                    Iniciar Sesion
                </button>
            </form>
        </div>
    );
}