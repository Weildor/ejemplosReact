import './App.css'
import { useState } from "react";
import Expresiones from "./Expresiones"
import Encabezado from "./Encabezado"
import Texto from "./Texto"
import Footer from "./Footer"

function App(){
  const [vista, setVista] = useState("Inicio");
  return (
    <div>
      <Encabezado cambiarVista={setVista}/>
      <Expresiones vista={vista}/>
      <Texto name='Dorian'/>
      <Footer/>
    </div>
  )
}

export default App