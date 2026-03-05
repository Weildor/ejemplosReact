import api from "./Services/api";
import { useEffect, useState } from 'react';
import './Productos.css'; // ¡Descomentado para que se vea bien!
import RegistrarProductos from "./RegistrarProductos";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true); // Cambiado [true] a true
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    
    const obtenerProductos = async () => {
        try {
            const response = await api.get("/products");
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

    if (loading) return <p className="cargando">Cargando catálogo de juegos...</p>;

    // AGREGAMOS EL RETURN AQUÍ
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
                {productos.map((producto) => (
                    <article key={producto.id} className="tarjeta-producto">
                        <div className="imagen-wrapper">
                            <img 
                                src={producto.image} 
                                alt={producto.title} 
                            />
                        </div>
                        <div className="info-producto">
                            <span className="categoria">{producto.category}</span>
                            {/* FakeStoreAPI usa .title, no .name */}
                            <h2>{producto.title}</h2> 
                            <p className="descripcion">{producto.description}</p>
                            <p className="precio">${producto.price}</p>
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
const removeProducto = async (productoId) => {
    try {
        const response = await api.delete(
        `/products/${productoId}`
        );
        console.log(response.data);
        alert('¡Producto eliminado con exito!');

    }catch (error) {
        console.error(error);
    }
};





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