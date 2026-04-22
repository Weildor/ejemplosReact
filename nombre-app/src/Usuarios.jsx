import api from "./Services/api";
import { useEffect, useState } from 'react';
import './usuarios.css';
import RegistrarUsuarios from "./RegistrarUsuarios";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const obtenerUsuarios = async () => {
        try {
            // 👇 1. Cambiamos la ruta a la de tu backend real
            const response = await api.get("/api/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    // 👇 2. Movimos removeUsuario ADENTRO para poder refrescar la tabla
    const removeUsuario = async (usuarioId) => {
        try {
            // 👇 3. Ajustamos la ruta de eliminar según tu backend
            const response = await api.delete(`/api/usuario/${usuarioId}`);
            console.log(response.data);
            alert('¡Usuario eliminado con éxito!');
            obtenerUsuarios(); // 👈 Actualiza la tabla automáticamente al borrar
        } catch (error) {
            console.error(error);
            alert('Error al eliminar usuario');
        }
    };

    if (loading) return <p className="cargando">Cargando usuarios...</p>;

    return (
        <div className="contenedor-usuarios">
            <RegistrarUsuarios
                usuarioEditando={usuarioSeleccionado}
                limpiarSeleccion={() => setUsuarioSeleccionado(null)}
                onActualizacionExitosa={obtenerUsuarios}
            />
            
            <header className="usuarios-header">
                <h1>Gestión de Usuarios</h1>
            </header>

            <div className="tabla-responsiva">
                <table className="tabla-usuarios">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Rol</th> 
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                
                                <td className="capitalizar">{user.nombre}</td>
                                <td>{user.direccion}</td>
                                <td>{user.telefono}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td className="acciones">
                                    <button className="btn-editar" onClick={() => setUsuarioSeleccionado(user)}>Editar</button>
                                    <button className="btn-eliminar" onClick={() => removeUsuario(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;