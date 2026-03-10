import { useAuth } from './AuthContext';
import { useState } from 'react';
import './login.css';
import api from "./Services/api"; 

const Login = ({chVista}) => {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // --- FUNCIÓN QUE TE FALTABA ---
    const handleCancelar = () => {
        setUsername('');
        setPassword('');
        alert("Campos limpiados");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credenciales = { username, password };
        //console.log("Datos de registro: ", { username, password});
        try {
            //const credenciales = { username, password };
            const respuesta = await api.post('/auth/login/', credenciales);
            
            if (respuesta.data.token) {
                login(respuesta.data.token); 
                alert('Autentificación autorizada');
                chVista("Usuarios");
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
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