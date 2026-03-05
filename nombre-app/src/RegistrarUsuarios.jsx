import { useEffect, useState } from 'react';
import api from "./Services/api";
import axios from 'axios';
import './registrarUsuarios.css';

function RegistrarUsuarios({ usuarioEditando, limpiarSeleccion, onActualizacionExitosa}) {
    // Solo los estados requeridos según la documentación
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (usuarioEditando) {
            setUsername(usuarioEditando.username);
            setEmail(usuarioEditando.email);
            setPassword(''); // Normalmente la contraseña no se carga por seguridad
        } else {
            resetForm();
        }
    }, [usuarioEditando]);

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //Evita que la pagina se recargue

        // Objeto siguiendo el esquema de la imagen (id es generado por la API)
        const nuevoUsuario = {
            username: username,
            email: email,
            password: password
        };

        try {
            if (usuarioEditando) {
                //Logica de actualizar (PUT)
                const respuesta = await api.put(`/users/${usuarioEditando.id}`, nuevoUsuario);
                console.log('Usuario actualizado:', respuesta.data);
                alert('¡Usuario actualizado con exito!');
                limpiarSeleccion(); //Limpia el estado en el padre
            } else {
                const respuesta = await api.post('/users', nuevoUsuario);
                console.log('Usuario registrado:', respuesta.data);
                alert('¡Usuario guardado con exito!');
            }

            resetForm();
            /*const respuesta = await api.post('/users', nuevoUsuario);
            console.log('Usuario registrado:', respuesta.data);
            alert('¡Usuario creado con éxito! ID: ' + respuesta.data.id);*/
            
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