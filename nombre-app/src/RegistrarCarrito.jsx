import api from "./Services/api";
import { useState } from 'react';
import './registrarCarrito.css';

function RegistrarCarrito() {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState(''); // Campo de nombre solicitado
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Estructura simplificada para tu lógica local o envío a API
        const datosCarrito = {
            userId: userId,
            productId: productId,
            quantity: quantity
        };

        try {
            // Nota: FakeStoreAPI requiere productId (número), 
            // pero aquí enviamos el nombre como solicitaste.
            const respuesta = await api.post('/carts', datosCarrito);
            console.log('Carrito Registrado:', datosCarrito);
            alert('¡Producto añadido al carrito con éxito!');
            
            // Limpiar campos
            setUserId(''); setProductId(''); setQuantity('');
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