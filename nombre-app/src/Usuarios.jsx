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
             const response = await api.get("/users");
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
                            <th>Apellidos</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className="capitalizar">{user.name.firstname}</td>
                                <td className="capitalizar">{user.name.lastname}</td>
                                <td>{`${user.address.street} ${user.address.number}, ${user.address.city}`}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
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
const removeUsuario = async (usuarioId) => {
    try {
        const response = await api.delete(
        `/users/${usuarioId}`
        );
        console.log(response.data);
        alert('¡Usuario eliminado con exito!');
 
    } catch (error) {
        console.error(error);
    }
};


export default Usuarios;