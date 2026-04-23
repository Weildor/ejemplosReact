import { useAuth } from './AuthContext';
import { useState } from 'react';
import './login.css';
import api from "./Services/api"; 

const Login = ({chVista}) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCancelar = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const credenciales = { email: email, password: password };
        
        try {
            const respuesta = await api.post('/api/login', credenciales);
            
            if (respuesta.data.token) {
                // 👇 Asumimos que tu API devuelve el rol (ej: respuesta.data.rol)
                const rolDelUsuario = respuesta.data.rol || 'cliente'; 
                
                login(respuesta.data.token, rolDelUsuario); 
                alert('Autentificación exitosa');
                chVista("Inicio"); // 👇 Si se loguea bien, lo mandamos a Inicio
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Usuario no encontrado en la base de datos");
            } else if (error.response && error.response.status === 401) {
                alert("Contraseña incorrecta");
            } else {
                alert('Error al conectar con el servidor');
            }
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
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="grupo-botones">
                        <button type="submit" className="btn-principal">Iniciar Sesión</button>
                        <button type="button" className="btn-secundario" onClick={handleCancelar}>Cancelar</button>
                    </div>
                </form>
                {/* 👇 Agregamos el enlace para ir a registrarse 👇 */}
                <div style={{marginTop: '15px', textAlign: 'center'}}>
                    <p style={{color: 'white'}}>¿No tienes cuenta? <span onClick={() => chVista("RegistrarUsuarios")} style={{color: '#4da6ff', cursor: 'pointer', textDecoration: 'underline'}}>Regístrate aquí</span></p>
                </div>
            </div>
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