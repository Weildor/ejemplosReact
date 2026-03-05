import { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Intentando iniciar sesión con: ${username}`);
        // Aquí iría tu lógica de api.post('/auth/login') si decides activarla después
        setUsername('');
        setPassword('');
    };

    const handleCancelar = () => {
        setUsername('');
        setPassword('');
        alert("Formulario limpiado");
    };

    return (
        <div className="contenedor-login">
            <div className="tarjeta-login">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="campo">
                        <label>Usuario</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Tu usuario..."
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="********"
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