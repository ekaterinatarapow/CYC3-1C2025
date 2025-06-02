import "../App.css";

export default function Boton({ texto, onClick, icono }) {
    return (
        <button className="boton" onClick={onClick}>
            {icono && <span className="icono">{icono}</span>} {texto}
        </button>
    );
}
