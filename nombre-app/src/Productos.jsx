import { useEffect, useState } from 'react';
import api from "./Services/api";
import './Productos.css';
import RegistrarProductos from "./RegistrarProductos";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // 1. Corregimos la ruta a la de tu backend real
    const obtenerProductos = async () => {
        try {
            const response = await api.get("/api/productos");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // 2. Metemos la función dentro del componente para poder refrescar la lista al borrar
    const removeProducto = async (productoId) => {
        try {
            // Tu ruta en backend para borrar es /api/producto/:id (en singular)
            const response = await api.delete(`/api/producto/${productoId}`);
            console.log("Producto eliminado");
            alert('¡Producto eliminado con éxito!');
            obtenerProductos(); // Refrescamos la lista automáticamente
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (loading) return <p className="cargando">Cargando catálogo de productos...</p>;

    return (
        <div className="contenedor-principal">
            <RegistrarProductos
                productoEditando={productoSeleccionado}
                limpiarSeleccion={() => setProductoSeleccionado(null)}
                onActualizacionExitosa={obtenerProductos}
            />
            <header className="productos-header">
                <h1>Nuestros Productos</h1>
            </header>
            
            <main className="grid-productos">
                {/* 3. Adaptamos las variables a tu modelo (nombre, descripcion, precio) */}
                {productos.map((producto) => (
                    <article key={producto.id} className="tarjeta-producto">
                        <div className="imagen-wrapper">
                            {/* Tu backend aún no tiene imagen, ponemos una por defecto temporalmente */}
                            <img 
                                src={"https://placehold.co/200x200?text=Sin+Imagen"}
                                //src={"https://via.placeholder.com/150?text=Sin+Imagen"}// 
                                alt={producto.nombre} 
                            />
                        </div>
                        <div className="info-producto">
                            <span className="categoria">Categoría ID: {producto.id_categoria}</span>
                            <h2>{producto.nombre}</h2> 
                            <p className="descripcion">{producto.descripcion}</p>
                            <p className="precio">${producto.precio}</p>
                            <p className="stock">Stock: {producto.stock}</p>
                            
                            <button className="btn-carrito">
                                Añadir al carrito
                            </button>
                            <br />
                            <button className="btn-carrito" onClick={() => removeProducto(producto.id)}>
                                Eliminar
                            </button>
                            <br />
                            <button className="btn-carrito" onClick={() => setProductoSeleccionado(producto)}>
                                Editar Producto
                            </button>
                        </div>
                    </article>
                ))}            
            </main>
        </div>
    );
}







/*function Productos() {

    const listaProductos = [
    { id: 1, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg", precio: "$9.99" }, // Terraria
    { id: 2, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg", precio: "$29.99" }, // GTA V
    { id: 3, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg", precio: "$59.99" }, // Apex Legends (Gratis)
    { id: 4, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg", precio: "Gratis" }, // CS2
    { id: 5, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/header.jpg", precio: "$69.99" }, // Call of Duty
    { id: 6, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg", precio: "Gratis" }, // Dota 2
    { id: 7, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg", precio: "$59.99" }, // Cyberpunk 2077
    { id: 8, url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg", precio: "$4.99" } // Among Us
];

    return (
        <div className="ContenedorProductos">
            {listaProductos.map((item) => (
                <div key={item.id} className="CardProducto">
                    <div className="CajaLogo">
                        <img src={item.url} alt="Logo Juego" />
                    </div>
                    <div className="InfoBajo">
                        <span className="Etiqueta">Precio:</span>
                        <p className="PrecioTexto">{item.precio}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
*/

export default Productos;