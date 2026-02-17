import { useEffect, useState } from "react";
import './clima.css';

function Clima() {
    const [clima, setClima]= useState(null);
    const API_KEY =  import.meta.env.VITE_OPENWEATHER_API_KEY;
    const lat = 20.677201868398676
    const lng = -103.3493453638803

    useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
    .then((res)=>res.json())
    .then((data)=>{
        setClima(data)
    })
    .catch((error) => console.log("Error:", console.error));
    },[])


    return (
        <div className="divClima">
          {
            clima ? (
                <>
                <p>{clima.name} Temp: {clima.main.temp} Hum: {clima.main.humidity}</p>
                <p>{clima.weather.description}</p>
                </>
            ):(
                <p>Cargar clima...</p>
            )
          }
        </div>
    )
}

export default Clima;