import './App.css'
import { useState } from "react";
import Expresiones from "./Expresiones"
import Encabezado from "./Encabezado"
import Texto from "./Texto"
import Footer from "./Footer"
import { AuthProvider } from './AuthContext';

function App(){
  // 👇 Si no hay token, la vista inicial es Login, si lo hay, es Inicio
  const [vista, setVista] = useState(localStorage.getItem('token') ? "Inicio" : "Login");
  
  return (
    <div>
      <AuthProvider>
        <Encabezado cambiarVista={setVista} vistaActual={vista} />
        <Expresiones vista={vista} chVista={setVista}/>
      </AuthProvider>
      <Texto name='Dorian'/>
      <Footer/>
    </div>
  )
}

export default App