import React from "react";
import "../App.css";

export default function Pieza({ valor, onClick, imagen, mostrarImagen }) {
    const esVacio = valor === null;

    const estilo = {
        backgroundColor: esVacio ? "transparent" : "#DDD7F2",
        border: esVacio ? "2px dashed #B6ADD0" : "2px solid #B6ADD0",
        fontWeight: "bold",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: esVacio ? "default" : "pointer",
        width: "100px",
        height: "100px",
        boxSizing: "border-box",
        position: "relative",
        // Para mostrar la imagen si mostrarImagen es true y no es la pieza vacía
        backgroundImage: !esVacio && mostrarImagen ? `url(${imagen})` : undefined,
        backgroundSize: "300px 300px",
        backgroundPosition: getBackgroundPosition(valor),
        backgroundRepeat: "no-repeat",
        backgroundClip: "border-box",
        borderRadius: "10px",
    };

    function getBackgroundPosition(valor) {
        if (!valor || valor < 1 || valor > 8) return "0 0";
        const fila = Math.floor((valor - 1) / 3);
        const col = (valor - 1) % 3;
        return `-${col * 100}px -${fila * 100}px`;
    }

    return (
        <button className="pieza" style={estilo} onClick={onClick} disabled={esVacio}>
            {/* Para solo mostrar el número si NO estamos en modo vista previa O si es la pieza vacía */}
            {!esVacio && !mostrarImagen && (
                <span
                    className="numero-pieza"
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        color: "#3f3d56",
                        fontWeight: "bold",
                        textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
                    }}
                >
                    {valor}
                </span>
            )}
        </button>
    );
}
