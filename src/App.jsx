import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Tablero from "./components/Tablero";
import Mensaje from "./components/Mensaje";
import BarraProgreso from "./components/BarraProgreso";
import Boton from "./components/Boton";
import "./App.css";

export default function App() {
    const imagenes = [
        "/src/assets/imagenes/imagen1.jpg",
        "/src/assets/imagenes/imagen2.jpg",
        "/src/assets/imagenes/imagen3.jpg",
        "/src/assets/imagenes/imagen4.jpg",
        "/src/assets/imagenes/imagen5.png",
    ];

    const imagenFinal = "/src/assets/imagenes/final.jpg";

    const [inicio, setInicio] = useState(false);
    const [completados, setCompletados] = useState(0);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [tiempoInicio, setTiempoInicio] = useState(null);
    const [tiempoAcumulado, setTiempoAcumulado] = useState(0);

    const totalSueños = 5;
    const juegoFinalizado = completados >= totalSueños;

    useEffect(() => {
        let intervalo;
        if (inicio && tiempoInicio !== null && !juegoFinalizado) {
            intervalo = setInterval(() => {
                setTiempoTotal(Math.floor((Date.now() - tiempoInicio) / 1000));
            }, 1000);
        }
        return () => clearInterval(intervalo);
    }, [inicio, tiempoInicio, juegoFinalizado]);

    const manejarComenzar = () => {
        setInicio(true);
        setTiempoInicio(Date.now());
    };

    const manejarCompletado = () => {
        if (!juegoFinalizado) {
            setCompletados((prev) => prev + 1);
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);

            setTiempoAcumulado((prev) => prev + tiempoTotal);
            setTiempoInicio(Date.now());
            setTiempoTotal(0);
        }
    };

    const reiniciarJuego = () => {
        setInicio(false);
        setCompletados(0);
        setTiempoTotal(0);
        setTiempoAcumulado(0);
        setTiempoInicio(null);
    };

    return (
        <div className="App">
            <header className="header">
                <h1 className="titulo" onClick={reiniciarJuego}>
                    Somnia
                </h1>
            </header>

            {!inicio ? (
                <Hero onStart={manejarComenzar} />
            ) : juegoFinalizado ? (
                <main className="juego">
                    <div className="pantalla-final">
                        <div className="imagen-completa">
                            <img src={imagenFinal} alt="Imagen final" className="img-final" />
                        </div>
                        <p className="mensaje-final quicksand">
                            ¡Felicitaciones! Has completado todos los rompecabezas y recuperado cada fragmento del sueño.
                        </p>
                        <p className="quicksand">⏱ Tiempo total: {tiempoAcumulado}s</p>
                        <Boton texto="Volver a jugar" onClick={reiniciarJuego} />
                    </div>
                </main>
            ) : (
                <main className="juego">
                    <Tablero
                        numero={completados + 1}
                        imagen={imagenes[completados]}
                        onCompletado={manejarCompletado}
                        mostrarMensaje={mostrarMensaje}
                        tiempoTotal={tiempoTotal}
                        movimientosGlobales={completados}
                        puedeContinuar={completados < totalSueños}
                    />
                    <BarraProgreso total={totalSueños} completados={completados} />
                    <p className="progreso-texto">
                        {completados} de {totalSueños} rompecabezas completados
                    </p>
                </main>
            )}
        </div>
    );
}
