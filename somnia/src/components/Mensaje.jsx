import "../App.css";

export default function Mensaje({ texto, final }) {
    return (
        <div className={`mensaje ${final ? "final" : "frase"}`}>
            <p className="quicksand">{texto}</p>
        </div>
    );
}
