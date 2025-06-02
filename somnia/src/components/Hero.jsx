import Boton from "./Boton";
import "../App.css";

export default function Hero({ onStart }) {
    return (
        <div className="hero">
            <h2>Reconstruí sueños. Descubrí memorias.</h2>
            <Boton texto="Iniciar" onClick={onStart} />
            <p className="hero-extra">“A veces, para recordar, solo hay que volver a armar lo que parecía perdido.”</p>
        </div>
    );
}
