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
            const response = await api.get("/carts");
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
                {/* PRIMER MAPEO: Los carritos (las órdenes) */}
                {carritos.map((cart) => (
                    <div key={cart.id} className="card-carrito">
                        <div className="card-header-carrito">
                            <span>📦 Orden # {cart.id}</span>
                            <span>👤 Usuario ID: {cart.userId}</span>
                        </div>
                        
                        <div className="card-body-carrito">
                            <p className="fecha-orden">📅 Fecha: {new Date(cart.date).toLocaleDateString()}</p>
                            
                            <h4>Productos en esta orden:</h4>
                            <ul className="lista-mini-productos">
                                {/* SEGUNDO MAPEO: Los productos dentro de ese carrito */}
                                {cart.products.map((item, index) => (
                                    <li key={index} className="item-producto">
                                        <span>🆔 Producto ID: {item.productId}</span>
                                        <span className="cantidad">Cant: {item.quantity}</span>
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

const removeCarrito = async (carritoId) => {
    try {
        const response = await api.delete(
        `/carts/${carritoId}`
        );
        console.log(response.data);
        alert('¡Carrito cancelado con exito!');

    }catch (error) {
        console.error(error);
    }
};

export default Carrito;