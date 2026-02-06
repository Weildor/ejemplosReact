import iconoTerraria from './assets/imgcard/terraria.png'
import iconoKenshi from './assets/imgcard/kenshi.png'
import iconoRimWorld from './assets/imgcard/rimworld.png'
import './Expresiones.css'
import PropTypes from 'prop-types';
import AcercaDe from './AcercaDe';
import Productos from './Productos';
import Contactos from './Contactos';
/*function Expresiones(){
    const nombre = 'Porkemon';
    const apellidos = 'Legostrada Castillo';
    return(
        <div>
            
            <Cuerpo/>
            
            
        </div>
    )
}
*/
function Expresiones({vista}){
    const vistas={
        Inicio: <Inicio />,
        AcercaDe: <AcercaDe />,
        Productos: <Productos />,
        Sucursales: <Sucursales />,
        Contactos: <Contactos />
    }
    return(
        <div className='ExpresionesDiv'>
            {vistas[vista] || <Inicio/>}
            </div>
    )
}
/*
function ContenedorTarjetas({vista}){
    const vistas={
        Inicio: <Inicio/>,
        AcercaDe: <AcercaDe/>,
        Productos: <Productos/>,
        Sucursales: <Sucursales/>,
        Contacto: <Contacto/>

    }
}
    */
function Inicio() {
    return(
        <div className='InicioDiv'>
        <>
            <TarjetaComponent />
            <TarjetaComponent2 />
            <TarjetaComponent3 />
        </>
        </div>
    );
}
/*
function AcercaDe(){
    return <h2>Acerca de nosotros</h2>;   
}
function Productos(){
    return <h2>Productos</h2>;
}
    */
function Sucursales(){
    return <h2>Sucursales</h2>;
}
/*
function Contactos(){
    return <h2>Contactos</h2>;
}
    */
/*
function ContenedorCards(){
    return(
        <div className='ContenedorCardsDiv'>
            <Tarjeta name='Eutiquio' descripcion='El pro es pro porque le sabe del pro'/>

        </div>
    )
}
*/
function TarjetaComponent(){
    return(
        <div className='card1Div'>
            <img src={iconoTerraria} alt="Terraria" />
            <h2>Terraria</h2>
            <p>2D</p>
            <a href="#">Ver mas</a>
        </div>
    )
}
function TarjetaComponent2(){
    return(
        <div className='card2Div'>
            <img src={iconoKenshi} alt="Kenshi" />
            <h2>Kenshi</h2>
            <p>3D</p>
            <a href="#">Ver mas</a>
        </div>
    )
}
function TarjetaComponent3(){
    return(
        <div className='card3Div'>
            <img src={iconoRimWorld} alt="Rimworld" />
            <h2>Rimworld</h2>
            <p>4D</p>
            <a href="#">Ver mas</a>
        </div>
    )
}

/*
function Tarjeta(props){
    return(
        <div className='CardDiv'>
            <img src={iconoTerraria} alt="Terraria" />
            <h2>{props.name}</h2>
            <p>{props.descripcion}</p>
            <a href="#">Leer mas</a>
        </div>
    )
}
*/
/*
function Cuerpo(){
    return(
        <div className='cuerpoDiv'>
            <Tarjeta/>
            <Card2/>
            <Card3/>
        </div>
    )
}
function Card1(){
    return(
        <div className="card1Div">
            <lu><img src={iconoTerraria} alt='Terraria'/></lu>
                
                <h2>Terraria</h2>
        </div>
    )
}


function Card2(){
    return(
        <div className="card2Div">
            <lu><img src={iconoKenshi} alt='Kenshi'/></lu>
            
                <h2>Kenshi</h2>
        </div>
    )
}
function Card3(){
    return(
        <div className="card3Div">
            <lu><img src={iconoRimWorld} alt='Rimworld'/></lu>
                
                <h2>RimWorld</h2>
        </div>
    )
}
/*
function Saludar(){
    return(
        <div>Hola Ternicolas</div>
    )
}
*/
Expresiones.propTypes = {
    vista: PropTypes.string.isRequired
};



export default Expresiones