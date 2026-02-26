import api from "./Services/api";
import { useState } from 'react';
import './registrarUsuarios.css';

function RegistrarUsuarios() {
    // Solo los estados requeridos según la documentación
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Objeto siguiendo el esquema de la imagen (id es generado por la API)
        const nuevoUsuario = {
            username: username,
            email: email,
            password: password
        };

        try {
            const respuesta = await api.post('/users', nuevoUsuario);
            console.log('Usuario registrado:', respuesta.data);
            alert('¡Usuario creado con éxito! ID: ' + respuesta.data.id);
            
            // Limpiar campos
            setUsername(''); setEmail(''); setPassword('');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al crear el usuario.');
        }
    };

    return (
        <div className="contenedor-registro">
            <h2>Crear Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} className="form-registro">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-registrar">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrarUsuarios;