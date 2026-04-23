import iconoTerraria from './assets/imgcard/terraria.png'
import iconoKenshi from './assets/imgcard/kenshi.png'
import iconoRimWorld from './assets/imgcard/rimworld.png'
import './Expresiones.css'
import PropTypes from 'prop-types';
import AcercaDe from './AcercaDe';
import Productos from './Productos';
import Contactos from './Contactos';
import Sucursales from './Sucursales';
import Usuarios from './Usuarios';
import Carrito from './Carrito';
import Categorias from './Categorias';
import Login from './Login';
import { useAuth } from './AuthContext'; 

// ... (Tus importaciones actuales)
// Asegúrate de importar el componente de registro si ya lo tienes
// import RegistrarUsuarios from './RegistrarUsuarios'; 

function Expresiones(props){
    const { isLoggedIn } = useAuth();
    
    // 👇 Estas son las únicas pantallas que se pueden ver sin iniciar sesión
    const vistasPublicas = ["Login", "RegistrarUsuarios"];

    let vistaARenderizar = props.vista;

    // 👇 Si NO está logueado y la vista NO es pública, lo forzamos al Login
    if (!isLoggedIn && !vistasPublicas.includes(vistaARenderizar)) {
        vistaARenderizar = "Login";
    }

    const vistas={
        Inicio: <Inicio />,
        AcercaDe: <AcercaDe />,
        Productos: <Productos />,
        Contactos: <Contactos />,
        Sucursales: <Sucursales />,
        Usuarios: <Usuarios />,
        Carrito: <Carrito />,
        Categorias: <Categorias />,
        Login: <Login chVista={props.chVista}/>,
        // RegistrarUsuarios: <RegistrarUsuarios chVista={props.chVista} /> // Descomenta esto cuando lo tengas
    }

    return(
        <div className='ExpresionesDiv'>
            {vistas[vistaARenderizar] || <Inicio/>}
        </div>
    )
}
// ... (El resto de tus componentes Tarjeta se queda igual)

function Inicio() {
    return(
        <div className='InicioDiv'>
            <TarjetaComponent />
            <TarjetaComponent2 />
            <TarjetaComponent3 />
        </div>
    );
}

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

Expresiones.propTypes = {
    vista: PropTypes.string.isRequired,
    chVista: PropTypes.func.isRequired
};

export default Expresiones;