import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Tablero from "./components/Tablero";
import Mensaje from "./components/Mensaje";
import BarraProgreso from "./components/BarraProgreso";
import Boton from "./components/Boton";
import "./App.css";

export default function App() {
    // Array con las rutas de las imágenes de cada nivel
    const imagenes = [
        "/imagenes/imagen1.jpg",
        "/imagenes/imagen2.jpg",
        "/imagenes/imagen3.jpg",
        "/imagenes/imagen4.jpg",
        "/imagenes/imagen5.jpg",
    ];

    // Frases poéticas que aparecen al completar cada rompecabezas
    const frases = [
        "El muelle olvidado aún guarda ecos del primer suspiro.",
        "El silencio estelar acompaña al viajero que se atrevió a zarpar.",
        "Entre aromas violetas, la memoria florece bajo el cielo inmenso.",
        "Las cumbres veladas susurran verdades que solo el alma comprende.",
        "En lo profundo del cristal, se revelan los fragmentos olvidados del ser.",
    ];

    // Imagen que se muestra al completar todos los rompecabezas
    const imagenFinal = "/imagenes/final.jpg";

    // Estados principales de la aplicación
    const [inicio, setInicio] = useState(false); // Controla si el juego ha comenzado
    const [completados, setCompletados] = useState(0); // Número de rompecabezas completados
    const [tiempoTotal, setTiempoTotal] = useState(0); // Tiempo actual del rompecabezas en curso
    const [tiempoInicio, setTiempoInicio] = useState(null); // Tiempo de cuando comenzó el rompecabezas actual
    const [tiempoAcumulado, setTiempoAcumulado] = useState(0); // Tiempo total de todos los rompecabezas
    const [mostrarResumen, setMostrarResumen] = useState(false); // Controla la pantalla de resumen después de completar
    const [ultimoTiempo, setUltimoTiempo] = useState(0); // Tiempo del último rompecabezas completado
    const [ultimoMovimientos, setUltimoMovimientos] = useState(0); // Movimientos del último rompecabezas completado

    const totalSueños = imagenes.length;
    const juegoFinalizado = completados >= totalSueños;

    // Efecto para actualizar el cronómetro cada segundo
    useEffect(() => {
        let intervalo;
        // Solo ejecuta el cronómetro si el juego está en curso
        if (inicio && tiempoInicio !== null && !juegoFinalizado && !mostrarResumen) {
            intervalo = setInterval(() => {
                // Calcula el tiempo transcurrido en segundos
                setTiempoTotal(Math.floor((Date.now() - tiempoInicio) / 1000));
            }, 1000);
        }
        // Limpia el intervalo cuando el componente se desmonta o cambian las dependencias
        return () => clearInterval(intervalo);
    }, [inicio, tiempoInicio, juegoFinalizado, mostrarResumen]);

    // Función que se ejecuta al hacer clic en "Comenzar"
    const manejarComenzar = () => {
        setInicio(true);
        setTiempoInicio(Date.now()); // Guarda el momento exacto de inicio
    };

    // Función que se ejecuta cuando se completa un rompecabezas
    const manejarCompletado = (tiempo, movimientos) => {
        setUltimoTiempo(tiempo);
        setUltimoMovimientos(movimientos);
        setTiempoAcumulado((prev) => prev + tiempo); // Suma el tiempo al acumulado
        setTiempoTotal(0); // Resetea el cronómetro actual
        setTiempoInicio(null); // Pausa el cronómetro

        // Muestra la pantalla de resumen con la frase poética
        setMostrarResumen(true);
    };

    // Función para continuar al siguiente rompecabezas
    const continuarRompecabezas = () => {
        setCompletados((prev) => prev + 1); // Incrementa el contador de completados
        setMostrarResumen(false); // Oculta el resumen
        setTiempoInicio(Date.now()); // Inicia el cronómetro para el siguiente nivel
    };

    // Función para reiniciar todo el juego
    const reiniciarJuego = () => {
        setInicio(true);
        setCompletados(0);
        setTiempoTotal(0);
        setTiempoAcumulado(0);
        setTiempoInicio(Date.now());
        setMostrarResumen(false);
    };

    return (
        <div className="App">
            {/* Header con el título del juego */}
            <header className="header">
                <h1 className="titulo" onClick={() => setInicio(false)}>
                    Somnia
                </h1>
            </header>

            {/* Renderizado condicional basado en el estado del juego */}
            {!inicio ? (
                // Pantalla de inicio
                <Hero onStart={manejarComenzar} />
            ) : juegoFinalizado ? (
                // Pantalla final cuando se completaron todos los rompecabezas
                <main className="juego fade-in" id="pantalla-final">
                    <div className="pantalla-final">
                        <div className="imagen-completa">
                            <img src={imagenFinal} alt="Imagen final" className="img-final" />
                        </div>
                        <Mensaje texto="¡Felicidades! Has completado todos los rompecabezas y recuperado cada fragmento del sueño." final />
                        <p className="quicksand">⏱ Tiempo total: {tiempoAcumulado}s</p>
                        <Boton texto="Volver a jugar" onClick={reiniciarJuego} />
                    </div>
                </main>
            ) : mostrarResumen ? (
                // Pantalla de resumen después de completar cada rompecabezas
                <main className="juego fade-in" id="pantalla-entre-niveles">
                    <div className="pantalla-final">
                        <div className="imagen-completa">
                            <img src={imagenes[completados]} alt={`Sueño ${completados + 1}`} className="img-final" />
                        </div>
                        <Mensaje texto={`"${frases[completados]}"`} final />
                        <p className="quicksand">⏱ Tiempo: {ultimoTiempo}s</p>
                        <p className="quicksand">🎯 Movimientos: {ultimoMovimientos}</p>
                        <Boton texto="Siguiente" onClick={continuarRompecabezas} />
                    </div>
                </main>
            ) : (
                // Pantalla principal del juego con el rompecabezas activo
                <main className="juego fade-in">
                    <Tablero
                        numero={completados + 1}
                        imagen={imagenes[completados]}
                        onCompletado={manejarCompletado}
                        tiempoTotal={tiempoTotal}
                        movimientosGlobales={completados}
                        puedeContinuar={completados < totalSueños}
                        reiniciarTiempo={() => {
                            setTiempoInicio(Date.now());
                            setTiempoTotal(0);
                        }}
                    />
                    {/* Barra de progreso y texto informativo */}
                    <BarraProgreso total={totalSueños} completados={completados} />
                    <p className="progreso-texto">
                        {completados} de {totalSueños} rompecabezas completados
                    </p>
                </main>
            )}
        </div>
    );
}
