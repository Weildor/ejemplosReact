import './App.css'
import Encabezado from "./Encabezado"
import Expresiones from "./Expresiones"
import Texto from "./Texto"
import Footer from "./Footer"

function App(){
  return (
    <div>
      <Encabezado/>
      <Expresiones/>
      <Texto name='Dorian'/>
      <Footer/>
    </div>
  )
}
export default App