import React, { useState } from 'react';
import './Contactos.css';

function Contactos() {
    // Estado para manejar el envío
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
    };

    if (enviado) {
        return (
            <div className="mensaje-exito">
                <h2>¡Mensaje enviado con éxito! 🚀</h2>
                <p>Te responderemos a la brevedad.</p>
                <button onClick={() => setEnviado(false)} className="btn-volver">
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <div className="contenedor-contacto">
            <form onSubmit={handleSubmit} className="formulario-contacto">
                <h2>Contáctanos</h2>
                <input type="text" placeholder="Tu nombre" required />
                <input type="email" placeholder="Tu correo electrónico" required />
                <textarea placeholder="¿En qué podemos ayudarte?" required></textarea>
                <button type="submit">Enviar Formulario</button>
            </form>
        </div>
    );
}
export default Contactos