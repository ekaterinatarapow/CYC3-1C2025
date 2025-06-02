import "../App.css";

export default function BarraProgreso({ total, completados }) {
    const porcentaje = (completados / total) * 100;

    return (
        <div className="barra-progreso">
            <div className="progreso" style={{ width: `${porcentaje}%` }}></div>
        </div>
    );
}
