import miImagen from './assets/logo.png';
import iconoFacebook from './assets/redes/facebook.png';
import iconoInstagram from './assets/redes/instagram.png';
import iconoWhatsApp from './assets/redes/whatsApp.png';
import iconoTwitter from './assets/redes/twitter.png';
import iconoGmail from './assets/redes/gmail.png';
import './Encabezado.css';
function Encabezado(){
    return(
        <div className='encabezadoDiv'>
            <Logotipo />
            <Menu/>
            <Redes/>
        </div>
    )

}
function Logotipo(){
    return(
        <div className='logoDiv'>
            <img src={miImagen} alt='assets/logo.png'/>
        </div>
    )
}
function Menu(){
    return(
        <div className='menuDiv'>
            <ul>
                <li>Inicio</li>
                <li>Acerca de...</li>
                <li>Productos</li>
                <li>Contactos</li>
                <li>Sucursales</li>
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
        </div>
    )
}


export default  Encabezado