import { useEffect, useState } from 'react';
import api from "./Services/api";
import './registrarCarrito.css';

function RegistrarCarrito({ carritoEditando, limpiarSeleccion, onActualizacionExitosa }) {
    // Si tu BD usa nombres en español (ej. id_usuario, id_producto), cámbialos aquí
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState(''); 
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (carritoEditando) {
            setUserId(carritoEditando.userId || carritoEditando.id_usuario || '');
            
            // Verificamos si existen productos antes de intentar sacarlos
            if (carritoEditando.products && carritoEditando.products.length > 0) {
                setProductId(carritoEditando.products[0].productId || carritoEditando.products[0].id_producto || '');
                setQuantity(carritoEditando.products[0].quantity || carritoEditando.products[0].cantidad || '');
            } else {
                setProductId('');
                setQuantity('');
            }
        } else {
            resetForm();
        }
    }, [carritoEditando]);

    const resetForm = () => {
        setUserId('');
        setProductId('');
        setQuantity('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Objeto que se enviará al Backend
        const datosCarrito = {
            userId: userId,
            productId: productId,
            quantity: quantity
        };

        try {
            if (carritoEditando) {
                // 👇 Actualizar con ruta de tu backend
                const respuesta = await api.put(`/api/carrito/${carritoEditando.id}`, datosCarrito);
                console.log('Carrito Actualizado:', respuesta.data);
                alert('¡Orden actualizada con éxito!');
                limpiarSeleccion();
            } else {
                // 👇 Crear con ruta de tu backend
                const respuesta = await api.post('/api/carritos', datosCarrito);
                console.log('Carrito Registrado:', respuesta.data);
                alert('¡Producto añadido al carrito con éxito!');
            }

            resetForm();
            onActualizacionExitosa(); // Refresca la vista principal
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al guardar la orden.');
        }
    };

    return (
        <div className="container-form">
            <div className="card-form">
                <h2>{carritoEditando ? 'Editar Orden' : 'Registrar Carrito'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="ID Usuario"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="ID Producto"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit">
                            {carritoEditando ? 'Actualizar' : 'Registrar'}
                        </button>
                        {carritoEditando && (
                            <button type="button" onClick={limpiarSeleccion} style={{ backgroundColor: '#dc3545' }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarCarrito;