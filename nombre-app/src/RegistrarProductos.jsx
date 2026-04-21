import api from "./Services/api";
import { useEffect, useState } from 'react';

import './registrarProductos.css';


function RegistrarProductos({ productoEditando, limpiarSeleccion, onActualizacionExitosa}) {
    // 1. Variables alineadas exactamente a tu base de datos MySQL
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (productoEditando) {
            setNombre(productoEditando.nombre || '');
            setPrecio(productoEditando.precio || '');
            setDescripcion(productoEditando.descripcion || '');
            setIdCategoria(productoEditando.id_categoria || '');
            setStock(productoEditando.stock || '');
        } else {
            resetForm();
        }
    }, [productoEditando]);

    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setIdCategoria('');
        setStock('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 2. Construimos el objeto con los nombres que espera tu backend
        const nuevoProducto = { 
            nombre: nombre, 
            precio: precio, 
            descripcion: descripcion, 
            id_categoria: idCategoria, 
            stock: stock 
        };

        try {
            if (productoEditando) {
                // Lógica de actualizar (PUT) a la ruta correcta en singular
                const respuesta = await api.put(`/api/producto/${productoEditando.id}`, nuevoProducto);
                console.log('Producto actualizado:', respuesta.data);
                alert('¡Producto actualizado con éxito!');
                limpiarSeleccion(); 
            } else {
                // Lógica de crear (POST) a la ruta correcta en plural
                const respuesta = await api.post('/api/productos', nuevoProducto);
                console.log('Producto registrado:', respuesta.data);
                alert('¡Producto guardado con éxito!');
            }

            resetForm();
            
            // 3. Ejecutamos esta función para que la lista de abajo se actualice solita
            if (onActualizacionExitosa) {
                onActualizacionExitosa();
            }

        } catch (error) {
            console.error('Error al registrar/actualizar producto:', error);
            alert('Error al guardar el producto.');
        }
    }

    return (
        <div>
            {/* Título dinámico para saber si estamos editando o creando */}
            <h2>{productoEditando ? "Editar Producto" : "Registrar Producto"}</h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="ID Categoría (Ej: 1)"
                    value={idCategoria}
                    onChange={(e) => setIdCategoria(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Stock disponible"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                
                <button type="submit">
                    {productoEditando ? "Actualizar Producto" : "Registrar"}
                </button>
                
                {/* Botón extra para cancelar si nos arrepentimos de editar */}
                {productoEditando && (
                    <button type="button" onClick={limpiarSeleccion} style={{marginTop: '10px', backgroundColor: 'gray'}}>
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    )


}

export default RegistrarProductos;