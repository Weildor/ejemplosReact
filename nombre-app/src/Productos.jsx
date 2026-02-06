import React from 'react';
import './Productos.css';

function Productos() {
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

export default Productos;