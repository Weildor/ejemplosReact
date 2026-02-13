import React from 'react';
import './sucursales.css';

function Sucursales() {
    const tiendas = [
        { 
            id: 1, 
            ciudad: "Ciudad de México", 
            direccion: "Av. Reforma 123, Centro", 
            horario: "10:00 AM - 8:00 PM",
            // Usamos coordenadas reales para que el iframe funcione correctamente
            lat: 19.4326, 
            lng: -99.1332
        },
        { 
            id: 2, 
            ciudad: "Monterrey", 
            direccion: "Plaza Fiesta San Agustín, Local 45", 
            horario: "11:00 AM - 9:00 PM",
            lat: 25.6866, 
            lng: -100.3161
        },
        { 
            id: 3, 
            ciudad: "Guadalajara", 
            direccion: "Centro Comercial Andares, Nivel 2", 
            horario: "10:00 AM - 8:00 PM",
            lat: 20.6767, 
            lng: -103.3475
        },
        { 
            id: 4, 
            ciudad: "Puebla", 
            direccion: "Calle 5 de Mayo #402, Centro Histórico", 
            horario: "10:00 AM - 7:00 PM",
            lat: 19.0414, 
            lng: -98.2063
        }
    ];

    return (
        <div className="contenedor-sucursales">
            <h2 className="titulo-sucursales">Nuestras Sucursales</h2>
            <div className="grid-sucursales">
                {tiendas.map((tienda) => (
                    <div key={tienda.id} className="tarjeta-sucursal">
                        <h3>{tienda.ciudad}</h3>
                        <p><strong>📍 Dirección:</strong> {tienda.direccion}</p>
                        <p><strong>⏰ Horario:</strong> {tienda.horario}</p>
                        
                        <div className="contenedor-mapa-tarjeta">
                            <iframe 
                                // URL dinámica con lat y lng de cada tienda
                                src={`https://maps.google.com/maps?q=${tienda.lat},${tienda.lng}&hl=es&z=14&output=embed`} 
                                width="100%" 
                                height="200" // Aumenté un poco el alto para mejor visibilidad
                                style={{ border: 0, borderRadius: "8px" }} 
                                allowFullScreen="" 
                                loading="lazy"
                                title={`Mapa de ${tienda.ciudad}`}
                            ></iframe>
                        </div>

                        {/* Botón funcional para abrir en Google Maps real */}
                        <a 
                            href={`https://www.google.com/maps?q=${tienda.lat},${tienda.lng}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-mapa"
                            style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                        >
                            Ver en Google Maps
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sucursales;
/*
import React from 'react';
import './sucursales.css';
import Mapa from './Mapa';

function Sucursales() {
    const tiendas = [
        { 
            id: 1, 
            ciudad: "Ciudad de México", 
            direccion: "Av. Reforma 123, Centro", 
            horario: "10:00 AM - 8:00 PM",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.480112702131!2d-99.167439!3d19.4270206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c36aa2394464f!2sAv.%20Paseo%20de%20la%20Reforma%2C%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1710000000000!5m2!1ses!2smx"
        },
        { 
            id: 2, 
            ciudad: "Monterrey", 
            direccion: "Plaza Fiesta San Agustín, Local 45", 
            horario: "11:00 AM - 9:00 PM",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.502!2d-100.334!3d25.655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM5JzE4LjAiTiAxMDDCsDIwJzAyLjQiVw!5e0!3m2!1ses!2smx!4v1710000000000"
        },
        { 
            id: 3, 
            ciudad: "Guadalajara", 
            direccion: "Centro Comercial Andares, Nivel 2", 
            horario: "10:00 AM - 8:00 PM",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.123!2d-103.411!3d20.709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQyJzMyLjQiTiAxMDPCsDI0JzM5LjYiVw!5e0!3m2!1ses!2smx!4v1710000000000"
        },
        { 
            id: 4, 
            ciudad: "Puebla", 
            direccion: "Calle 5 de Mayo #402, Centro Histórico", 
            horario: "10:00 AM - 7:00 PM",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4!2d-98.2!3d19.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzI0LjAiTiA5OMKwMTInMDAuMCJX!5e0!3m2!1ses!2smx!4v1710000000000"
        }
    ];

    return (
        <div className="contenedor-sucursales">
            <h2 className="titulo-sucursales">Nuestras Sucursales</h2>
            <div className="grid-sucursales">
                {tiendas.map((tienda) => (
                    <div key={tienda.id} className="tarjeta-sucursal">
                        <h3>{tienda.ciudad}</h3>
                        <p><strong>📍 Dirección:</strong> {tienda.direccion}</p>
                        <p><strong>⏰ Horario:</strong> {tienda.horario}</p>
                        <Mapa
                        lat={20.000000000}
                        lng={-97.00000000}
                        nombre={"Sucursal Centro"}/>
                        <div className="contenedor-mapa-tarjeta">
                            <iframe 
                                src={tienda.mapa} 
                                width="100%" 
                                height="150" 
                                style={{ border: 0, borderRadius: "8px" }} 
                                allowFullScreen="" 
                                loading="lazy"
                                title={`Mapa de ${tienda.ciudad}`}
                            ></iframe>
                        </div>

                        <button className="btn-mapa">Ver en Google Maps</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sucursales;
*/

/*import React from 'react';
import './sucursales.css';

function Sucursales() {
    const tiendas = [
        { id: 1, ciudad: "Ciudad de México", direccion: "Av. Reforma 123, Centro", horario: "10:00 AM - 8:00 PM" },
        { id: 2, ciudad: "Monterrey", direccion: "Plaza Fiesta San Agustín, Local 45", horario: "11:00 AM - 9:00 PM" },
        { id: 3, ciudad: "Guadalajara", direccion: "Centro Comercial Andares, Nivel 2", horario: "10:00 AM - 8:00 PM" },
        { id: 4, ciudad: "Puebla", direccion: "Calle 5 de Mayo #402, Centro Histórico", horario: "10:00 AM - 7:00 PM" }
    ];

    return (
        <div className="contenedor-sucursales">
            <h2 className="titulo-sucursales">Nuestras Sucursales</h2>
            <div className="grid-sucursales">
                {tiendas.map((tienda) => (
                    <div key={tienda.id} className="tarjeta-sucursal">
                        <h3>{tienda.ciudad}</h3>
                        <p><strong>Dirección:</strong> {tienda.direccion}</p>
                        <p><strong>Horario:</strong> {tienda.horario}</p>
                        <button className="btn-mapa">Ver en Google Maps</button>
                    </div>
                ))}
            </div>
            <div className="mapa-placeholder">
                <p>📍 Selecciona una sucursal para ver su ubicación en tiempo real</p>
            </div>
        </div>
    );
}

export default Sucursales;
*/