import './App.css'
import { useState } from "react";
import Expresiones from "./Expresiones"
import Encabezado from "./Encabezado"
import Texto from "./Texto"
import Footer from "./Footer"
import { AuthProvider } from './AuthContext';

function App(){
  const [vista, setVista] = useState("Inicio");
  return (
    <div>
      <AuthProvider>
        <Encabezado cambiarVista={setVista}/>
        <Expresiones vista={vista} chVista={setVista}/>
      </AuthProvider>
      <Texto name='Dorian'/>
      <Footer/>
    </div>
  )
}

export default App