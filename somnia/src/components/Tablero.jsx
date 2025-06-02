import { useState, useEffect } from "react";
import Pieza from "./Pieza";
import Boton from "./Boton";
import "../App.css";
import { FaRedo, FaEye, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Tablero({
    imagen,
    numero,
    onCompletado,
    mostrarMensaje,
    tiempoTotal,
    movimientosGlobales,
    puedeContinuar,
    puedeRetroceder,
    onAnterior,
}) {
    const solucion = [1, 2, 3, 4, 5, 6, 7, 8, null];
    const [piezas, setPiezas] = useState([]);
    const [movimientos, setMovimientos] = useState(0);
    const [completo, setCompleto] = useState(false);
    const [mostrarImagen, setMostrarImagen] = useState(false);

    useEffect(() => {
        iniciarTablero();
    }, [numero]);

    const iniciarTablero = () => {
        let mezcla = [...solucion];
        for (let i = 0; i < 20; i++) {
            const vacio = mezcla.indexOf(null);
            const vecinos = [vacio - 3, vacio + 3, vacio % 3 !== 0 ? vacio - 1 : -1, vacio % 3 !== 2 ? vacio + 1 : -1];
            const validos = vecinos.filter((i) => i >= 0 && i < 9);
            const destino = validos[Math.floor(Math.random() * validos.length)];
            [mezcla[vacio], mezcla[destino]] = [mezcla[destino], mezcla[vacio]];
        }
        setPiezas(mezcla);
        setMovimientos(0);
        setCompleto(false);
        setMostrarImagen(false);
    };

    const moverPieza = (index) => {
        if (completo) return;
        const vacio = piezas.indexOf(null);
        const adyacentes = [index - 1, index + 1, index - 3, index + 3];
        if (!adyacentes.includes(vacio)) return;

        const nuevas = [...piezas];
        [nuevas[index], nuevas[vacio]] = [nuevas[vacio], nuevas[index]];
        setPiezas(nuevas);
        setMovimientos((prev) => prev + 1);

        if (JSON.stringify(nuevas) === JSON.stringify(solucion)) {
            setCompleto(true);
            onCompletado();
        }
    };

    return (
        <section className="tablero">
            {!completo && (
                <>
                    <div className="barra-superior">
                        <span>⏱️ Tiempo: {tiempoTotal}s</span>
                        <span>🎯 Movimientos: {movimientos}</span>
                    </div>

                    <div className="grilla">
                        {piezas.map((valor, i) => (
                            <Pieza key={i} valor={valor} onClick={() => moverPieza(i)} mostrarImagen={mostrarImagen} imagen={imagen} />
                        ))}
                    </div>

                    <div className="botones-laterales">
                        <Boton texto="Reiniciar" icono={<FaRedo />} onClick={iniciarTablero} />
                        <Boton texto="Vista previa" icono={<FaEye />} onClick={() => setMostrarImagen(!mostrarImagen)} />
                    </div>
                </>
            )}

            {completo && (
                <div className="pantalla-final">
                    <div className="imagen-completa">(Imagen)</div>
                    <p className="mensaje-final">“Fragmento de sueño recuperado”</p>
                    <p>⏱ Tiempo total: {tiempoTotal}s</p>
                    <p>🎯 Movimientos totales: {movimientos}</p>
                    <div className="botones-final">
                        <Boton texto="Reiniciar" icono={<FaRedo />} onClick={iniciarTablero} />
                        {puedeContinuar && <Boton texto="Siguiente imagen" icono={<FaArrowRight />} onClick={onCompletado} />}
                        {puedeRetroceder && <Boton texto="Anterior" icono={<FaArrowLeft />} onClick={onAnterior} />}
                    </div>
                </div>
            )}
        </section>
    );
}
