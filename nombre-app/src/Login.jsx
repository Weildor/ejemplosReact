import { useAuth } from './AuthContext';
import { useState } from 'react';
import api from "./Services/api"; 

const Login = ({chVista}) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const respuesta = await api.post('/api/login', { email, password });
        
        // Verificamos que la respuesta contenga el token y el ID
        if (respuesta.data.token && respuesta.data.id) {
            // Creamos el objeto de usuario con el ID real del backend
            const datosUsuario = {
                id: respuesta.data.id,
                rol: respuesta.data.rol,
                email: email
            };

            // Enviamos los datos al AuthContext
            login(respuesta.data.token, respuesta.data.rol, datosUsuario); 
            alert('¡Bienvenido!');
            chVista("Inicio"); 
        }
    } catch (error) {
        console.error("Error en login:", error);
        alert('Credenciales incorrectas');
    }
};

    return (
        <div className="contenedor-login">
            <form onSubmit={handleSubmit} className="tarjeta-login">
                <h2>Iniciar Sesión</h2>
                <input type="text" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Entrar</button>
                <p onClick={() => chVista("RegistrarUsuarios")}>¿No tienes cuenta? Regístrate</p>
            </form>
        </div>
    );
};

export default Login;
/*import { useAuth } from './AuthContext';
import { useState } from 'react';
import './login.css';
import api from "./Services/api"; 

const Login = () => {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credenciales = { username, password };
        
        try {
            const respuesta = await api.post('/auth/login', credenciales);
            
            if (respuesta.data.token) {
                
                login(respuesta.data.token); 
                alert('Autentificacion autorizado');
                //chVista("Usuario");
            } else {
                alert('Credenciales invalidas');
            }
        } catch (error) {
            alert('Error al iniciar sesión. Revisa la consola.');
            console.error("Error:", error);
        }
    };

    return (
        <div className="contenedor-login">
            <div className="tarjeta-login">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Usuario / Correo</label>
                        <input 
                            type="text" 
                            placeholder="Tu ejemplo@correo.com"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="opciones-adicionales">
                        <a href="#" className="link-registro">Recordar contraseña</a>
                        <a href="#" className="link-registro">Registrarme</a>
                    </div>

                    <div className="grupo-botones">
                        <button type="submit" className="btn-principal">Iniciar Sesión</button>
                        <button type="button" className="btn-secundario" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
/*

/*
import { useState } from 'react';
import './Login.css';
import api from "./Services"

const Login() => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const credenciales = {username,password};
        try {
            const respuesta = await api.post('/auth/login', credenciales);
            //console.log
            if ( respuesta.data.token) {
                login( respuesta.data.token ); //Guardamos el token en el contexto
                //Redirigir al usuario aqui
                alert('Autentificacion autorizada');
                //chVistas("Usuarios");
            } else {
                alert('Credenciales invalidas');
            }
        } catch (error){
            alert('Error', error);
            console.error("Error:", error);
        }
    };

    return (
        <div className="contenedor-login">
            <div className="tarjeta-login">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Correo electronico</label>
                        <input 
                            type="text" 
                            placeholder="Tu ejemplo@correo.com"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
            
                        />
                    </div>

                    <div className="opciones-adicionales">
                        <a href="#" className="link-registro">Recordar contraseña</a>
                        <a href="#" className="link-registro">Registrarme</a>
                    </div>

                    <div className="grupo-botones">
                        <button type="submit" className="btn-principal">Iniciar Sesión</button>
                        <button type="button" className="btn-secundario" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
*/