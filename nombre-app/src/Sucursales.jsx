import React from 'react';
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