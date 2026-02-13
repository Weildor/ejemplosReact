import React from 'react';
import './acercaDe.css';

function AcercaDe() {
    return (
        <div className="acerca-container">
            <header className="acerca-header">
                <h1>Acerca de Nosotros</h1>
                <p className="subtitulo">Pasión por la cultura gamer y el desarrollo independiente.</p>
            </header>

            <section className="seccion-indie">
                <div className="tarjeta-indie">
                    <div className="indie-badge">Destacado</div>
                    <h2>¿Qué son los Videojuegos Indie?</h2>
                    <p>
                        Los juegos **Indie** (independientes) son creados por individuos o grupos pequeños 
                        sin el apoyo financiero de grandes distribuidores. Se caracterizan por su 
                        **innovación, originalidad y libertad creativa**.
                    </p>
                    <p>
                        Títulos como *Minecraft*, *Stardew Valley* y *Hollow Knight* demostraron que 
                        no se necesita un presupuesto millonario para cautivar a millones de jugadores 
                        en todo el mundo.
                    </p>
                    <div className="indie-footer">
                        <span>#IndieDev</span>
                        <span>#CreatividadPura</span>
                    </div>
                </div>
            </section>

            <section className="mision-vision">
                <div className="mini-card">
                    <h3>Nuestra Misión</h3>
                    <p>Conectar a jugadores con experiencias únicas y apoyar el talento emergente.</p>
                </div>
                <div className="mini-card">
                    <h3>Nuestra Visión</h3>
                    <p>Ser la plataforma líder en difusión de cultura indie en Latinoamérica.</p>
                </div>
            </section>
        </div>
    );
}

export default AcercaDe;