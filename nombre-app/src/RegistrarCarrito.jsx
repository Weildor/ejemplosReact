import api from "./Services/api";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './registrarCarrito.css';

function RegistrarCarrito({ carritoEditando, limpiarSeleccion, onActualizacionExitosa }) {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState(''); 
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
            if (carritoEditando) {
            setUserId(carritoEditando.userId || '');
            // Tomamos el primer producto del arreglo para simplificar el formulario
            setProductId(carritoEditando.products[0]?.productId || '');
            setQuantity(carritoEditando.products[0]?.quantity || '');
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

        // Estructura simplificada para tu lógica local o envío a API
        const datosCarrito = {
            userId: userId,
            productId: productId,
            quantity: quantity
        };

        try {
            if (carritoEditando) {
                //Logica de actualizar (PUT)
                const respuesta = await api.put(`/carts/${carritoEditando.id}`, datosCarrito);
                console.log('Carrito Actualizado:', respuesta.data);
                alert('¡Orden actualizada con éxito!');
                limpiarSeleccion();
            } else {
                const respuesta = await api.post('/carts', datosCarrito);
                console.log('Carrito Registrado:', respuesta.data);
                alert('¡Carrito añadido al carrito con éxito!');
            }

            resetForm();
            // Nota: FakeStoreAPI requiere productId (número), 
            // pero aquí enviamos el nombre como solicitaste.
            /*const respuesta = await api.post('/carts', datosCarrito);
            console.log('Carrito Registrado:', datosCarrito);
            alert('¡Producto añadido al carrito con éxito!');
            */
            
            // Limpiar campos
            setUserId(''); setQuantity(''); setProductId('');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar.');
        }
    };

    return (
        <div className="container-form">
            <div className="card-form">
                <h2>Registrar Carrito</h2>
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
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrarCarrito;