import miImagen from './assets/logo2.png';
import iconoFacebook from './assets/redes/facebook.png';
import iconoInstagram from './assets/redes/instagram.png';
import iconoWhatsApp from './assets/redes/whatsApp.png';
import iconoTwitter from './assets/redes/twitter.png';
import iconoGmail from './assets/redes/gmail.png';
import './Encabezado.css';
import PropTypes from 'prop-types';
import Clima from './Clima';
import { useAuth } from './AuthContext';
function Encabezado({cambiarVista}){
    return(
        <div className='encabezadoDiv'>
            <Logotipo />
            <Menu cambiarVista={cambiarVista}/>
            <Redes/>
            
        </div>
    )

}
function Logotipo(){
    return(
        <div className='logoDiv'>
            <img src={miImagen} alt='assets/logo2.png'/>
        </div>
    )
}
function Menu({cambiarVista}){
    const { isLoggedIn, logout } = useAuth();
    const handleLogout = () => {
        logout();
        cambiarVista("Inicio")
    }
    return(
        <div className='menuDiv'>
            <ul>
                <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
                <li onClick={() => cambiarVista("AcercaDe")}>Acerca de...</li>
                <li onClick={() => cambiarVista("Productos")}>Productos</li>
                <li onClick={() => cambiarVista("Contactos")}>Contactos</li>
                <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
                
                {isLoggedIn ? (
                <>
                    <li onClick={() => cambiarVista("Usuarios")}>Usuarios</li>
                    <li onClick={() => cambiarVista("Carrito")}>Carrito</li>
                    <li onClick={() => cambiarVista("Categorias")}>Categorias</li>
                    <li onClick={handleLogout}> Cerrar Sesion</li>
                </>
                
                    ) : (
                <li onClick={() => cambiarVista("Login")}>Login</li>
                )}
            </ul>
        </div>
    )
}
function Redes(){
    return(
        <div className='redesDiv'>
            <ul>
                <li><img src={iconoFacebook} alt='Facebook'/></li>
                <li><img src={iconoWhatsApp} alt='WhatsApp'/></li>
                <li><img src={iconoInstagram} alt='Instagram'/></li>
                <li><img src={iconoTwitter} alt='Twitter'/></li>
                <li><img src={iconoGmail} alt='Gmail'/></li>
            </ul>
            <Clima/>
        </div>
    )
}
Menu.propTypes = {
    cambiarVista: PropTypes.func.isRequired
};
Encabezado.propTypes = {
    cambiarVista: PropTypes.func.isRequired
};


export default  Encabezado