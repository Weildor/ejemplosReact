import Mapa from "./Mapa";
import './texto.css'
function Texto(props) {
    const position = { lat: 19.4326, lng: -99.1332 };
    let user = props
    console.info(user)
    if(user.name!=""){
    return (
        <div>
            <Mapa lat={20.27663846986147}
             lng={-97.96362794025488} nombre="Sucursal Ciudad de México" 
            />
        </div>
    )
    }
return (
    <div className="textoDiv"><h3>No hay datos</h3></div>
    )
}
export default Texto