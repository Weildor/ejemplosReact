import api from "./Services/api";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './registrarProductos.css';

//API Metodo Post//
//Agregar datos//
function RegistrarProductos({ productoEditando, limpiarSeleccion, onActualizacionExitosa}) {
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [image, setImage] = useState('');

useEffect(() => {
        if (productoEditando) {
            setTitle(productoEditando.title || '');
            setPrice(productoEditando.price || '');
            setDescription(productoEditando.description) || '';
            setCategory(productoEditando.category || '');
            setImage(productoEditando.image || '');
        } else {
            resetForm();
        }
    }, [productoEditando]);

    const resetForm = () => {
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProducto = { title, price, description, category, image };
    try{
        if (productoEditando) {
            //Logica de actualizar (PUT)
                const respuesta = await api.put(`/products/${productoEditando.id}`, nuevoProducto);
                console.log('Producto actualizado:', respuesta.data);
                alert('¡Producto actualizado con exito!');
                limpiarSeleccion(); //Limpia el estado en el padre
            } else {
                const respuesta = await api.post('/products', nuevoProducto);
                console.log('Producto registrado:', respuesta.data);
                alert('¡Producto guardado con exito!');
            }

            resetForm();
        /*const respuesta = await api.post('/products', nuevoProducto);
        console.log('Producto registrado:', respuesta.data);
        alert('¡Producto guardado con exito!');
        */
       setTitle(''); setPrice(''); setDescription(''); setCategory(''); setImage('');
    }catch (error) {
        console.error('Error al registrar producto:', error);
        alert('Error al crear el producto.');
    }

}
    return (
        <div>
            <h2>Registrar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripcion"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit">Registrar</button>


            </form>
        </div>
    )

}
export default RegistrarProductos