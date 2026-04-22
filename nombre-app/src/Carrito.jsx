import api from "./Services/api";
import { useEffect, useState } from 'react';
import './carrito.css';
import RegistrarCarrito from "./RegistrarCarrito";

function Carrito() {
    const [carritos, setCarritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carritoSeleccionado, setCarritoSeleccionado] = useState(null);

    const obtenerCarritos = async () => {
        try {
            // 👇 Cambiamos a la ruta real de tu backend
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
        try {
            // 👇 Cambiamos a la ruta real de tu backend
            const response = await api.delete(`/api/carrito/${carritoId}`);
            console.log(response.data);
            alert('¡Carrito cancelado con éxito!');
            obtenerCarritos(); // Refrescamos la lista tras eliminar
        } catch (error) {
            console.error(error);
            alert('Error al cancelar el carrito.');
        }
    };

    if (loading) return <p className="cargando">Cargando pedidos...</p>;

    return (
        <div className="contenedor-carrito">
            <RegistrarCarrito
                carritoEditando={carritoSeleccionado}
                limpiarSeleccion={() => setCarritoSeleccionado(null)}
                onActualizacionExitosa={obtenerCarritos}
            />
            <header className="carrito-header">
                <h1>Órdenes de Compra</h1>
            </header>

            <div className="grid-carritos">
                {carritos.map((cart) => (
                    <div key={cart.id} className="card-carrito">
                        <div className="card-header-carrito">
                            <span>📦 Orden # {cart.id}</span>
                            {/* Verifica si tu BD devuelve userId o id_usuario */}
                            <span>👤 Usuario ID: {cart.userId || cart.id_usuario}</span>
                        </div>
                        
                        <div className="card-body-carrito">
                            {/* Verifica si tu BD devuelve date o fecha */}
                            <p className="fecha-orden">📅 Fecha: {cart.date ? new Date(cart.date).toLocaleDateString() : 'Sin fecha'}</p>
                            
                            <h4>Productos en esta orden:</h4>
                            <ul className="lista-mini-productos">
                                {/* NOTA IMPORTANTE: Si tu backend no devuelve "products" anidados, esto aparecerá vacío hasta que ajustemos la consulta en Node */}
                                {cart.products && cart.products.map((item, index) => (
                                    <li key={index} className="item-producto">
                                        <span>🆔 Producto ID: {item.productId || item.id_producto}</span>
                                        <span className="cantidad">Cant: {item.quantity || item.cantidad}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="acciones-carrito">
                            <button className="btn-editar" onClick={() => setCarritoSeleccionado(cart)}>Editar Orden</button>
                            <button className="btn-eliminar" onClick={() => removeCarrito(cart.id)}>Cancelar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carrito;