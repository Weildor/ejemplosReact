import { useEffect, useState } from 'react';
import api from "./Services/api";
import { useAuth } from './AuthContext'; 
import RegistrarProductos from "./RegistrarProductos"; // Asegúrate de tener este componente
import './Productos.css'; // Tu archivo de estilos

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    
    // Extraemos userRole y user (que ahora sí tiene el ID)
    const { userRole, user } = useAuth(); 

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

    const removeProducto = async (productoId) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            await api.delete(`/api/producto/${productoId}`);
            obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    const agregarAlCarrito = async (producto) => {
        console.log("Usuario actual:", user);

        if (!user || !user.id) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            return;
        }

        const payload = {
            id_usuario: user.id,      
            id_producto: producto.id, 
            cantidad: 1,              
            fecha: new Date().toISOString()
        };

        try {
            await api.post('/api/carritos', payload);
            alert(`¡${producto.nombre} añadido al carrito con éxito!`);
        } catch (error) {
            console.error("Error al enviar al carrito:", error);
            alert("Error al procesar la orden.");
        }
    };

    useEffect(() => { 
        obtenerProductos(); 
    }, []);

    if (loading) return <p className="cargando">Cargando catálogo...</p>;

    return (
        <div className="contenedor-principal">
            {/* Si es Admin, mostramos el formulario de registro/edición arriba */}
            {userRole === 'admin' && (
                <RegistrarProductos
                    productoEditando={productoSeleccionado}
                    limpiarSeleccion={() => setProductoSeleccionado(null)}
                    onActualizacionExitosa={obtenerProductos}
                />
            )}

            <header className="productos-header">
                <h1>Nuestros Productos</h1>
            </header>
            
            <main className="grid-productos">
                {productos.map((producto) => (
                    <article key={producto.id} className="tarjeta-producto">
                        <div className="imagen-wrapper">
                            {/* Placeholder de imagen */}
                            <img src="https://placehold.co/200x200?text=Producto" alt={producto.nombre} />
                        </div>
                        
                        <div className="info-producto">
                            <span className="categoria">CATEGORÍA ID: {producto.id_categoria}</span>
                            <h2>{producto.nombre}</h2> 
                            <p className="descripcion">{producto.descripcion || 'Buen producto'}</p>
                            <p className="precio">${producto.precio}</p>
                            <p className="stock">Disponibles: {producto.stock}</p>
                            
                            <button className="btn-carrito" onClick={() => agregarAlCarrito(producto)}>
                                Añadir al carrito
                            </button>

                            {/* Acciones exclusivas para el Admin dentro de la tarjeta */}
                            {userRole === 'admin' && (
                                <div className="admin-actions">
                                    <hr />
                                    <button className="btn-editar" onClick={() => setProductoSeleccionado(producto)}>
                                        Editar
                                    </button>
                                    <button className="btn-eliminar" onClick={() => removeProducto(producto.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </article>
                ))}            
            </main>
        </div>
    );
}

export default Productos;






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