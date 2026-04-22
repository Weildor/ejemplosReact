import { useEffect, useState } from 'react';
import api from "./Services/api";
import './registrarUsuarios.css';

function RegistrarUsuarios({ usuarioEditando, limpiarSeleccion, onActualizacionExitosa}) {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');
    // 👇 1. Agregamos el estado para la fecha de registro 👇
    const [fechaRegistro, setFechaRegistro] = useState('');

    useEffect(() => {
        if (usuarioEditando) {
            setNombre(usuarioEditando.nombre || '');
            setDireccion(usuarioEditando.direccion || '');
            setTelefono(usuarioEditando.telefono || '');
            setEmail(usuarioEditando.email || '');
            setRol(usuarioEditando.rol || 'cliente');
            setPassword(''); 
            
            // 👇 Extraemos solo la parte "YYYY-MM-DD" para que el input type="date" lo entienda
            const fechaBD = usuarioEditando.fecha_registro || '';
            const fechaFormateada = fechaBD.length >= 10 ? fechaBD.substring(0, 10) : '';
            setFechaRegistro(fechaFormateada);
            
        } else {
            resetForm();
        }
    }, [usuarioEditando]);

    const resetForm = () => {
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setPassword('');
        setRol('cliente');
        setFechaRegistro(''); // 👈 Limpiamos el campo al resetear
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // 👇 2. Agregamos la fecha al objeto que se va a enviar a Node/Express 👇
        const nuevoUsuario = {
            nombre,
            direccion,
            telefono,
            email,
            password,
            rol,
            fecha_registro: fechaRegistro 
        };

        try {
            if (usuarioEditando) {
                const respuesta = await api.put(`/api/usuario/${usuarioEditando.id}`, nuevoUsuario);
                console.log('Usuario actualizado:', respuesta.data);
                alert('¡Usuario actualizado con éxito!');
                limpiarSeleccion(); 
            } else {
                const respuesta = await api.post('/api/usuarios', nuevoUsuario);
                console.log('Usuario registrado:', respuesta.data);
                alert('¡Usuario guardado con éxito!');
            }

            resetForm();
            onActualizacionExitosa(); 
            
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            alert('Error al procesar la solicitud.');
        }
    };

    return (
        <div className="contenedor-registro">
            <h2>{usuarioEditando ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
            
            <form onSubmit={handleSubmit} className="form-registro">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder={usuarioEditando ? "Nueva contraseña (opcional)" : "Contraseña"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!usuarioEditando} 
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="" disabled>Selecciona un rol</option>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>
                {/* 👇 3. Agregamos el input para la fecha de registro 👇 */}
                <input
                    type="date"
                    title="Fecha de Registro"
                    value={fechaRegistro}
                    onChange={(e) => setFechaRegistro(e.target.value)}
                    required
                />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn-registrar">
                        {usuarioEditando ? 'Actualizar' : 'Registrar'}
                    </button>
                    {usuarioEditando && (
                        <button type="button" className="btn-eliminar" onClick={limpiarSeleccion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegistrarUsuarios;