import './App.css'
import { useState } from "react";
import Expresiones from "./Expresiones"
import Encabezado from "./Encabezado"
import Texto from "./Texto"
import Footer from "./Footer"
import { AuthProvider } from './AuthContext';

function App(){
  // Mantenemos la lógica: si hay token va a Inicio, si no a Login
  const [vista, setVista] = useState(localStorage.getItem('token') ? "Inicio" : "Login");
  
  return (
    <div>
      <AuthProvider>
        {/* Pasamos setVista para que el login pueda cambiar la vista al entrar */}
        <Encabezado cambiarVista={setVista} vistaActual={vista} />
        <Expresiones vista={vista} chVista={setVista}/>
      </AuthProvider>
      <Texto name='Dorian'/>
      <Footer/>
    </div>
  )
}

export default App;