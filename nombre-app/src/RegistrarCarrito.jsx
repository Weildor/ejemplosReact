import { useState, useEffect } from "react";
import api from "./Services/api";
import { useAuth } from './AuthContext'; // Importamos el contexto de autenticación

function RegistrarCarrito({ carritoEditando, limpiarSeleccion, onActualizacionExitosa }) {
    const { userRole } = useAuth(); // Obtenemos el rol del usuario actual
    const [idUsuario, setIdUsuario] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");

    // Efecto para cargar datos cuando se presiona "Editar" en la tabla
    useEffect(() => {
        if (carritoEditando) {
            setIdUsuario(carritoEditando.id_usuario || "");
            const detalle = carritoEditando.detalles?.[0];
            if (detalle) {
                setIdProducto(detalle.id_producto || "");
                setNombreProducto(detalle.producto?.nombre || "");
            }
        }
    }, [carritoEditando]);

    // Lógica para enviar o actualizar la orden
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = { 
            id_usuario: idUsuario, 
            id_producto: idProducto, 
            nombre_producto: nombreProducto, // Enviamos el nombre manual
            cantidad: 1 
        };

        try {
            if (carritoEditando) {
                await api.put(`/api/carrito/${carritoEditando.id}`, payload);
                alert("¡Orden actualizada con éxito!");
            } else {
                await api.post("/api/carritos", payload);
                alert("¡Nueva orden registrada!");
            }
            limpiarFormulario();
            onActualizacionExitosa(); // Refresca la lista de carritos en el componente padre
        } catch (error) {
            console.error("Error en la operación:", error);
            alert("Hubo un error al procesar la solicitud.");
        }
    };

    const limpiarFormulario = () => {
        setIdUsuario("");
        setIdProducto("");
        setNombreProducto("");
        limpiarSeleccion();
    };

    // --- REGLA DE VISIBILIDAD ---
    // Si el usuario no es admin, el componente no devuelve nada (se oculta)
    if (userRole !== 'admin') return null;

    // Validación para el botón
    const formularioInvalido = !idUsuario || !idProducto || !nombreProducto;

    return (
        <div className="container-form-carrito" style={{
            background: '#0a0a0a', 
            padding: '20px', 
            borderRadius: '10px', 
            border: '1px solid #333',
            marginBottom: '30px'
        }}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <h2 style={{color: '#007bff', textAlign: 'center', margin: '0 0 10px 0'}}>
                    {carritoEditando ? `Editar Orden #${carritoEditando.id}` : "Registrar Carrito"}
                </h2>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label style={{color: '#aaa', fontSize: '0.9rem'}}>ID del Usuario:</label>
                    <input 
                        type="number" 
                        placeholder="Ej: 1" 
                        value={idUsuario} 
                        onChange={(e) => setIdUsuario(e.target.value)} 
                        required 
                        style={{padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white'}}
                    />
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label style={{color: '#aaa', fontSize: '0.9rem'}}>ID del Producto:</label>
                    <input 
                        type="number" 
                        placeholder="Ej: 50" 
                        value={idProducto} 
                        onChange={(e) => setIdProducto(e.target.value)} 
                        required 
                        style={{padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white'}}
                    />
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label style={{color: '#aaa', fontSize: '0.9rem'}}>Nombre del Producto:</label>
                    <input 
                        type="text" 
                        placeholder="Escribe el nombre aquí..." 
                        value={nombreProducto} 
                        onChange={(e) => setNombreProducto(e.target.value)} 
                        required 
                        style={{
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: '1px solid #007bff', 
                            background: '#1a1a1a', 
                            color: 'white'
                        }}
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn-registrar" 
                    disabled={formularioInvalido}
                    style={{
                        padding: '12px', 
                        background: formularioInvalido ? '#555' : '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: formularioInvalido ? 'not-allowed' : 'pointer', 
                        fontWeight: 'bold',
                        transition: '0.3s'
                    }}
                >
                    {carritoEditando ? "Guardar Cambios" : "Registrar Orden"}
                </button>

                {carritoEditando && (
                    <button 
                        type="button" 
                        onClick={limpiarFormulario} 
                        style={{background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer', fontSize: '0.9rem'}}
                    >
                        ✕ Cancelar edición
                    </button>
                )}
            </form>
        </div>
    );
}

export default RegistrarCarrito;