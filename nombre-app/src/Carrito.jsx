import api from "./Services/api";
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; 
import './carrito.css';
import RegistrarCarrito from "./RegistrarCarrito";

function Carrito() {
    const [carritos, setCarritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carritoSeleccionado, setCarritoSeleccionado] = useState(null);
    
    // Extraemos los datos de autenticación
    const { userRole, user } = useAuth(); 

    const obtenerCarritos = async () => {
        try {
            const response = await api.get("/api/carritos");
            setCarritos(response.data);
        } catch (error) {
            console.error("Error al obtener carritos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        obtenerCarritos(); 
    }, []);

    const removeCarrito = async (carritoId) => {
        if (!window.confirm("¿Confirmar acción?")) return;
        try {
            await api.delete(`/api/carrito/${carritoId}`);
            alert('Acción realizada con éxito');
            obtenerCarritos();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert('Error al procesar la solicitud.');
        }
    };

    if (loading) return <p className="cargando">Cargando órdenes...</p>;

    // --- LÓGICA DE FILTRADO REFORZADA ---
    const carritosVisibles = userRole === 'admin' 
        ? carritos 
        : carritos.filter(cart => {
            // Intentamos obtener el ID del usuario de varias fuentes para evitar el ID nulo
            const currentUserId = user?.id || user?.userId;
            
            // Log de depuración para que veas en consola qué está fallando si sigue vacío
            if (!currentUserId) {
                console.warn("Advertencia: No se detectó ID de usuario en la sesión actual.");
            }

            // Comparamos usando Number para asegurar que '1' sea igual a 1
            return currentUserId && Number(cart.id_usuario) === Number(currentUserId);
        });

    return (
        <div className="contenedor-carrito">
            {userRole === 'admin' && (
                <RegistrarCarrito
                    carritoEditando={carritoSeleccionado}
                    limpiarSeleccion={() => setCarritoSeleccionado(null)}
                    onActualizacionExitosa={obtenerCarritos}
                />
            )}

            <h1 className="titulo-seccion">
                {userRole === 'admin' ? "Panel de Todas las Órdenes" : "Mis Órdenes de Compra"}
            </h1>

            <div className="grid-carritos">
                {carritosVisibles.length > 0 ? (
                    carritosVisibles.map((cart) => (
                        <div key={cart.id} className="card-carrito">
                            <div className="card-header-carrito">
                                <span>📦 Orden # {cart.id}</span>
                                <span>👤 Usuario ID: {cart.id_usuario}</span>
                            </div>
                            
                            <div className="card-body-carrito">
                                <div className="productos-lista">
                                    {cart.detalles && cart.detalles.length > 0 ? (
                                        cart.detalles.map((det, index) => (
                                            <div key={index} className="producto-detalle">
                                                <p><strong>Producto:</strong> {det.producto?.nombre || "Sin nombre"}</p>
                                                <p><strong>Precio:</strong> ${det.producto?.precio || 0}</p>
                                                <p><strong>Cantidad:</strong> {det.cantidad || 1}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay detalles para esta orden.</p>
                                    )}
                                </div>
                            </div>

                            <div className="acciones-carrito">
                                {userRole === 'admin' && (
                                    <button className="btn-editar" onClick={() => setCarritoSeleccionado(cart)}>
                                        Editar Orden
                                    </button>
                                )}
                                
                                <button className="btn-eliminar" onClick={() => removeCarrito(cart.id)}>
                                    {userRole === 'admin' ? "Eliminar" : "Cancelar Orden"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '50px' }}>
                        <p style={{ color: '#888', fontSize: '1.2rem' }}>
                            {userRole === 'admin' 
                                ? "No hay órdenes registradas en el sistema." 
                                : "Aún no has realizado ninguna orden de compra."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Carrito;