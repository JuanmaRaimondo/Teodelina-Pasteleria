import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MobileLayout from './components/MobileLayout';
import Instagram from './pages/Instagram';
import Ventas from './pages/Ventas';
import Produccion from './pages/Produccion';
import './App.css';
import Clientes from './pages/Cliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. LA PUERTA DE ENTRADA (Sin barra de navegación) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 2. EL CENTRO DE COMANDO (Con la barra inferior) */}
        <Route
          path="/dashboard"
          element={
            <MobileLayout>
              <Dashboard />
            </MobileLayout>
          }
        />
        <Route 
          path="/ventas" 
          element={
            <MobileLayout>
              <Ventas />
            </MobileLayout>
          } 
        />
        <Route 
          path="/produccion" 
          element={
            <MobileLayout>
              <Produccion />
            </MobileLayout>
          } 
        />
        <Route 
          path="/instagram" 
          element={
              <MobileLayout>
                <Instagram />
              </MobileLayout>
          } 
        />
        <Route 
          path="/clientes" 
          element={
              <MobileLayout>
                <Clientes />
              </MobileLayout>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;