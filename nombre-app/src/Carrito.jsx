import api from "./Services/api";
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; 
import './carrito.css';
import RegistrarCarrito from "./RegistrarCarrito";

function Carrito() {
    const [carritos, setCarritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carritoSeleccionado, setCarritoSeleccionado] = useState(null);
    
    // Extraemos 'user' (que contiene el id) y 'userRole' del contexto
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

    // --- LÓGICA DE FILTRADO CORREGIDA ---
    // 1. Si es admin, ve todo.
    // 2. Si es cliente, comparamos el ID del carrito con el ID del usuario logueado.
    const carritosVisibles = userRole === 'admin' 
        ? carritos 
        : carritos.filter(cart => {
            // Verificamos que existan datos antes de comparar para evitar errores
            return user && user.id && Number(cart.id_usuario) === Number(user.id);
        });

    return (
        <div className="contenedor-carrito">
            {/* Formulario solo visible para Admin */}
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
                                {/* Botón Editar: Solo Admin */}
                                {userRole === 'admin' && (
                                    <button className="btn-editar" onClick={() => setCarritoSeleccionado(cart)}>
                                        Editar Orden
                                    </button>
                                )}
                                
                                {/* Botón Eliminar/Cancelar: Visible para ambos */}
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