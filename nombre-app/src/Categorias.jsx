import { useEffect, useState } from 'react';
import axios from 'axios';
import './categorias.css';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                setCategorias(response.data.categories);
            } catch (error) {
                console.error("Error al obtener categorías de comida:", error);
            } finally {
                setLoading(false);
            }
        };
        obtenerCategorias();
    }, []);

    if (loading) return <p className="cargando">Cargando menú de recetas...</p>;

    return (
        <div className="contenedor-menu">
            <header className="menu-header">
                <h1>Categorías de Comida</h1>
                <p>Explora nuestras deliciosas opciones</p>
            </header>

            <div className="grid-comida">
                {categorias.map((cat) => (
                    <div key={cat.idCategory} className="card-comida">
                        <div className="comida-imagen">
                            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                        </div>
                        <div className="comida-info">
                            <h3>{cat.strCategory}</h3>
                            <p className="comida-desc">
                                {cat.strCategoryDescription.substring(0, 100)}...
                            </p>
                            <button className="btn-ver-mas">Ver Recetas</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categorias;