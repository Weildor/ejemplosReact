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

function Encabezado({ cambiarVista, vistaActual }) {
    const { isLoggedIn } = useAuth();

    return (
        <div className='encabezadoDiv'>
            <Logotipo />
            {/* Solo mostramos el menú de navegación si el usuario ha iniciado sesión */}
            {isLoggedIn && <Menu cambiarVista={cambiarVista} />}
            <Redes />
        </div>
    );
}

function Logotipo() {
    return (
        <div className='logoDiv'>
            <img src={miImagen} alt='Logo' />
        </div>
    );
}

function Menu({ cambiarVista }) {
    const { logout, userRole } = useAuth(); 
    
    const handleLogout = () => {
        logout();
        cambiarVista("Login"); // Al cerrar sesión, lo enviamos directamente al Login
    };

    return (
        <div className='menuDiv'>
            <ul>
                {/* Estas opciones las ven TODOS los usuarios logueados (clientes y admins) */}
                <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
                <li onClick={() => cambiarVista("AcercaDe")}>Acerca de...</li>
                <li onClick={() => cambiarVista("Productos")}>Productos</li>
                <li onClick={() => cambiarVista("Contactos")}>Contactos</li>
                <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
                <li onClick={() => cambiarVista("Carrito")}>Carrito</li>
                
                {/* Estas opciones SOLO las ve el Administrador */}
                {userRole === 'admin' && (
                    <>
                        <li onClick={() => cambiarVista("Usuarios")}>Usuarios</li>
                        <li onClick={() => cambiarVista("Categorias")}>Categorias</li>
                    </>
                )}
                
                <li onClick={handleLogout} style={{ color: '#ff4d4d', fontWeight: 'bold' }}>Cerrar Sesión</li>
            </ul>
        </div>
    );
}

function Redes() {
    return (
        <div className='redesDiv'>
            <ul>
                <li><img src={iconoFacebook} alt='Facebook' /></li>
                <li><img src={iconoWhatsApp} alt='WhatsApp' /></li>
                <li><img src={iconoInstagram} alt='Instagram' /></li>
                <li><img src={iconoTwitter} alt='Twitter' /></li>
                <li><img src={iconoGmail} alt='Gmail' /></li>
            </ul>
            <Clima />
        </div>
    );
}

Menu.propTypes = {
    cambiarVista: PropTypes.func.isRequired
};

Encabezado.propTypes = {
    cambiarVista: PropTypes.func.isRequired,
    vistaActual: PropTypes.string // Añadido para evitar warnings en consola
};

export default Encabezado;