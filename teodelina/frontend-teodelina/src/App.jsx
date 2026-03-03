import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // BrowserRouter envuelve toda la app para habilitar la navegación
    <BrowserRouter>
      <Routes>
        {/* Definimos qué componente se dibuja en cada ruta de la URL */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;