import { useEffect, useState } from 'react';
import api from "./Services/api";
import './registrarUsuarios.css';

// Agregamos la prop 'esAutoRegistro' para saber si viene desde el Login
function RegistrarUsuarios({ usuarioEditando, limpiarSeleccion, onActualizacionExitosa, esAutoRegistro, chVista }) {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');
    const [fechaRegistro, setFechaRegistro] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy por defecto

    useEffect(() => {
        if (usuarioEditando) {
            setNombre(usuarioEditando.nombre || '');
            setDireccion(usuarioEditando.direccion || '');
            setTelefono(usuarioEditando.telefono || '');
            setEmail(usuarioEditando.email || '');
            setRol(usuarioEditando.rol || 'cliente');
            setPassword(''); 
            
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
        setFechaRegistro(new Date().toISOString().split('T')[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const nuevoUsuario = {
            nombre,
            direccion,
            telefono,
            email,
            password,
            rol: esAutoRegistro ? 'cliente' : rol, // Si se registra solo, siempre es cliente
            fecha_registro: fechaRegistro 
        };

        try {
            if (usuarioEditando) {
                await api.put(`/api/usuario/${usuarioEditando.id}`, nuevoUsuario);
                alert('¡Usuario actualizado con éxito!');
                limpiarSeleccion(); 
            } else {
                await api.post('/api/usuarios', nuevoUsuario);
                alert('¡Registro exitoso! Ya puedes iniciar sesión.');
                // Si es auto-registro, lo mandamos de vuelta al Login
                if (esAutoRegistro) {
                    chVista("Login");
                }
            }

            resetForm();
            if (onActualizacionExitosa) onActualizacionExitosa(); 
            
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            alert('Error: El correo ya podría estar registrado o hubo un fallo en el servidor.');
        }
    };

    return (
        <div className="contenedor-registro">
            <h2>{esAutoRegistro ? 'Crea tu Cuenta' : (usuarioEditando ? 'Editar Usuario' : 'Crear Nuevo Usuario')}</h2>
            
            <form onSubmit={handleSubmit} className="form-registro">
                <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input
                    type="password"
                    placeholder={usuarioEditando ? "Nueva contraseña (opcional)" : "Contraseña"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!usuarioEditando} 
                />

                {/* Si es auto-registro, ocultamos el Rol y la Fecha */}
                {!esAutoRegistro && (
                    <>
                        <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <input
                            type="date"
                            value={fechaRegistro}
                            onChange={(e) => setFechaRegistro(e.target.value)}
                            required
                        />
                    </>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn-registrar">
                        {esAutoRegistro ? 'Registrarme' : (usuarioEditando ? 'Actualizar' : 'Registrar')}
                    </button>
                    
                    {esAutoRegistro ? (
                        <p onClick={() => chVista("Login")} style={{textAlign:'center', cursor:'pointer', fontSize:'0.9rem', color:'#888'}}>
                            ¿Ya tienes cuenta? Inicia sesión
                        </p>
                    ) : usuarioEditando && (
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