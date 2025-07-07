import Boton from "./Boton";
import "../App.css";

export default function Hero({ onStart }) {
    return (
        <div className="hero">
            <h2>Reconstruí sueños. Descubrí memorias.</h2>
            <Boton texto="Iniciar" onClick={onStart} />
            <div className="slider-carrusel">
                <img className="img-slider" src="/imagenes/imagen1.jpg" alt="sueño 1" />
                <img className="img-slider" src="/imagenes/imagen2.jpg" alt="sueño 2" />
                <img className="img-slider" src="/imagenes/imagen3.jpg" alt="sueño 3" />
                <img className="img-slider" src="/imagenes/imagen4.jpg" alt="sueño 4" />
                <img className="img-slider" src="/imagenes/imagen5.jpg" alt="sueño 5" />
            </div>
            <p className="hero-extra">“A veces, para recordar, solo hay que volver a armar lo que parecía perdido.”</p>
        </div>
    );
}
